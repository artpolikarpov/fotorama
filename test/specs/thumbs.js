document.write(
	'<div class="fotorama" data-nav="thumbs" data-thumb-width="48" data-thumb-height="48" id="fotorama">' +
		'<img src="test/i/okonechnikov/1-lo.jpg">' +
		'<img src="test/i/okonechnikov/2-lo.jpg">' +
		'<img src="test/i/okonechnikov/9-lo.jpg">' +
		'<img src="test/i/okonechnikov/6-lo.jpg">' +
		'<img src="test/i/okonechnikov/5-lo.jpg">' +
	'</div>'
);

function random (min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}

function setStyle ($el, style) {
  var el = $el[0];
  if (el.styleSheet) {
    el.styleSheet.cssText = style;
  } else {
    $el.html(style);
  }
}

describe('Thumbs', function () {
	var $fotorama, fotorama, $thumb, $style, max;

	beforeEach(function () {
		$fotorama = $fotorama || $('#fotorama');
		fotorama = fotorama || $fotorama.data('fotorama');
    $thumb = $thumb || $('.fotorama__nav__frame--thumb');
    $style = $style || $('<style></style>').insertAfter($fotorama);
    max = fotorama.size - 1;

	});

	it('thumbs width & height are correct', function () {
    expect($thumb.eq(random(max)).width()).toBe(48);
    expect($thumb.eq(random(max)).height()).toBe(48);
	});

  it('even with global `* { box-sizing: border-box; }`', function () {
    setStyle($style, '* { box-sizing: border-box; }');
    expect($thumb.eq(random(max)).width()).toBe(48);
    expect($thumb.eq(random(max)).height()).toBe(48);
	});
});