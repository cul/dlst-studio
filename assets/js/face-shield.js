/* global document, _, ss, d3, L, $ */
$("#recipients-tab").on('click', function (e) {
  e.preventDefault();
  const OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
  var map = L.map("recipient-map", {
    center: [40.8075, -73.961944],
    zoom: 6,
    maxZoom: 19
  });
  OpenStreetMap_Mapnik.addTo(map);

  for (const recipient of recipients) {
    L.marker([recipient.lat, recipient.lng])
      .bindPopup(`<a href="${recipient.url}">
        ${recipient.name}
        </a>`)
      .addTo(map);
  }

  $(this).tab("show");
  map.invalidateSize();
});
