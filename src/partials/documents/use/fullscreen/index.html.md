Allow fotorama to enter fullscreen using `data-allow-full-screen`:

	<div class="fotorama"
	     data-allow-full-screen="true">
	  <img src="1.jpg">
	  <img src="2.jpg">
	  <img src="3.jpg">
	</div>

This will show an icon at the top-right that toggles the fullscreen.

_Fullscreen example (<a href="/<>/fullscreen.html" target="_blank">new window</a>):_

<div class="fotorama-wrap"><div class="fotorama"
     data-width="400"
     data-ratio="3/2"
     data-max-width="100%"
     data-fit="cover"
     data-allow-full-screen="true">
	<a href="http://fotorama.s3.amazonaws.com/i/macro2/9-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/macro2/23-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/macro2/14-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/macro2/15-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/macro2/16-lo.jpg"></a>
</div></div>

## Native fullscreen
To use modern Fullscreen <abbr>API</abbr>, set `data-allow-full-screen` to `native`:

	<div class="fotorama"
	     data-allow-full-screen="native">
	  <img src="1.jpg">
	  <img src="2.jpg">
	  <img src="3.jpg">
	</div>

_Native fullscreen example (<a href="/<>/fullscreen-native.html" target="_blank">new window</a>):_

<div class="fotorama-wrap"><div class="fotorama"
     data-width="400"
     data-ratio="3/2"
     data-max-width="100%"
     data-fit="cover"
     data-allow-full-screen="native">
	<a href="http://fotorama.s3.amazonaws.com/i/macro2/9-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/macro2/23-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/macro2/14-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/macro2/15-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/macro2/16-lo.jpg"></a>
</div></div>

## Big images
Add a separate image for fullscreen using `data-full`:

	<div class="fotorama"
	     data-allow-full-screen="native">
	  <img src="1.jpg" data-full="1_full.jpg">
	  <img src="2.jpg" data-full="2_full.jpg">
	  <img src="3.jpg" data-full="3_full.jpg">
	</div>

<p class="after-pre">_Example: <a href="/<>/fullscreen-big.html" target="_blank">Fullscreen with big images</a>_</p>