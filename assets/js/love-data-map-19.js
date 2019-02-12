$(document).ready(() => {
  // ["html", "body", "#map"].forEach(node => {
  //   $(node)
  //     .css("height", "100%")
  //     .css("width", "100%");
  // });

  const maxZoom = 5;
  const esriWorldTerrain = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS',
      maxZoom: 13
  });
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
          parseInt(entry["gs$cell"].row) > 1 && entry["gs$cell"].col === "2"
      )
      .map(entry => entry.content["$t"])
      .filter(content => content !== "")
      .filter(content => content !== "United States of America")
      .reduce((obj, item) => {
        obj[item] = (obj[item] || 0) + 1;
        return obj;
      }, {});
    const states = data.feed.entry
      .filter(
        entry =>
          parseInt(entry["gs$cell"].row) > 1 && entry["gs$cell"].col === "3"
      )
      .map(entry => entry.content["$t"])
      .filter(content => content !== "")
      .reduce((obj, item) => {
        obj[item] = (obj[item] || 0) + 1;
        return obj;
      }, {});
    const countryCounts = Object.keys(countries).map(country => countries[country])
    const stateCounts = Object.keys(states).map(state => states[state])
    const clusters = ss.ckmeans([...countryCounts, ...stateCounts], 5);
    const colors = d3.schemeBlues[clusters.length]
    $.getJSON("/assets/data/world.geo.json", data => {
      const countriesGeoJson = { type: "FeatureCollection" };
      countriesGeoJson["features"] = data.features.filter(
        feature => feature.properties.formal_en !== "United States of America"
      );
      L.geoJSON(countriesGeoJson, {
        style(feature) {
          if (countries[feature.properties.admin]) {
            const bin = [];
            clusters.forEach((cluster, index) => { 
              if(cluster.filter(entry => entry === countries[feature.properties.admin]).length > 0 ){ 
                bin.push(index);
              }
            });
            const fillColor = colors[bin[0]];
            return { fillColor, color: colors[4], weight: 1, opacity: 0.5 };
          } else {
            return { fillOpacity: 0, opacity: 0 };
          }
        }
      }).addTo(map);
    });
    $.getJSON("/assets/data/us-states.geo.json", data => {
      L.geoJSON(data, {
        style(feature) {
          if (states[feature.properties.name]) {
            const bin = [];
            clusters.forEach((cluster, index) => { 
              if(cluster.filter(entry => entry === states[feature.properties.name]).length > 0 ){ 
                bin.push(index);
              }
            });
            const fillColor = colors[bin[0]];
            return { fillColor, color: colors[4], weight: 1, opacity: 0.3 };
          } else {
            return { fillOpacity: 0, opacity: 0 };
          }
        }
      }).addTo(map);
    });
  });
});
