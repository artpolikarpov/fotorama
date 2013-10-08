# Fotorama source

There is nothing for non-coders. Take the latest and ready-to-use Fotorama on its website:<br>
> **http://fotorama.io/set-up**

## How to build
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

Test that Grunt's CLI is installed by running `grunt --version`.  If the command isn't found, run `npm install -g grunt-cli`.  For more information about installing Grunt, see the [getting started guide](http://gruntjs.com/getting-started).

1. Fork and clone the repo.
2. Run `npm install` to install all dependencies (including Grunt).
3. Run `grunt` to grunt this project.

To hack on use `grunt watch`.

Assuming that you don't see any red, you're ready to go. Just be sure to run `grunt` after making any changes, to ensure that nothing is broken.

The built version of Fotorama will be put in the `product/` subdirectory.

## Submitting pull requests
1. Create a new branch, please don't work in your `master` branch directly.
2. Add stuff.
3. Push to your fork and submit a pull request to Fotorama’s `develop` branch.

Regarding code style like indentation and whitespace, follow the conventions you see used in the source already.

## [Release History](https://github.com/artpolikarpov/fotorama/releases)

### 4.4.2

<!--0.4.12:name-->

Minor but sensitive.

<!--/0.4.12:name-->

<!--0.4.12:notes-->

* Fix pointer blinking.
* More friendly to browsers without JS and search engines.
* Fine-tuning of wheel and trackpad behaviour.
* Fix scroll on IE Mobile

<!--/0.4.12:notes-->

### 4.4.0

<!--4.4.4:notes-->

* Horizontal wheel (two fingers on trackpad) enabled, disable with `data-wheel="false"`.
* New options: `margin`, `thumbmargin`, `thumbborderwidth`, `glimpse`.
* Preloader for big images on fullscreen.
* Right-to-left direction in Fotorama: `data-direction="rtl"` option.
* Support for additional params for YouTube and Vimeo links (like `&rel=0&vq=hd1080`).
* Ability to simply override defaults with `fotoramaDefaults = {some: 'option'}`.

Minor optimizations.

<!--/4.4.4:notes-->