
<!-- TITLE/ -->

# Safe FS

<!-- /TITLE -->


<!-- BADGES/ -->

[![Build Status](http://img.shields.io/travis-ci/bevry/safefs.png?branch=master)](http://travis-ci.org/bevry/safefs "Check this project's build status on TravisCI")
[![NPM version](http://badge.fury.io/js/safefs.png)](https://npmjs.org/package/safefs "View this project on NPM")
[![Gittip donate button](http://img.shields.io/gittip/bevry.png)](https://www.gittip.com/bevry/ "Donate weekly to this project using Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

Stop getting EMFILE errors! Open only as many files as the operating system supports.

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

## Install

### [Node](http://nodejs.org/)
- Use: `require('safefs')`
- Install: `npm install --save safefs`

<!-- /INSTALL -->


## Usage

``` javascript
var safefs = require('safefs');
```

SafeFS uses [graceful-fs](https://npmjs.org/package/graceful-fs) to wrap all of the standard [file system](http://nodejs.org/docs/latest/api/all.html#all_file_system) methods to avoid EMFILE errors among other problems.

Ontop of graceful-fs, SafeFS also adds additional wrapping on the following methods:

- `writeFile(path, data, options?, next)` - ensure the full path exists before writing to it
- `appendFile(path, data, options?, next)` -  ensure the full path exists before writing to it
- `mkdir(path, mode?, next)` - mode defaults to `0o777 & (~process.umask())`
- `unlink(path, next)` - checks if the file exists before removing it
- `exists(path, next)` - node <v0.6 and >=v0.6 compatibility
- `existsSync(path)` - node <v0.6 and >=v0.6 compatibility

SafeFS also define these additional methods:

- `ensurePath(path, options, next)` - ensure the full path exists, equivalant to unix's `mdir -p path`


<!-- HISTORY/ -->

## History
[Discover the change history by heading on over to the `HISTORY.md` file.](https://github.com/bevry/safefs/blob/master/HISTORY.md#files)

<!-- /HISTORY -->


<!-- CONTRIBUTE/ -->

## Contribute

[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/bevry/safefs/blob/master/CONTRIBUTING.md#files)

<!-- /CONTRIBUTE -->


<!-- BACKERS/ -->

## Backers

### Maintainers

These amazing people are maintaining this project:

- Benjamin Lupton <b@lupton.cc> (https://github.com/balupton)

### Sponsors

No sponsors yet! Will you be the first?

[![Gittip donate button](http://img.shields.io/gittip/bevry.png)](https://www.gittip.com/bevry/ "Donate weekly to this project using Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")

### Contributors

These amazing people have contributed code to this project:

- [Benjamin Lupton](https://github.com/balupton) <b@lupton.cc> — [view contributions](https://github.com/bevry/safefs/commits?author=balupton)
- [jagill](https://github.com/jagill) — [view contributions](https://github.com/bevry/safefs/commits?author=jagill)
- [sfrdmn](https://github.com/sfrdmn) — [view contributions](https://github.com/bevry/safefs/commits?author=sfrdmn)

[Become a contributor!](https://github.com/bevry/safefs/blob/master/CONTRIBUTING.md#files)

<!-- /BACKERS -->


<!-- LICENSE/ -->

## License

Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT license](http://creativecommons.org/licenses/MIT/)

Copyright &copy; 2013+ Bevry Pty Ltd <us@bevry.me> (http://bevry.me)
<br/>Copyright &copy; 2011-2012 Benjamin Lupton <b@lupton.cc> (http://balupton.com)

<!-- /LICENSE -->


