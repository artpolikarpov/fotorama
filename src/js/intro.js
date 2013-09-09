(function (window, document, location, $, undefined) {
  "use strict";

  var JQUERY_VERSION = $ && $.fn.jquery.split('.');

  if (!JQUERY_VERSION
      || JQUERY_VERSION[0] < 1
      || (JQUERY_VERSION[0] == 1 && JQUERY_VERSION[1] < 8)) return console.error('Fotorama requires jQuery 1.8 or later and will not run without it.');