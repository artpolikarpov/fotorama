$(function () {
	$('.js-arrow').on('mousedown', function (e) {
		e.preventDefault();

		var $this = $(this),
				data = $this.data(),
				api = $(data.fotorama).data('api');

		api.show({index: data.show, slow: e.altKey});
	});
});