var JQUERY_VERSION = $ && $.fn.jquery.split('.');

if (!JQUERY_VERSION
    || JQUERY_VERSION[0] < 1
    || (JQUERY_VERSION[0] == 1 && JQUERY_VERSION[1] < 8)) {
  throw 'Fotorama requires jQuery 1.8 or later and will not run without it.';
}