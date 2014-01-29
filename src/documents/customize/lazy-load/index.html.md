---
title: "Lazy load"
layout: "page"
menuOrder: 101
---

Browsers load images even if&nbsp;they are removed with JavaScript. All images in&nbsp;the example below will be&nbsp;downloaded right away:

    <div class="fotorama">
      <img src="1.jpg">
      <img src="2.jpg">
    </div>

If&nbsp;you don&rsquo;t worry about browsers with no&nbsp;JavaScript, turn on&nbsp;lazy loading by&nbsp;altering your <abbr>HTML</abbr>:

    <div class="fotorama">
      <a href="1.jpg"></a>
      <a href="2.jpg"></a>
    </div>

Add thumbnails:

    <div class="fotorama">
      <a href="1.jpg" data-thumb="1_thumb.jpg"></a>
      <a href="2.jpg" data-thumb="2_thumb.jpg"></a>
    </div>

All fotoramas here are using this method of image embedding.