Flip Fotorama direction on Hebrew or Arabic sites with `data-direction="rtl"`:

    <div class="fotorama"
         data-direction="rtl">
      <img src="1.jpg" data-caption="1. الرجل في سيارة">
      <img src="2.jpg" data-caption="2. جوقة">
    </div>

It chages frame order, captions position, and autoplay direction:

*Right-to-left example (<a href="/examples/right-to-left.html" target="_blank">new window</a>):*

<div class="fotorama-wrap"><div class="fotorama"
     data-direction="rtl"
     data-autoplay="3000"
     data-loop="true"
     data-width="500"
     data-ratio="3/2"
     data-max-width="100%">
	<a href="http://fotorama.s3.amazonaws.com/i/nyc/guy-in-car.jpg" data-caption="1. الرجل في سيارة"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/nyc/acapella.jpg" data-caption="2. جوقة"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/nyc/crazyjohn.jpg" data-caption="3. مجنون جون"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/nyc/dudeintheground.jpg" data-caption="4. المتأنق في الأرض"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/nyc/dudes.jpg" data-caption="5. الرجال"></a>
</div></div>