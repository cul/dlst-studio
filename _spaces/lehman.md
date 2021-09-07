---
title: Studio at Lehman
layout: space
tag: lehman
name: Lehman
text: Studio at Lehman offers Open Labs for four hours, four days a week as well as other programming.
directions: >-
  1. Take the [❶](http://web.mta.info/nyct/service/oneline.htm) to 116th St.  Columbia University.

  1. Cut across campus to Amsterdam Ave.

  1. Cross Amsterdam, turn left, and turn right on 118th.

  1. Enter the [International Affairs Building](https://facilities.columbia.edu/building-information/721) at 420 118th. 

  1. Descend the stairs. Alternatively, take the left-hand elevators on
  entering IAB to the third floor. Enter [Lehman Social Sciences Library](https://library.columbia.edu/locations/lehman.html) on the third floor.  
  
  1. After entering through the turnstile cut back across the front desk and
  follow the signs that read “DSSC” to a stairway among the DSSC computers.
  Alternatively, ask at the front desk for elevator access to the second floor.

  1. Studio at Lehman is at the bottom of the stairs, room 215.
lat: 40.807587
lng: -73.959412
# open-lab:
#   days: Mondays – Thursdays
#   # pretend date needed for parsing.
#   start-time: 2019-01-01 12:00
#   end-time: 2019-01-01 16:00
---

Studio at Lehman offers space for about 25 participants in a room within
[Lehman Social Sciences
Library](https://library.columbia.edu/locations/lehman.html) in the
[International Affairs
Building](https://facilities.columbia.edu/building-information/721). During
[Open Labs]({{ site.baseurl }}/open-lab.html), Studio at Lehman also hosts walk-in consultations with members of
the [Research Data
Services](https://library.columbia.edu/services/research-data-services.html)
staff as well as Digital Center Interns. RDS maintains a
[schedule](https://library.columbia.edu/services/research-data-services/schedule.html)
for walk-ins and provides guidance with geographic information systems, numerical analysis, data management, data visualization, and web development.
{: .lead}


Additionally, Studio at Lehman has six Dell Precision Tower 5810 PCs with 32GB
of RAM and 30-inch (2560x1600) monitors running Windows 10. The machines are
outfitted with a wide array of Studio–supported software, including:

<div class="list-group mb-3">
{% for app in site.software %}
{% capture tags %}{{ app.tags | join: " " }}{% endcapture %}
{% if tags contains "lehman" %}
<div class="list-group-item">
<p class="m-0"><a href="{{ app.url }}" target="_blank">{{ app.full-name }}</a>. {{ app.description }}</p>
</div>
{% endif %}
{% endfor %}
</div>

The computers sit in three banks of two, facing a screen with a projector. A
cluster of movable tables creates a large, central table in the middle.
