$(function () {
	$('.js-transition-switch').on('click', function () {
		var $this = $(this),
				api = $($this.attr('data-fotorama')).data('api');

		if (api) {
			$this.addClass('active')
					.siblings().removeClass('active');

			api.setOptions({transition: $this.text().toLowerCase()});
		}
	});
});