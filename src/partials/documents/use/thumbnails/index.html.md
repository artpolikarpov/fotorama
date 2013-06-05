Change navigation style from iPhone-style dots to thumbnails by adding `data-nav="thumbs"` attribute:

	<div class="fotorama"
	     data-nav="thumbs">
	  <img src="1.jpg">
	  <img src="2.jpg">
	  <img src="3.jpg">
	</div>

For better performance with thumbnails, have smaller images ready and include them in <abbr>HTML</abbr>. Like so:

	<div class="fotorama"
	     data-nav="thumbs">
	  <a href="1.jpg"><img src="1_thumb.jpg"></a>
	  <a href="2.jpg"><img src="2_thumb.jpg"></a>
	  <a href="3.jpg"><img src="3_thumb.jpg"></a>
	</div>

<p class="after-pre">`<>` [Thumbnails](/<>/thumbnails.html)</p>

By default, thumbnail is 64×64 square. Adjust this with `data-thumb-width` and `data-thumb-height` attributes.

Fotorama will automatically generate the missing thumbnails.