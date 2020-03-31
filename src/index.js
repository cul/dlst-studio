import $ from "jquery";
import L from "leaflet";
import formatArticle from "./format-article";
import addExternalLinks from "./external-links";
import addAlertLinks from "./alert-links";

$("#people-columns").html(function() {
  const people = JSON.parse($( this )
    .data("people")
    .replace(/'/g, '"')
    .replace(/,\s*\]$/, "]"));
  return shuffle(people).map( person => {
    return `<div class="card">
<img class="card-img-top" src="${ person.img_src }" alt="${ person.name }">
<div class="card-body">
<h3 class="mb-0 card-title">${ person.name }</h3>
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

$(".map").each( function() {
  const mapDiv = $( this ).attr("id");
  const [lat, lng] = $( this ).data("latlng").split(",");
  const map = L.map(mapDiv).setView([lat, lng], 17);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(map);
  L.marker([lat, lng]).addTo(map);
});

$(".location").on("shown.bs.collapse", function() {
  // setTimeout(() => {
  //   initMap([$( this ).attr("id").replace("location", "map"), $( this ).data("lat"), $( this ).data("lng")]);
  // }, 500);
});

$(window).ready( () => {
  formatArticle();
  addExternalLinks();
  addAlertLinks();
  $("#loader").hide();
  $("#bwOutput").show();
  $(".carousel-item").first().addClass("active");
  // $(".carousel").carousel({
  //   interval: 8000 // default: 5000
  // });

  $(".badge")
    .css("cursor", "pointer")
    .click( function(){
    filterSoftware($( this ).text());
  });

  $("#show-all-software").click( (e) => {
    e.preventDefault();
    window.location.hash = "";
    $(".software-item").show();
    $("#show-all-software").addClass("disabled");
  });

  if( /\/software/.test(window.location.pathname) && 
    window.location.hash !== "" ){
    filterSoftware(window.location.hash.replace("#", ""));
  }
});

function filterSoftware(tag) {
  window.location.hash = tag;
  $(".software-item").hide();
  $(`.software-item.${tag}`).show();
  $("#show-all-software").removeClass("disabled");
}

