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
