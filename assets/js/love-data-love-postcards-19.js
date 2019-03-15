/* global document, _, ss, d3, L, $, turf */
$(document).ready(() => {
  // ["html", "body", "#map"].forEach(node => {
  //   $(node)
  //     .css("height", "100%")
  //     .css("width", "100%");
  // });

  const maxZoom = 5;
  const esriWorldTerrain = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS",
      maxZoom: 13
    }
  );
  const esriWorldTerrain2 = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS",
      maxZoom: 13
    }
  );
  const map = L.map("love-data-map-19", {
    center: [30, 0],
    zoom: 2,
    maxZoom
  });
  esriWorldTerrain.addTo(map);

  const populationMap = L.map("love-data-map-population-19", {
    center: [30, 0],
    zoom: 2,
    maxZoom
  });
  esriWorldTerrain2.addTo(populationMap);

  const loveDataUrl =
    "https://spreadsheets.google.com/feeds/cells/1tPuoRHSrEoU2aZFhZYN8B9TJ5NDUg-O40IMdF8nT4kM/1/public/full?alt=json";
  const mapData = { colors: d3.schemeBlues[5] };

  $.getJSON(loveDataUrl)
    .success(data => {
      const countries = data.feed.entry
        .filter(
          entry =>
            parseInt(entry.gs$cell.row, 10) > 1 && entry.gs$cell.col === "2"
        )
        .map(entry => entry.content.$t)
        .filter(content => content !== "")
        .filter(content => content !== "United States of America")
        .reduce((obj, item) => {
          obj[item] = (obj[item] || 0) + 1;
          return obj;
        }, {});
      const states = data.feed.entry
        .filter(
          entry =>
            parseInt(entry.gs$cell.row, 10) > 1 && entry.gs$cell.col === "3"
        )
        .map(entry => entry.content.$t)
        .filter(content => content !== "")
        .reduce((obj, item) => {
          obj[item] = (obj[item] || 0) + 1;
          return obj;
        }, {});

      mapData.postcards = {
        // countries: countryCounts,
        // states: stateCounts
        countries,
        states
      };
    })
    .then(() => {
      return $.getJSON("/assets/data/world.geo.json").success(data => {
        const countriesGeoJson = { type: "FeatureCollection" };
        countriesGeoJson.features = data.features
          .filter(
            feature =>
              feature.properties.formal_en !== "United States of America"
          )
          .map(feature => {
            feature.area = turf.area(feature);
            return feature;
          });
        console.log("India area:", countriesGeoJson.features.filter(f => f.properties.admin === "India")[0].area);
        console.log("Greenland area:", countriesGeoJson.features.filter(f => f.properties.admin === "Greenland")[0].area);
        mapData.countries = countriesGeoJson;
      });
    })
    .then(() => {
      return $.getJSON("/assets/data/us-states.geo.json").success(data => {
        mapData.states = data;
        mapData.states.features = mapData.states.features.map(feature => {
          feature.area = turf.area(feature);
          return feature;
        });
      });
    })
    .then(() => {
      return $.getJSON("/assets/data/us-states-population.json").success(
        data => {
          mapData.statesPopulation = data;
        }
      );
    })
    .then(() => {
      // build count clusters
      const countClusters = buildCountClusters(mapData);
      const cardPerPersonClusters = buildCardPerPersonClusters(mapData);
      drawMap(map, mapData, "postcards", countClusters, "postcard(s)");
      drawMap(
        populationMap,
        mapData,
        "populationCount",
        cardPerPersonClusters,
        "people per postcard"
      );
      console.log(mapData);
    });
});

