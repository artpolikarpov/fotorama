---
title: "Video"
layout: "page"
menuOrder: 4
---


To&nbsp;add video from YouTube or&nbsp;Vimeo just link to&nbsp;the video page:

	<div class="fotorama">
	  <a href="http://youtube.com/watch?v=C3lWwBslWqg">Desert Rose</a>
	  <a href="http://vimeo.com/61527416">Celestial Dynamics</a>
	</div>

_Video example (<a href="/examples/video.html" target="_blank">new window</a>):_

<div class="fotorama-wrap"><div class="fotorama" data-width="700" data-ratio="700/426"  data-fit="cover">
	<a href="http://youtube.com/watch?v=C3lWwBslWqg">Desert Rose</a>
	<a href="http://vimeo.com/61527416">Celestial Dynamics</a>
</div></div>

Fotorama will automatically fetch the splash images. Link format is&nbsp;not strict&nbsp;&mdash; `http://youtu.be/C3lWwBslWqg` and `http://player.vimeo.com/video/61527416` are also good.

For a&nbsp;custom splash image:

	<div class="fotorama">
	  <a href="http://youtube.com/watch?v=C3lWwBslWqg">
	    <img src="desert-rose.jpg">
	  </a>
	</div>

Add a&nbsp;separate thumbnail using this formula:

	<div class="fotorama" data-nav="thumbs">
	  <a href="http://youtube.com/watch?v=C3lWwBslWqg" data-img="desert-rose.jpg">
	    <img src="desert-rose_thumb.jpg">
	  </a>
	</div>

## Custom video
You can also add any video if&nbsp;you have iframe link and previews. Here are the Dailymotion videos:

	<div class="fotorama">
	  <a href="http://dailymotion.com/embed/video/xxgmlg?autoplay=1"
	     data-video="true">
		  <img src="xxgmlg_preview.jpg">
	  </a>
	  <a href="http://dailymotion.com/embed/video/xu4jqv?autoplay=1"
	     data-video="true">
		  <img src="xu4jqv_preview.jpg">
	  </a>
	</div>

<p class="after-pre">_Example: <a href="/examples/video-custom.html" target="_blank">Custom video</a>_</p>