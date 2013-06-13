Define which transition to&nbsp;use&nbsp;&mdash; `slide` or `crossfade` &mdash; using `data-transition`:

	<div class="fotorama"
	     data-transition="crossfade">
	  <img src="1.jpg">
	  <img src="2.jpg">
	  <img src="3.jpg">
	</div>

_Transition example (<a href="/<>/transition.html" target="_blank">new window</a>):_

<p class="switch-group">
	<span class="switch js-transition-switch active" data-fotorama="#transition">Slide</span>
	&nbsp;
	<span class="switch js-transition-switch" data-fotorama="#transition">Crossfade</span>
</p>

<div class="fotorama-wrap"><div class="fotorama"
     id="transition"
     data-width="700"
     data-ratio="3/2"
     data-max-width="100%"
     data-fit="cover">
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/10-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/11-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/13-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/19-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/4-lo.jpg"></a>
</div></div>

## Dissolve
There is&nbsp;one more transition, `dissolve`. This variation of&nbsp;fade is&nbsp;perfect for demonstrating images with the identical fragments.

_Dissolve example (<a href="/<>/dissolve.html" target="_blank">new window</a>):_

<p class="switch-group">
	<span class="switch js-transition-switch active" data-fotorama="#dissolve">Dissolve</span>
	&nbsp;
	<span class="switch js-transition-switch" data-fotorama="#dissolve">Crossfade</span>
</p>

<div class="fotorama-wrap"><div class="fotorama"
     id="dissolve"
     data-transition="dissolve"
     data-width="700"
     data-ratio="700/467"
     data-max-width="100%"
     data-fit="cover"
     data-loop="true">
	<a href="http://fotorama.s3.amazonaws.com/i/orion-art/5-a.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/orion-art/5-b.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/orion-art/5-c.jpg"></a>
</div></div>