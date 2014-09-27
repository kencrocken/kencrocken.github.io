---
layout: default
title: Thanks for your Email!
description: You're Awesome!
permalink: /thanks/
--- 
<div class = "thanks">
  <div class = "container">
    <article class="type-system-slab">
      <p class="type">{% if page.meta %} • {{ page.meta }}{% endif %} <a href="/">Home</a></p>
      <h1>{{ page.title }}</h1>
      <img src="http://fillmurray.com/g/300/300" alt="Murray">
      <h2>{{ page.description }}</h2>
    </article>
  </div>
</div>

<div class = "home">

  {% include posts.html %}

</div>

