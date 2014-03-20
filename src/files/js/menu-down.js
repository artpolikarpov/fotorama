$(function () {
  var $document = $(document),
      documentData = $document.data();

  function showMenu () {
    if (!documentData.$menu) return;

    menuPropagation(
        documentData.$menu
            .stop()
            .css({marginTop: -10, opacity: 0})
            .show()
            .animate({marginTop: 0, opacity: 1}, 200)
    );
  }

  function hideMenu () {
    if (!documentData.$menu) return;

    $('.js-menu-down')
      .data({used: false})
      .removeClass('active');

    documentData.$menu
        .stop()
        .animate({marginTop: 20, opacity: 0}, 200, function () {
          $(this).hide();
        });
  }

  function menuPropagation ($menu) {
    var menuData = $menu.data();

    if (!menuData || menuData.ok) return;

    menuData.ok = true;

    $menu.on('click', function (e) {
      e.stopPropagation();
    });
  }

  $('.js-menu-down').on('click', function (e) {
    e.stopPropagation();

    var $caret = $(this),
        caretData = $caret.data(),
        used = caretData.used;

    hideMenu();

    if (!used) {
      caretData.used = true;
      $caret.addClass('active');
      documentData.$menu = $caret.next('.menu');
      showMenu();
    }
  });

  $document.on('click keydown', function (e) {
    if (e.type === 'click' || e.keyCode === 27) {
      hideMenu();
    }
  })
});