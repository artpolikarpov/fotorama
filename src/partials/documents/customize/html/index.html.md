<style type="text/css">
	.fotorama .any {
		text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
		font-family: Georgia, serif;
		font-size: 72px;
		text-align: center;
		height: 100%;
		box-sizing: border-box;
		padding-top: 100px;
		line-height: normal;
	}

	.fotorama .inverse {
		color: #fff;
		text-shadow: 0 1px 0 #000;
	}
</style>

Show custom <abbr>HTML</abbr>:

	<div class="fotorama">
	  <div>One</div>
	  <div><strong>Two</strong></div>
	  <div><em>Three</em></div>
	</div>

Work with links, divs, tables, paragraphs and more. Write the <abbr>CSS</abbr> for embedded blocks yourselves.

_Custom <abbr>HTML</abbr> example (<a href="/examples/html.html" target="_blank">new window</a>):_

<div class="fotorama-wrap"><div class="fotorama" data-width="500" data-height="281">
	<div class="any" style="background: rgba(255, 0, 0, .1);">One</div>
	<div class="any" style="background: rgba(0, 255, 0, .1);"><strong>Two</strong></div>
	<div class="any" style="background: rgba(0, 0, 255, .1);"><em>Three</em></div>
</div></div>

## Selectable text
Make text selectable with `fotorama__select` class:

	<div class="fotorama">
	  <div><span class="fotorama__select">One</span></div>
	  <div><strong class="fotorama__select">Two</strong></div>
	  <div><em class="fotorama__select">Three</em></div>
	</div>

_Selectable text example (<a href="/examples/html-selectable.html" target="_blank">new window</a>):_

<div class="fotorama-wrap"><div class="fotorama" data-width="500" data-height="281">
	<div class="any" style="background: rgba(255, 0, 0, .1);"><span class="fotorama__select">One</span></div>
	<div class="any" style="background: rgba(0, 255, 0, .1);"><strong class="fotorama__select">Two</strong></div>
	<div class="any" style="background: rgba(0, 0, 255, .1);"><em class="fotorama__select">Three</em></div>
</div></div>

## Thumbnails
To&nbsp;define a&nbsp;thumbnail for such frame, use `data-thumb`:

	<div class="fotorama" data-nav="thumbs">
	  <div data-thumb="1_thumb.jpg">One</div>
	  <div data-thumb="2_thumb.jpg"><strong>Two</strong></div>
	  <div data-thumb="3_thumb.jpg"><em>Three</em></div>
	</div>

If you need to have each thumbnail had its own aspect ratio, set `data-thumbratio` for every frame:

```xml
<div class="fotorama" data-nav="thumbs">
  <div data-thumb="1_thumb.jpg" data-thumbratio="144/96">One</div>
  <div data-thumb="2_thumb.jpg" data-thumbratio="64/128"><strong>Two</strong></div>
  <div data-thumb="3_thumb.jpg" data-thumbratio="1"><em>Three</em></div>
</div>
```

## Images
Combine with the fotorama images using `data-img`:

	<div class="fotorama">
	  <div data-img="1.jpg">One</div>
	  <div data-img="2.jpg"><strong>Two</strong></div>
	  <div data-img="3.jpg"><em>Three</em></div>
	</div>

_Custom <abbr>HTML</abbr> with the fotorama images (<a href="/examples/html-with-images.html" target="_blank">new window</a>):_

<div class="fotorama-wrap"><div class="fotorama" data-width="500" data-height="281"  data-fit="cover">
	<div data-img="http://fotorama.s3.amazonaws.com/i/okonechnikov/19-lo.jpg" class="any inverse">One</div>
	<div data-img="http://fotorama.s3.amazonaws.com/i/okonechnikov/20-lo.jpg" class="any inverse"><strong>Two</strong></div>
	<div data-img="http://fotorama.s3.amazonaws.com/i/okonechnikov/30-lo.jpg" class="any inverse"><em>Three</em></div>
</div></div>
