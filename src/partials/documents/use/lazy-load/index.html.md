Browsers load images even if they are removed with JavaScript. All images in the example below will be downloaded right away:

	<div class="fotorama">
	  <img src="1.jpg">
	  <img src="2.jpg">
	  <img src="3.jpg">
	</div>

If you don’t worry about browsers with no JavaScript, turn on lazy loading by altering your <abbr>HTML</abbr>:

	<div class="fotorama">
	  <a href="1.jpg"></a>
	  <a href="2.jpg"></a>
	  <a href="3.jpg"></a>
	</div>

All fotoramas here are using this method of image embedding.