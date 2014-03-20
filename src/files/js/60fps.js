$(function () {
  var $body = $('body'),
      active,
      t;
  $(window).on('scroll', function () {
    if (!active) {
      active = true;
      $body.css({pointerEvents: 'none'});
    }

    clearTimeout(t);
    t = setTimeout(function () {
      $body.css({pointerEvents: 'auto'});
      active = false;
    }, 333);
  });
});