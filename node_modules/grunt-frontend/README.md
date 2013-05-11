A [Grunt.js](http://gruntjs.com) task that compiles CSS and JS files with respect of _file modification_ date. For JS, it uses built-in [UglifyJS](https://github.com/mishoo/UglifyJS) minifier, for CSS — Yandex’s [CSSO](https://github.com/css/csso) with automatic `@import` inlining.

Unlike basic minifiers, this task generates a hidden catalog file (`.build-catalog.json`) that stores state, last compilation date and md5 hashes of minified files. Every time you call `frontend` task, it will look into this catalog and check if the state of files being minified was changed. If not, the file _will not_ be re-minified which saves CPU time and _modification date_. This date (or md5 hash) can be used to modify URLs to minified files for effective caching.

## Usage ##

This plugin provides `frontend` task. Here’s example `grunt.js` file:

```js
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        frontend: {
            // `frontend` is a multi-task
            main: {
                // task options
                options: {
                    // Force file minification even if they were not modified
                    force: false,
        
                    // Path to project sources root folder.
                    // It is used to resolve absolute paths in CSS imports,
                    // for example: @import "/css/file.css" will be resolved 
                    // to './src/files/css/file.css'
                    srcWebroot: './src/files',
        
                    // Destination root folder.
                    // Used to update minified files paths in catalog,
                    // e.g. instead of storing '/Users/foo/project/out/css/minified.css' path, 
                    // task will cut-out path to webroot and store '/css/minified.css' instead
                    webroot: './out'
                },
                
                 // CSS subtask: find all CSS files in `src` folder and 
                // store minified version in `dest` folder
                css: {
                    src: './src/css',
                    dest: './out/css'
                },
                
                // JS subtask: works pretty much the same as default 
                // `min` task:
                // https://github.com/gruntjs/grunt/blob/master/docs/task_min.md
                js: {
                    './out/js/f1.js': [
                        './src/js/fileA.js',
                        './src/js/fileB.js'
                    ],
    
                    './out/js/f2.js': [
                        './src/js/fileC.js',
                        './src/js/fileD.js'
                    ]
                }
            }
        }
    });
};
```

This task can be used together with [docpad-plugin-frontend](https://github.com/sergeche/docpad-plugin-frontend) to automatically generate cache-effective URLs to assets for [DocPad](https://github.com/bevry/docpad)-generated web-site.
