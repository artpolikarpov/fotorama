$(function () {
	$('.js-transition-switch').on('click', function (e) {
		e.preventDefault();

		var $this = $(this),
				api = $($this.attr('data-fotorama')).data('api');

		if (api) {
			$this.addClass('active inverse')
					.siblings().removeClass('active inverse');

			api.setOptions({transition: $this.text().toLowerCase()});
		}
	});
});