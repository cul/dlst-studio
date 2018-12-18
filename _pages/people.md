---
layout: default
title: People
permalink: people
---

## CUL Studio People

<div class="card-columns">
{% for person in site.data.people %}
<div class="card">
<img class="card-img-top" src="{{ site.baseurl }}/assets/imgs/people/{{ person.img.src }}" alt="{{ person.name }}">
<div class="card-body">
<h3 class="card-title">{{ person.name }}</h3>
</div>
</div>
{% endfor %}
</div>
