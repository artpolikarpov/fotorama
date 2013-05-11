module.exports = function(grunt) {
	"use strict";

	var frontend = require('./lib/frontend').init(grunt);
	var _ = require('underscore');

	var taskMap = {
		'css': 'compileCSS',
		'css-file': 'compileCSSFile',
		'js': 'compileJS'
	};

	grunt.registerMultiTask('frontend', 'Builds font-end part of your web-site: compiles CSS and JS files', function() {
		grunt.log.writeln('Compiling ' + this.target.toUpperCase());
		var data = this.data;
		var catalog = frontend.loadCatalog();
		var config = frontend.validateConfig(_.extend({}, grunt.config.get('frontendConfig') || {}, this.data.options || {}));

		_.keys(taskMap).forEach(function(h) {
			if (h in data) {
				frontend[taskMap[h]].call(frontend, data[h], config, catalog);
			}
		});

		// update catalog
		return frontend.saveCatalog(catalog);
	});
};