$("#people-columns").html(function() {
  const people = JSON.parse($(this).data("people").replace(/'/g, '"').replace(/,\s*\]$/, "]"));
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
