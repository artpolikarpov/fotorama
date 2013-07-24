$(function () {
  // Change options on the fly
  $('.js-set-options').on('change', function (e) {
    var fotorama = $($(this).data('fotorama')).data('fotorama'),
        options = {};

    if (!fotorama) return;

    $(':input', this).each(function () {
      var $input = $(this);
      options[$input.attr('name')] = $input.attr('type') === 'checkbox' ? $input.is(':checked') : $input.val();
    });

    fotorama.setOptions(options);
  });
});