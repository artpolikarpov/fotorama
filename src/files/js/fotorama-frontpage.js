$(function () {
  var $fotorama = $('.fotorama-frontpage');

  if ($fotorama[0]) {
    if ($(window).width() > 768) {
      $('a', $fotorama).each(function () {
        var $a = $(this);
        $a.attr('href', $a.attr('href').replace('-lo.jpg', '.jpg'));
      });
    }

    $fotorama
        .fotorama()
        .parent()
        .next('.photos-by')
        .show();
  }
});