There are 4&nbsp;ways to&nbsp;fit an&nbsp;image into a&nbsp;fotorama.

**`contain`**<br>
_Default method._ Stretching the image to&nbsp;be&nbsp;fully displayed while fitting within the fotorama.

**`cover`**<br>
Stretching and cropping the image to&nbsp;completely cover the fotorama.

**`scaledown`**<br>
Stretching the image if&nbsp;it&nbsp;is&nbsp;bigger than the fotorama.

**`none`**<br>
Using the image’s own dimensions.

Select fit for the whole fotorama and override it&nbsp;for a&nbsp;single image with `data-fit`:

	<div class="fotorama"
	     data-fit="cover">
	  <img src="1.jpg">
	  <img src="2.jpg" data-fit="contain">
	  <img src="3.jpg">
	</div>

## Examples
The 200×300 frog:

<p class="image"><img src="http://fotorama.s3.amazonaws.com/i/fit/frog.png" width="200" height="300"></p>

...fit the 240×180 fotorama like so:

<div class="fotorama-wrap fit-example">
<div class="fotorama" data-width="240" data-ratio="240/180"  data-fit="contain">
	<a href="http://fotorama.s3.amazonaws.com/i/fit/frog.png" data-caption="contain"></a>
</div>
<div class="fotorama" data-width="240" data-ratio="240/180"  data-fit="cover">
	<a href="http://fotorama.s3.amazonaws.com/i/fit/frog.png" data-caption="cover"></a>
</div>
<div class="fotorama" data-width="240" data-ratio="240/180"  data-fit="scaledown">
	<a href="http://fotorama.s3.amazonaws.com/i/fit/frog.png" data-caption="scaledown"></a>
</div>
<div class="fotorama" data-width="240" data-ratio="240/180"  data-fit="none">
	<a href="http://fotorama.s3.amazonaws.com/i/fit/frog.png" data-caption="none"></a>
</div>
</div>

The 200×125 elephant:

<p class="image"><img src="http://fotorama.s3.amazonaws.com/i/fit/elephant.png" width="200" height="125"></p>

...fit the 240×180 fotorama like so:

<div class="fotorama-wrap fit-example">
<div class="fotorama" data-width="240" data-ratio="240/180"  data-fit="contain">
	<a href="http://fotorama.s3.amazonaws.com/i/fit/elephant.png" data-caption="contain"></a>
</div>
<div class="fotorama" data-width="240" data-ratio="240/180"  data-fit="cover">
	<a href="http://fotorama.s3.amazonaws.com/i/fit/elephant.png" data-caption="cover"></a>
</div>
<div class="fotorama" data-width="240" data-ratio="240/180"  data-fit="scaledown">
	<a href="http://fotorama.s3.amazonaws.com/i/fit/elephant.png" data-caption="scaledown"></a>
</div>
<div class="fotorama" data-width="240" data-ratio="240/180"  data-fit="none">
	<a href="http://fotorama.s3.amazonaws.com/i/fit/elephant.png" data-caption="none"></a>
</div>
</div>