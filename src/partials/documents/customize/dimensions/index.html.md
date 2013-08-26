Fotorama’s dimensions are the dimensions of&nbsp;the first image. Other pictures are scaled proportionally to&nbsp;fit.
To&nbsp;reserve the space on&nbsp;the page before the first image is&nbsp;loaded, use `data-width` and `data-height`:

	<div class="fotorama"
	     data-width="800"
	     data-height="600">
	  <img src="1.jpg">
	  <img src="2.jpg">
	  <img src="3.jpg">
	</div>

## Responsive
To&nbsp;make fotorama responsive, define width in&nbsp;percents and aspect ratio:

	<div class="fotorama"
	     data-width="100%"
	     data-ratio="800/600">
	     <!-- the same as data-ratio="4/3"
	          or data-ratio="1.3333333333" -->
	  <img src="1.jpg">
	  <img src="2.jpg">
	  <img src="3.jpg">
	</div>

_Responsive example (<a href="/examples/responsive.html" target="_blank">new window</a>):_

<div class="fotorama-wrap"><div class="fotorama"
     data-width="100%"
     data-ratio="3/2">
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/7.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/26.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/22-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/8-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/19.jpg"></a>
</div></div>

Constrain fotorama’s size to&nbsp;a&nbsp;certain range with `data-minwidth`, `data-maxwidth`, `data-minheight`, and `data-maxheight`:

	<div class="fotorama"
	     data-width="100%"
	     data-ratio="800/600"
	     data-minwidth="400"
	     data-maxwidth="1000"
	     data-minheight="300"
	     data-maxheight="100%">
	  <img src="1.jpg">
	  <img src="2.jpg">
	  <img src="3.jpg">
	</div>

<p class="after-pre">_Example: <a href="/examples/constrained.html" target="_blank">Constrained</a>_</p>

Relative height is&nbsp;calculated based on&nbsp;inner height of&nbsp;the window. A&nbsp;height of&nbsp;100% covers the entire browser window:

	<body style="margin: 0;">

	  <div class="fotorama"
	       data-width="100%"
	       data-height="100%">
	    <img src="1.jpg">
	    <img src="2.jpg">
	    <img src="3.jpg">
	  </div>

	</body>

<p class="after-pre">_Example: <a href="/examples/full-window.html">Full window</a>_</p>