$(function () {
	$('.js-shuffle').on('click', function (e) {
		e.preventDefault();

		var $this = $(this),
				fotorama = $($this.attr('data-fotorama')).data('fotorama');

		if (fotorama) {
			fotorama.shuffle();
		}
	});
});