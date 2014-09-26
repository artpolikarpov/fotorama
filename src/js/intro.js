(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define('fotorama', ['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
  "use strict";