There are 4 ways to fit an image to a fotorama.

**`contain`**<br>
_Default method._ Stretching the image to be fully displayed while fitting within the fotorama.

**`cover`**<br>
Stretching and cropping the image to completely cover the fotorama.

**`scale-down`**<br>
Stretching the image if it is bigger than the fotorama.

**`none`**<br>
Using the image’s intrinsic dimensions.

Select fit for the whole fotorama and override it for a single image with `data-fit`:

	<div class="fotorama" data-fit="cover">
	  <img src="1.jpg">
	  <img src="2.jpg" data-fit="contain">
	  <img src="3.jpg">
	</div>

## Examples
The 200×300 frog:

<p class="image"><img src="http://fotorama.s3.amazonaws.com/i/fit/frog.png" width="200" height="300"></p>

...fit the 240×180 fotorama like so:

<div class="fotorama-wrap fit-example">
<div class="fotorama" data-width="240" data-ratio="240/180" data-max-width="100%" data-fit="contain">
	<img src="http://fotorama.s3.amazonaws.com/i/fit/frog.png" data-caption="contain">
</div>
<div class="fotorama" data-width="240" data-ratio="240/180" data-max-width="100%" data-fit="cover">
	<img src="http://fotorama.s3.amazonaws.com/i/fit/frog.png" data-caption="cover">
</div>
<div class="fotorama" data-width="240" data-ratio="240/180" data-max-width="100%" data-fit="scale-down">
	<img src="http://fotorama.s3.amazonaws.com/i/fit/frog.png" data-caption="scale-down">
</div>
<div class="fotorama" data-width="240" data-ratio="240/180" data-max-width="100%" data-fit="none">
	<img src="http://fotorama.s3.amazonaws.com/i/fit/frog.png" data-caption="none">
</div>
</div>

The 200×125 elephant:

<p class="image"><img src="http://fotorama.s3.amazonaws.com/i/fit/elephant.png" width="200" height="125"></p>

...fit the 240×180 fotorama like so:

<div class="fotorama-wrap fit-example">
<div class="fotorama" data-width="240" data-ratio="240/180" data-max-width="100%" data-fit="contain">
	<img src="http://fotorama.s3.amazonaws.com/i/fit/elephant.png" data-caption="contain">
</div>
<div class="fotorama" data-width="240" data-ratio="240/180" data-max-width="100%" data-fit="cover">
	<img src="http://fotorama.s3.amazonaws.com/i/fit/elephant.png" data-caption="cover">
</div>
<div class="fotorama" data-width="240" data-ratio="240/180" data-max-width="100%" data-fit="scale-down">
	<img src="http://fotorama.s3.amazonaws.com/i/fit/elephant.png" data-caption="scale-down">
</div>
<div class="fotorama" data-width="240" data-ratio="240/180" data-max-width="100%" data-fit="none">
	<img src="http://fotorama.s3.amazonaws.com/i/fit/elephant.png" data-caption="none">
</div>
</div>