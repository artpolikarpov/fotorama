document.write(
	'<div class="fotorama" data-auto="false" id="fotorama">' +
		'<img src="test/i/okonechnikov/1-lo.jpg">' +
		'<img src="test/i/okonechnikov/2-lo.jpg">' +
		'<img src="test/i/okonechnikov/9-lo.jpg">' +
		'<img src="test/i/okonechnikov/6-lo.jpg">' +
		'<img src="test/i/okonechnikov/5-lo.jpg">' +
	'</div>'
);

describe('Initialization', function () {
	var $fotorama, fotorama;

	beforeEach(function () {
		$fotorama = $fotorama || $('#fotorama');
	});

	it('not initialized because of data-auto="false"', function () {
		expect($fotorama.data('fotorama')).toBeUndefined();
	});

	it('initialized after .fotorama()', function () {
		$fotorama.fotorama();
		expect($fotorama.data('fotorama')).toBeDefined();
	});
});