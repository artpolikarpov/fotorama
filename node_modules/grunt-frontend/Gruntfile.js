module.exports = function(grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		nodeunit: {
			tests: ['test/*.js']
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'default'
		},
		jshint: {
			files: ['grunt.js', 'tasks/**/*.js', '!tasks/lib/parser.js', 'test/*.js'],
			options: {
				curly:     true,
				eqeqeq:    false,
				immed:     true,
				latedef:   true,
				newcap:    true,
				noarg:     true,
				sub:       true,
				undef:     true,
				boss:      true,
				eqnull:    true,
				node:      true,
				es5:       true,
				smarttabs: true
			},
			globals: {}
		},

		frontend: {
			production: {
				options: {
					webroot: './out',
					srcWebroot: './test'
				},
				css: {
					src: 'test/css',
					dest: 'out/css'
				},
				js: {
					files: {
						'out/js/f.js': [
							'test/js/file1.js',
							'test/js/file2.js'
						]
					}
					
				}
			}
		}
	});

	// Load local tasks.
	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Default task.
	grunt.registerTask('default', ['jshint', 'nodeunit']);
};
