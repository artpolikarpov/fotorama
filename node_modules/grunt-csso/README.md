# grunt-csso [![Build Status](https://secure.travis-ci.org/t32k/grunt-csso.png?branch=master)](http://travis-ci.org/t32k/grunt-csso)

> Minify CSS files with CSSO.

## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-csso --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of js:

```js
grunt.loadNpmTasks('grunt-csso');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4).*


## Installation & Options

1. Install this grunt plugin next to your project's grunt.js gruntfile with: `npm install grunt-csso`.
2. Call `grunt.loadNpmTasks('grunt-csso')` in your gruntfile.
3. Configure `grunt csso` to minimizes your CSS file and call the task(s).
  e.g.:

  ```js
    csso: {
      dist: {
        files: {
          'tmp/output.css': ['test/fixtures/input.css']
        }
      }
    }
  ```

4. You can turns __structure minimization__ off like this:

    ```js
    // Default option value is true.
    restructure: false
    ```

5. You can add banner comment like in [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) or [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify):

    ```js
    // Option
    banner: '/* Copyleft */'
    ```

6. You can change report style.

    ```js
    // Choices: false, 'min', 'gzip'
    // Default option value is false.
    report: 'gzip'
    ```

Example ouput using `'min'`:

    ```
    Original: 99 bytes.
    Minified: 72 bytes.
    ```

## Example Setup

  ```js
  csso: {
    compress: {
      options: {
        report: 'gzip'
      },
      files: {
        'output.css': ['input.css']
      }
    },
    restructure: {
      options: {
        restructure: false,
        report: 'min'
      },
      files: {
        'restructure.css': ['input.css']
      }
    },
    banner: {
      options: {
        banner: '/* Copyleft */'
      },
      files: {
        'banner.css': ['input.css']
      }
    }
  }
  ```

## Release History

+ 2013/03/26 - v0.5.0 - Add 'report' option (false by default).
+ 2013/02/25 - v0.4.1 - Add 'banner' option. 
+ 2013/02/17 - v0.4.0 - Support compatibility with Grunt 0.4.
+ 2013/01/17 - v0.3.0 - Improve file handling.
+ 2012/10/20 - v0.2.1 - Fix function to remove unnecessary argument.
+ 2012/10/20 - v0.2.0 - Changed CSSO task from the command line to from the npm module.
+ 2012/10/15 - v0.1.1 - Added keyword "gruntplugin" to package.json.
+ 2012/10/14 - v0.1.0 - Initial release.

## Contributors

Many thanks!

+ [Tyler Kellen](https://github.com/tkellen)
+ [Ayumu Sato](https://github.com/ahomu)
+ [Artem Sapegin](https://github.com/sapegin)

---

# LICENSE MIT

Copyright (c) 2013 Koji Ishimoto

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
