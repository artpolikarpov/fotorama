$(function () {
	$('.js-arrow').on('mousedown', function (e) {
		e.preventDefault();

		var $this = $(this),
				data = $this.data(),
				fotorama = $(data.fotorama).data('fotorama');

		fotorama && fotorama.show({index: data.show, slow: e.altKey});
	});
});