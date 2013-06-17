$(function () {
	$('.js-transition-switch').on('click', function (e) {
		e.preventDefault();

		var $this = $(this),
				fotorama = $($this.attr('data-fotorama')).data('fotorama');

		if (fotorama) {
			$this.addClass('active inverse')
					.siblings().removeClass('active inverse');

			fotorama.setOptions({transition: $this.text().toLowerCase()});
		}
	});
});