/*
 * grunt-csso
 * http://github.com/t32k/grunt-csso
 * http://en.t32k.me
 *
 * Copyright (c) 2013 Koji Ishimoto
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    csso: {
      compress: {
        options: {
          report: 'gzip'
        },
        files: {
          'tmp/output.css': ['test/fixtures/input.css']
        }
      },
      restructure: {
        options: {
          restructure: false,
          report: 'min'
        },
        files: {
          'tmp/restructure.css': ['test/fixtures/input.css']
        }
      },
      banner: {
        options: {
          banner: '/* Copyleft */'
        },
        files: {
          'tmp/banner.css': ['test/fixtures/input.css']
        }
      },
      empty: {
        files: {
          'tmp/idontexist.css': ['test/fixtures/idontexist.css']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'csso', 'nodeunit']);

};