function buildCountClusters(data) {
  const countryCounts = Object.keys(data.postcards.countries).map(
    country => data.postcards.countries[country]
  );
  const stateCounts = Object.keys(data.postcards.states).map(
    state => data.postcards.states[state]
  );
  const total = [...countryCounts, ...stateCounts];
  const clusters = ss.ckmeans(total, 5);
  $("#love-data-map-19-legend").html(() => {
    return (
      "<div class='w-100 d-flex justify-content-center'><h4>Legend</h4></div><div class='d-flex justify-content-between w-100'>" +
      data.colors
        .map((color, index) => {
          const min = _.min(clusters[index]);
          const max = _.max(clusters[index]);
          let range;
          if (min !== max) {
            range = `${min}–${max}`;
          } else {
            range = min;
          }
          return `<div class="px-2 d-flex"><span class="align-baseline mr-1" style="background: ${color}; height: 1rem; width: 20px; opacity: 0.3; border: 1px solid; border-color: rgba(8,81,156,0.7);">&nbsp;</span>
            <small>${range} postcards</small></div>`;
        })
        .join(" ") +
      "</div>"
    );
  });

  console.log("mean", ss.mean(total));
  console.log("median", ss.median(total));
  return clusters;
}

function buildCardPerPersonClusters(data) {
  data.populationCount = { countries: {}, states: {} };
  const countryPops = Object.keys(data.postcards.countries).map(country => {
    const population = data.countries.features.filter(
      c => c.properties.admin === country
    )[0].properties.pop_est;
    data.populationCount.countries[country] = Math.floor(
      population / data.postcards.countries[country]
    );
    return data.populationCount.countries[country];
  });
  const statePops = Object.keys(data.postcards.states).map(state => {
    const population = data.statesPopulation[state];
    data.populationCount.states[state] = Math.floor(
      population / data.postcards.states[state]
    );
    return data.populationCount.states[state];
  });
  const total = [...countryPops, ...statePops];
  const clusters = ss.ckmeans(total, 5).reverse();
  $("#love-data-map-population-19-legend").html(() => {
    return (
      "<div class='w-100 d-flex justify-content-center'><h4>Legend</h4></div><div class='d-flex justify-content-between w-100'>" +
      data.colors
        .map((color, index) => {
          const min = _.min(clusters[index]);
          const max = _.max(clusters[index]);
          let range;
          if (min === max) {
            range = d3.format(".2s")(min);
          } else {
            range = `${d3.format(".2s")(max)}–${d3.format(".2s")(min)}`;
          }
          return `<div class="px-2 d-flex"><span class="align-baseline mr-1" style="background: ${color}; height: 1rem; width: 20px; opacity: 0.3; border: 1px solid; border-color: rgba(8,81,156,0.7);">&nbsp;</span>
            <small>${range} people/card</small></div>`;
        })
        .join(" ") +
      "</div>"
    );
  });

  console.log("mean", ss.mean(total));
  console.log("median", ss.median(total));
  return clusters;
}

function drawMap(map, data, dataKey, clusters, label) {
  L.geoJSON(data.countries, {
    style(feature) {
      return buildOptions(
        data[dataKey].countries,
        feature,
        "admin",
        clusters,
        data.colors
      );
    },
    onEachFeature(feature, layer) {
      if (data[dataKey].countries[feature.properties.admin]) {
        let number = data[dataKey].countries[feature.properties.admin];
        if (number > 1000) {
          number = d3.format(".2s")(number);
        }
        layer.bindPopup(
          `<h4>${feature.properties.admin},
            ${number} ${label}</h4>`
        );
      }
    }
  }).addTo(map);
  L.geoJSON(data.states, {
    style(feature) {
      return buildOptions(
        data[dataKey].states,
        feature,
        "name",
        clusters,
        data.colors
      );
    },
    onEachFeature(feature, layer) {
      if (data[dataKey].states[feature.properties.name]) {
        let number = data[dataKey].states[feature.properties.name];
        if (number > 1000) {
          number = d3.format(".2s")(number);
        }
        layer.bindPopup(
          `<strong>${feature.properties.name}, ${number} ${label}</strong>`
        );
      }
    }
  }).addTo(map);
}

function buildOptions(set, feature, prop, clusters, colors) {
  let options = { fillOpacity: 0, opacity: 0 };
  // If it's in the system
  if (set[feature.properties[prop]]) {
    const bin = [];
    clusters.forEach((cluster, index) => {
      if (
        cluster.filter(entry => entry === set[feature.properties[prop]])
          .length > 0
      ) {
        bin.push(index);
      }
    });
    const fillColor = colors[bin[0]];
    options = { fillColor, color: colors[4], weight: 1, opacity: 0.3 };
  }
  return options;
}
