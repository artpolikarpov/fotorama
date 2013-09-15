Let Fotorama play photos automatically using `data-autoplay="true"`:

	<div class="fotorama"
	     data-autoplay="true">
	  <img src="1.jpg">
	  <img src="2.jpg">
	</div>

By&nbsp;default, a&nbsp;pause between images is&nbsp;5&nbsp;seconds. Set any interval in&nbsp;milliseconds, for example, 3&nbsp;seconds: `data-autoplay="3000"`.

*Autoplay example (<a href="/examples/autoplay.html" target="_blank">new window</a>):*

<div class="fotorama-wrap"><div class="fotorama"
     data-autoplay="3000"
     data-width="700"
     data-ratio="3/2"
     data-nav="thumbs">
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/1-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/1-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/2-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/2-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/3-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/3-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/4-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/4-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/25-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/25-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/26-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/26-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/27-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/27-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/28-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/28-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/29-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/29-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/30-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/30-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/11-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/11-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/12-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/12-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/13-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/13-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/14-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/14-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/15-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/15-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/16-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/16-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/20-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/20-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/21-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/21-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/22-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/22-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/23-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/23-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/24-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/24-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/17-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/17-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/18-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/18-thumb.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/19-lo.jpg"><img src="http://fotorama.s3.amazonaws.com/i/okonechnikov/19-thumb.jpg"></a>
</div></div>

The show stops on&nbsp;touch. Change this with `data-stopautoplayontouch="false"`.