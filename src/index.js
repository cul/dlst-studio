import $ from "jquery";
import L from "leaflet";

$("#people-columns").html(function() {
  const people = JSON.parse($( this )
    .data("people")
    .replace(/'/g, '"')
    .replace(/,\s*\]$/, "]"));
  return shuffle(people).map( person => {
    return `<div class="card">
<img class="card-img-top" src="${ person.img_src }" alt="${ person.name }">
<div class="card-body">
<h3 class="card-title">${ person.name }</h3>
</div>
</div>
`;
  }).join("\n");
});

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function initMap(mapInfo) {
  const [mapDiv, lat, lng] = mapInfo;
  const map = L.map(mapDiv).setView([lat, lng], 17);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(map);
  L.marker([lat, lng]).addTo(map);
}

$(".location").on("shown.bs.collapse", function() {
  setTimeout(() => {
    initMap([$( this ).attr("id").replace("location", "map"), $( this ).data("lat"), $( this ).data("lng")]);
  }, 500);
});

$(window).ready( () => {
    $("#loader").hide();
    $("#bwOutput").show();
    $(".carousel-item").first().addClass("active");
    // $(".carousel").carousel({
    //   interval: 8000 // default: 5000
    // });
});

