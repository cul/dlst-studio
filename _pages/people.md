---
title: People
permalink: people.html
---

{% capture people %}
	{% for person in site.data.people %}
		{'name': '{{ person.name }}', 'img_src': '{{ person.img.src | prepend: "/assets/imgs/people/" | relative_url }}'},
	{% endfor %}
{% endcapture %}

<div id="people-columns" class="card-columns" data-people="[{{ people }}]">
</div>
