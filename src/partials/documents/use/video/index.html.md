To add video from YouTube or Vimeo just link to the video page:

	<div class="fotorama">
	  <a href="http://youtube.com/watch?v=C3lWwBslWqg">Desert Rose</a>
	  <a href="http://vimeo.com/61527416">Celestial Dynamics</a>
	</div>

<p class="after-pre">`<>` [Video](/<>/video.html)</p>

Fotorama will automatically fetch the splash images. Link format is not strict — `http://youtu.be/C3lWwBslWqg` and `http://player.vimeo.com/video/61527416` are good too.

Show another splash:

	<div class="fotorama">
	  <a href="http://youtube.com/watch?v=C3lWwBslWqg">
	    <img src="desert-rose.jpg">
	  </a>
	</div>

Add a separate thumbnail using this formula:

	<div class="fotorama" data-nav="thumbs">
	  <a href="http://youtube.com/watch?v=C3lWwBslWqg" data-img="desert-rose.jpg">
	    <img src="desert-rose_thumb.jpg">
	  </a>
	</div>

You can also add any video if you have iframe link and previews. Here are the Dailymotion videos:

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

<p class="after-pre">`<>` [Custom video](/<>/video-custom.html)</p>