/* global document, _, ss, d3, L, $ */
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
  const map = L.map("love-data-map-19", {
    center: [30, 0],
    zoom: 2,
    maxZoom
  });
  esriWorldTerrain.addTo(map);

  const loveDataUrl =
    "https://spreadsheets.google.com/feeds/cells/1tPuoRHSrEoU2aZFhZYN8B9TJ5NDUg-O40IMdF8nT4kM/1/public/full?alt=json";

  $.getJSON(loveDataUrl, data => {
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
    const countryCounts = Object.keys(countries).map(
      country => countries[country]
    );
    const stateCounts = Object.keys(states).map(state => states[state]);
    const clusters = ss.ckmeans([...countryCounts, ...stateCounts], 5);
    const colors = d3.schemeBlues[clusters.length];
    $("#love-data-map-19-legend").html(() => {
      return (
        "<div class='w-100 d-flex justify-content-center'><h4>Legend</h4></div><div class='d-flex justify-content-between w-100'>" +
        colors
          .map((color, index) => {
            const min = _.min(clusters[index]);
            const max = _.max(clusters[index]);
            let range;
            if (min !== max){
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
    $.getJSON("/assets/data/world.geo.json", data => {
      const countriesGeoJson = { type: "FeatureCollection" };
      countriesGeoJson.features = data.features.filter(
        feature => feature.properties.formal_en !== "United States of America"
      );
      L.geoJSON(countriesGeoJson, {
        style(feature) {
          return buildOptions(countries, feature, "admin");
        },
        onEachFeature(feature, layer) {
          layer.bindPopup(`<h4>${feature.properties.admin}</h4>`);
        }
      }).addTo(map);
    });
    $.getJSON("/assets/data/us-states.geo.json", data => {
      L.geoJSON(data, {
        style(feature) {
          return buildOptions(states, feature, "name");
        },
        onEachFeature(feature, layer) {
          layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
        }
      }).addTo(map);
    });
    function buildOptions(set, feature, prop) {
      let options = { fillOpacity: 0, opacity: 0 };
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
  });
});
