Control the way your users interact with the fotorama with three attributes `data-arrows`, `data-click`, and `data-swipe`:

```
<div class="fotorama"
     data-arrows="true"
     data-click="true"
     data-swipe="false">
  <img src="1.jpg">
  <img src="2.jpg">
  <img src="3.jpg">
</div>
```

*Arrows-click-swipe example (<a href="/examples/arrows-click-swipe.html" target="_blank">new window</a>):*

<form class="js-set-options" data-fotorama="#slide-controls">
  <label><input type="checkbox" name="arrows" checked> Arrows</label>
  &nbsp;
  <label><input type="checkbox" name="click" checked> Click</label>
  &nbsp;
  <label><input type="checkbox" name="swipe" checked> Swipe</label>
</form>

<!-- Fotorama -->
<div class="fotorama-wrap"><div class="fotorama"
     id="slide-controls"
     data-width="700"
     data-ratio="3/2">
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/1-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/2-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/9-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/6-lo.jpg"></a>
	<a href="http://fotorama.s3.amazonaws.com/i/okonechnikov/5-lo.jpg"></a>
</div></div>