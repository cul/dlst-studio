---
title: Love Data, Love Postcards
slug: love-data-love-postcards-01
js: love-data-love-postcards-19
image:
  src: https://i.imgur.com/9FqE1sj.jpg
  alt: Love crown Data logos
prompt: >-
  Show your love for data and the Libraries during Love Data Week
---

As part of Columbia’s annual week of [Wellness
Days](https://universitylife.columbia.edu/wellness-days-columbia-schedule)
activities, Columbia University Libraries again hosted its postcard project.
Blank postcards were distributed around the various libraries at the
university and periodically collected. They were subsequently stamped at no
cost to the author and sent off to their final destinations.

This year, the librarians at the Science, Engineering, and Social Sciences
Libraries decided to add a wrinkle: we would make a note of where every
postcard was addressed to, building up a table of US states and countries that
would soon be receiving postcards from the Columbia community. We updated the
data every evening, so patrons could follow along, and the final map looks
like this:

<div id="love-data-map-19" style="height: 50vh"></div>
<div id="love-data-map-19-legend" class="mb-3 w-100"></div>

For some raw numbers, that is 998 postcards sent to 54 countries and 46 states
in the US (what’s up, Arkansas, Kentucky, Montana, and Wyoming?). From a
visualization perspective, the map above does a good job of showing the spread
of states and countries. And now that we know that 998 postcards were sent, we
can infer from the coloring that a quarter of all postcards went to two
destinations: New York and China. In fact, here are the top fives for
countries and states:

<div class="row">
<div class="col-6">
<p class="mb-0">*Country*</p>
</div>
<div class="col-6">
<p class="mb-0">*State*</p>
</div>
</div>
<div class="row">
<div class="col-6">
<p class="mb-0">People’s Republic of China (120)</p>
</div>
<div class="col-6">
<p class="mb-0">New York (134)</p>
</div>
</div>
<div class="row">
<div class="col-6">
<p class="mb-0">India (82)</p>
</div>
<div class="col-6">
<p class="mb-0">California (94)</p>
</div>
</div>
<div class="row">
<div class="col-6">
<p class="mb-0">United Kingdom (36)</p>
</div>
<div class="col-6">
<p class="mb-0">Illinois (29)</p>
</div>
</div>
<div class="row">
<div class="col-6">
<p class="mb-0">Brazil (21)</p>
</div>
<div class="col-6">
<p class="mb-0">Florida (25)</p>
</div>
</div>
<div class="row mb-3">
<div class="col-6">
<p class="mb-0">Canada, France, and South Korea (15)</p>
</div>
<div class="col-6">
<p class="mb-0">Massachusetts and New Jersey (24)</p>
</div>
</div>

Sharp-eyed data-thinkers might be all-together unsurprised by these numbers.
China and India are the two most populous nations in the world, after all. If
we chose postcard recipients around the world at *random*, we would have
expected about *200* postcards to go to China, not the 120 we actually had.
Similarly, the top four states are all in the top six of states by population
in the US, with Texas (22) and Pennsylvania (14) missing this cut. 

If we reformulate the map taking into account populations, we can elicit some
new insights from the data:

<div id="love-data-map-population-19" style="height: 50vh"></div>
<div id="love-data-map-population-19-legend" class="mb-3 w-100"></div>

Now, China has 11 million people per postcard, which is right inline with the
average we collected (discounting 0s) of 12 million people per postcard. The
median, however, is 1.8 million people per postcard, a level a country like
Australia or a state like West Virginia met. In other words, when you click on
a country or state above and get its precise count, you’ll know whether it
seems to have gotten “too many” postcards for its population, like the
Northern Mariana Islands, which shares one postcard with all 55 thousand
inhabitants, or “too few,” like Indonesia, which shares one postcard with all
240 million inhabitants. Unfortunately, because of the [Ckmeans
clustering](https://simplestatistics.org/docs/#ckmeans) we are using to break
up the data into five groups, nearly every observation falls within the
darkest category.

Making a map from this dataset, however, carries other risks. We like to make
maps in part because we often infer stories from the resulting
representations. The maps in this post conjure images of the postcards sitting
in sacks, floating across oceans in steamships. We exoticize the smaller or
more “remote” locations (Northern Mariana Islands!). Just by choosing to map
the data, we’ve already narrativized it to a degree. But there’s a further
issue.

The web map turns the three-dimensional Earth into a two-dimensional plane, doing
rather significant distortion to the landmasses that make up that
three-dimensional Earth by using the de facto standard
[Web Mercator](https://en.wikipedia.org/wiki/Web_Mercator_projection)
projection, wherein Africa is shrunken in size and Russia, Greenland, and
Canada are enlarged.

However, also importantly, what we are drawing on the plane are shapes with
areas, not dots of people. The shape labeled “China” is not receiving 120
postcards. Rather, 120 people (or so) who happen to live within the area
represented by that shape are receiving postcards. Yet we color the whole
shape as representative of the people.

This makes a handful of important moves in visualization that can often be
considered “errors.”

First, the visualization assumes people are distributed evenly within a
geographical space. That is, if we were to pick a pixel of the webmap within
China, it has the same likelihood of representing where a postcard recipient
lives as any other pixel within that shape. This is not the case; anecdotally,
many of the China-directed postcards went to Beijing or Shanghai.

Second, even when normalizing data for population, our web maps still use
*area*, not *population*, to visualize data. Because area and population are
different measures, this sort of visualization can also lead to suboptimal
conclusions, which is a common problem with [choropleth
maps](https://en.wikipedia.org/wiki/Choropleth_map) (polygons shaded different
colors where the colors have meaning). That is, while showing a variable of
*density* (people *per* postcard) is better than showing a variable of
*magnitude* (postcards), the shapes still show area, not population.  Hence, a
“more correct” visualization would take our density and further divide by area
(postcard per people per square meter, say). Yet if we doubly normalize the
data, it becomes harder to grasp precisely what the different shades of blue
on the map “mean.” 

Finally, the Web Mercator projection is not an
[equal-area](https://en.wikipedia.org/wiki/Web_Mercator_projection)
projection. So even if we were to use a library like
[Turf.js](http://turfjs.com), which measures the area of each country in terms
of square meters, that calculation does not translate to the number of pixels
contained by the shape represented in the web map. For example, in the image
below, the square surrounding Greenland is 175 by 266 pixels in size, giving
an area of 46,550 pixels. In the meantime, the square surrounding India is 85
by 87 pixels, for an area of 7,395 pixels. Visually, the square surrounding
Greenland is over five times larger than the one surrounding India.

<img src="https://i.imgur.com/hCmQwVh.jpg" class="img-fluid rounded" alt="World with Greenland and India boxed." />

In the real world, however, India is about 1.5 times larger than Greenland.
Turf.js measures areas of 3.2T m² and 2.2T m² for the two countries, which
matches the Wikipedia listed areas of [3.2M
km²](https://en.wikipedia.org/wiki/India#cite_note-india.gov.in2-6) and [2.2M
km²](https://en.wikipedia.org/wiki/Geography_of_Greenland). Even if, then, the
data were to be further normalized by area “on the ground,” the distortions in
the webmap would remain, further obscuring whatever narrative we are aiming to
build.

So what’s the “right” way to show the data we collected? It turns out there
isn’t one. While some may be “more right” than others (representing magnitudes
in choropleth maps is hardly ever a good idea), every decision made while
building the visualization requires consideration. More than anything,
however, the most important thing is to show that the Columbia community made
great use of the postcards this year, underscoring how global Columbia’s reach
truly is.

But maybe next year we’ll normalize the postcard distribution using admissions
data on where our students come from!

If you are interested in maps and data, consider stopping by a [meeting of Map
Club or Data
Club](https://library.columbia.edu/services/research-data-services.html),
hosted by Research Data Services. Alternatively, come to one of the Studio
[Open Labs](/open-lab.html), either at [Butler](/spaces/butler/) or [Lehman](/spaces/lehman).
