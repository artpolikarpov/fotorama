Change navigation style from iPhone-style dots to&nbsp;thumbnails by&nbsp;adding `data-nav="thumbs"`:

	<div class="fotorama"
	     data-nav="thumbs">
	  <img src="1.jpg">
	  <img src="2.jpg">
	  <img src="3.jpg">
	</div>

For better performance with thumbnails, have smaller images ready and include them in&nbsp;<abbr>HTML</abbr>. Like&nbsp;so:

	<div class="fotorama"
	     data-nav="thumbs">
	  <a href="1.jpg"><img src="1_thumb.jpg"></a>
	  <a href="2.jpg"><img src="2_thumb.jpg"></a>
	  <a href="3.jpg"><img src="3_thumb.jpg"></a>
	</div>

_Thumbnails example (<a href="/examples/thumbnails.html" target="_blank">new window</a>):_

<div class="fotorama-wrap"><div class="fotorama"
     data-width="700"
     data-ratio="3/2"
     data-nav="thumbs"
     data-thumbheight="48">
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/1-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/1-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/2-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/2-thumb.jpg" width="144" height="96"></a>
  <a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/3-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/3-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/4-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/4-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/5-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/5-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/24-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/24-thumb.jpg" width="144" height="214"></a>
  <a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/6-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/6-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/7-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/7-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/8-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/8-thumb.jpg" width="144" height="80"></a>
  <a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/23-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/23-thumb.jpg" width="144" height="214"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/9-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/9-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/10-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/10-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/11-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/11-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/12-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/12-thumb.jpg" width="144" height="216"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/13-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/13-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/14-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/14-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/15-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/15-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/16-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/16-thumb.jpg" width="144" height="108"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/20-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/20-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/21-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/21-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/22-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/22-thumb.jpg" width="144" height="194"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/17-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/17-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/18-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/18-thumb.jpg" width="144" height="96"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/19-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/19-thumb.jpg" width="144" height="96"></a>
</div></div>

By&nbsp;default, thumbnail is&nbsp;a&nbsp;64&times;64&nbsp;square. Adjust this with `data-thumbwidth` and `data-thumbheight`.

If you need to have each thumbnail had its own aspect ratio, set `width` and `height`:

```
<div class="fotorama"
     data-nav="thumbs">
  <a href="1.jpg"><img src="1_thumb.jpg" width="144" height="96"></a>
  <a href="2.jpg"><img src="2_thumb.jpg" width="64" height="128"></a>
  <a href="3.jpg"><img src="3_thumb.jpg" width="100" height="100"></a>
</div>
```

In that case height will be 64 pixels or what you’ve set in `data-thumbheight`, and width will be arbitrary.

Fotorama automatically generates the missing thumbnails.