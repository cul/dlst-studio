---
title: People
permalink: people
---

{% capture people %}
	{% for person in site.data.people %}
		{'name': '{{ person.name }}', 'img_src': '{{ site.baseurl }}/assets/imgs/people/{{ person.img.src }}'},
	{% endfor %}
{% endcapture %}

<div id="people-columns" class="card-columns" data-people="[{{ people }}]">
</div>
