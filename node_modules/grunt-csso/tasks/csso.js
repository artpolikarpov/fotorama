/*
 * grunt-csso
 * http://github.com/t32k/grunt-csso
 * http://en.t32k.me
 *
 * Copyright (c) 2013 Koji Ishimoto
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {

    var csso = require('csso'),
        helper = require('grunt-lib-contrib').init(grunt);

    // Tasks
    // ==========================================================================

    grunt.registerMultiTask('csso', 'Minify CSS files with CSSO.', function () {

        var options = this.options({
            restructure: true,
            banner: '',
            report: false
        });

        // Process banner.
        var banner = grunt.template.process(options.banner);

        this.files.forEach(function (f) {
            var max = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            })
                .map(grunt.file.read)
                .join(grunt.util.normalizelf(grunt.util.linefeed));

            var min = processCSSO(max, options.restructure);
            if (min.length < 1) {
                grunt.log.warn('Destination not written because minified CSS was empty.');
            } else {
                // Add banner.
                min = banner + min;

                grunt.file.write(f.dest, min);
                grunt.log.writeln('File ' + String(f.dest).green + ' created.');
                if (options.report) {
                    helper.minMaxInfo(min, max, options.report);
                }
            }
        });
    });


    // Helper
    // ==========================================================================

    /**
     * Process CSSO minification
     * @param {String} src
     * @param {Boolean} isOpt
     */
    var processCSSO = function (src, isOpt) {
        var min;
        if (isOpt) {
            min = csso.justDoIt(src);
        } else {
            min = csso.justDoIt(src, true);
        }
        return min;
    };

};