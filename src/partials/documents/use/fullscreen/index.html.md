Allow fotorama to enter fullscreen using `data-allow-full-screen`:

	<div class="fotorama"
	     data-allow-full-screen="true">
	  <img src="1.jpg">
	  <img src="2.jpg">
	  <img src="3.jpg">
	</div>

This will show an icon at the top-right that toggles the fullscreen.

To use modern Fullscreen <abbr>API</abbr>, set `data-allow-full-screen` to `native`:

	<div class="fotorama"
	     data-allow-full-screen="native">
	  <img src="1.jpg">
	  <img src="2.jpg">
	  <img src="3.jpg">
	</div>

<p class="after-pre">Example: [Fullscreen](/<>/fullscreen.html)</p>

Add a separate image for fullscreen using `data-full`:

	<div class="fotorama"
	     data-allow-full-screen="native">
	  <img src="1.jpg" data-full="1_full.jpg">
	  <img src="2.jpg" data-full="2_full.jpg">
	  <img src="3.jpg" data-full="3_full.jpg">
	</div>

<p class="after-pre">Example: [Fullscreen with big images](/<>/fullscreen-big.html)</p>