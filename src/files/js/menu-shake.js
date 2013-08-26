$(function () {
  $('.logo > span, li > span').click(function () {
    var $parent = $(this).parent();
    $parent.removeClass('shake');
    setTimeout(function () {
      $parent.addClass('shake');
    }, 0);
  })
});