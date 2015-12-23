# Release history

> https://github.com/artpolikarpov/fotorama/releases

## 4.6.3, 31 December 2014

<!--4.6.4:name-->
Dummy
<!--/4.6.4:name-->

<!--4.6.4:notes-->
Just to fix npm & bower packages.
<!--/4.6.4:notes-->

<!--4.6.3:name-->
HPPNWYR
<!--/4.6.3:name-->

<!--4.6.3:notes-->

* #339 Set `box-sizing: content-box;` only for needed blocks inside a fotorama
* #323 Fix autoplay interval corruption on mousemove
* #312 Let browsers round dimensions by themselfs
* #299 No more collecting fotorama usage statistics via foreign iframe.

<!--/4.6.3:notes-->

## 4.6.2, 7 August 2014

<!--4.6.2:name-->
Hot sorry
<!--/4.6.2:name-->

<!--4.6.2:notes-->
Fotorama 4.6.0 broke image fitting into stage (#286, #291, and many more in inbox). This release fixes that.

Some new features, meanwhile:
* New `enableifsingleframe` option. Default value is `false`. Set it to `true` if you don’t want to disable fotorama navigation when it has only one frame.
* Smarter autoplay. Now waits until the next frame is fully loaded.


<!--/4.6.2:notes-->

## 4.6.0, 7 August 2014

<!--4.6.0:name-->

Position

<!--/4.6.0:name-->

<!--4.6.0:notes-->

* New `position` and `thumbposition` options.
* Fix some IE7 & IE8 bugs (#273, #279).
* Fix thumbnail fit.
* Better auto initialization.
* Fix blocking event flow in some odd situations.
* #267 “Play” triangles on video thumbnails are back.
* Finally fix `clicktransition` behaviour.
* Fix `fotorama:show` event triggering.
* Some minor fixes and optimization.

### `position`

Fotorama centers photos by default when fits them into a stage. Now you can change this:

```html
<!-- Align photos to the left-top corner -->
<div class="fotorama" data-position="0 0">
  <img src="1.jpg">

  <!-- Override position for a single photo,
       center 2.jpg horizontally, and move up by 10px -->
  <img src="2.jpg" data-position="50% -10px">

  <!-- Show the right-bottom corner of 3.jpg -->
  <img src="3.jpg" data-position="100% 100%">
</div>
```

### `thumbposition`

Works just like `position` but for thumnbails.

<!--/4.6.0:notes-->

## 4.5.2, 23 June 2014

<!--4.5.2:name-->

Three years

<!--/4.5.2:name-->

<!--4.5.2:notes-->

:birthday:

* Keyboard accessibility, allow tabbing on arrows and thumbs.
* #255 Better styles for printing.
* New `controlsonstart` option. Set it to `false` if you want controls to appear only after hover or tap.
* New `thumbfit` option.
* New `thumbratio:'auto'` option (experimental :skull:).
* #232 Simplify and fix logic when to trigger show events
* #236 Fix video loading on https
* Default cursor is now `pointer` because for desktop users one click is enough to switch the frame. Cursor changes to `grab` only on dragging and swiping.
* #246 Make fotorama monolithic with z-index.
* #251 Now fotorama’s dimensions are really the dimensions of the first image (by order, not by loading time).
* #253 Do not cache `$('html')` and `$('body')` for correct fullscreen in single-page-apps (Meteor, Angular, Derby).
* Fix `clicktransition` behaviour.
* #243 Add missing dependencies and repository-setting to package.json
* Better image fit, work nice with odd width without Retina artefacts.
* Adjust animations.
* Disabled trackpad by default.
* Fix loop conditions.

:candy: :candy: :candy:

Today is the third anniversary of Fotorama.

Using Fotorama? Be sure to drop me a link, wanna see it in action:
* [:envelope: fotoramajs@gmail.com](fotoramajs@gmail.com)

### Thanks for your thanks :+1:

* PayPal: [fotoramajs@gmail.com](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7M9KK5AQPG6CC)
* Yandex.Money: [4100139676157](https://money.yandex.ru/direct-payment.xml?receiver=4100139676157)
* Bitcoin: [1AbXUmE6xzinqKaHu<wbr/>TVFRXtnxffFqvKkka](bitcoin:1AbXUmE6xzinqKaHuTVFRXtnxffFqvKkka)
* Flattr: [Fotorama](https://flattr.com/thing/1845948/)

<!--/4.5.2:notes-->

## 4.5.1, 29 March 2014

<!--4.5.1:name-->

Keep it ace

<!--/4.5.1:name-->

<!--4.5.1:notes-->

* Fix animations and visibility of arrows and captions.
* #181 Always visible arrows via `arrows:'always'`.
* #214 Fullscreen mode now using complete width and surpass the `maxwidth` limit.
* #218 Allow to hide captions via setOptions.
* Make `loop:true` and `clicktransition:'crossfade'` play well together.
* #219 Extended keyboard support.
* Fix some measures collisions.
* Optimize, test.

### Extended keyboard support
The old `data-keyboard="true"` enables keyboard navigation with the arrows. Extend it passing the object with keys you want to turn on:

```javascript
<div class="fotorama"
     data-keyboard='{"space":true, "home":true, "end":true}'>
  <img src="1.jpg">
  <img src="2.jpg">
</div>
```

<!--/4.5.1:notes-->

## 4.5.0, 20 March 2014

<!--4.5.0:name-->

Yana

<!--/4.5.0:name-->

<!--4.5.0:notes-->

New options:
* `navwidth` — sets the special width of the nav;
* `clicktransition` — alternative transition after click, now it is possible to slide after swipe and fade after click.

Now fotorama shows only first raw slide while initialization.
Class `.fotorama--unobtrusive` makes fotorama unobtrusive and shows all raw slides,
use it when you care about users without JavaScript.

Closed issues:

* #159 Found the balance between swipe, click, and arrows.
* #160 Fixed tiny drag on the arrows.
* #174 Crush sprite files (via @zslabs).
* #187 Fix compatibility with `$.noConflict(true)` (via @Lendar).
* #192 Fixed `stopautoplayontouch`.
* #205 Fixed a typo that forced using the http protocol (via @dhayab).

Fixed `glimpse`, nav overflow bug, and other minors.

<!--/4.5.0:notes-->

## 4.4.9, 30 December 2013

<!--4.4.9:name-->

Making it even better

<!--/4.4.9:name-->

<!--4.4.9:notes-->

Fixed issues:

* #115 Partially hidden fullscreen-icon
* #159 Some animation bugs.
* #160 Move-click-swipe tolerances.
* #161, #162 Recursion (when connecting some of the events and methods).

<!--/4.4.9:notes-->

## 4.4.8, 13 November 2013

<!--4.4.8:name-->

Five hot fixes

<!--/4.4.8:name-->

<!--4.4.8:notes-->

* Counterclockwise spinner if `direction:rtl`.
* Fix onTouchEnd call. Fix infinite spinner which sometimes happened
* Fix doubled spinner.
* Remove stagetap event.
* More accurate deleting broken frames, good frames will not be flushed any more.

<!--/4.4.8:notes-->

## 4.4.7, 5 November 2013

<!--4.4.7:name-->

Spin the spinner

<!--/4.4.7:name-->

<!--4.4.7:notes-->

* New preloader ([spin.js](http://fgnass.github.io/spin.js)).
* Fix some issues with fade transitions in IE 7 and IE 8.
* Disable GPU compositing of frame when video plays.
* Cache image dimensions. Improved loading mechanics.

<!--/4.4.7:notes-->

## 4.4.6, 20 October 2013

<!--4.4.6:name-->

Optimizations

<!--/4.4.6:name-->

<!--4.4.6:notes-->

* More optimizations of GPU and CPU rendering.

<!--/4.4.6:notes-->

## 4.4.5, 17 October 2013

<!--4.4.5:name-->

GPU & Refreshing

<!--/4.4.5:name-->

<!--4.4.5:notes-->

* Optimize and reduce GPU layers, speedup Fotorama.
* Merge #131.
* #119 Fix load method.
* Better `startAutoplay` method and autoplay itself.
* Throw error if no jQuery or it’s outdated.
* Fix glimpse unsetting with `setOptions`.
* Update arrows in `fotorama.png`.
* #116 Ability to center captions with `.fotorama__caption { text-align: center; }`.

<!--/4.4.5:notes-->

## 4.4.2

<!--4.4.2:name-->

Fine-tuning

<!--/4.4.2:name-->

<!--4.4.2:notes-->

* Fix pointer blinking.
* More friendly to browsers without JS and search engines.
* Fine-tuning of wheel and trackpad behaviour.
* Fix scroll on IE Mobile.

<!--/4.4.2:notes-->

## 4.4.0

<!--4.4.0:name-->

Options pack

<!--/4.4.0:name-->

<!--4.4.0:notes-->

* Horizontal wheel (two fingers on trackpad) enabled, disable with `data-wheel="false"`.
* New options: `margin`, `thumbmargin`, `thumbborderwidth`, `glimpse`.
* Preloader for big images on fullscreen.
* Right-to-left direction in Fotorama: `data-direction="rtl"` option.
* Support for additional params for YouTube and Vimeo links (like `&rel=0&vq=hd1080`).
* Ability to simply override defaults with `fotoramaDefaults = {some: 'option'}`.

Minor optimizations.

<!--/4.4.0:notes-->

## 4.3.4

<!--4.3.4:name-->

Minor but sensitive

<!--/4.3.4:name-->

<!--4.3.4:notes-->

* Finally-finally fix artefacts on HDPI (Retina etc.) displays.
* Fix preloader, now it works with multiple fotoramas on the page.
* #66 Strange fix of strange FF bug (thanks @andreyvolokitin).
* #89 Fix bug when fotorama with crossfade transition get selected with the blue area in Chrome for Android.
* #91 Fix linear and radial gradients syntax to reach older browsers.
* #90 Now even FF 3.6.7 onboard.
* The new `startindex` option. It accepts frame index or id.

<!--/4.3.4:notes-->

## 4.3.3

<!--4.3.3:name-->

Perf from Roman Komarov

<!--/4.3.3:name-->

<!--4.3.3:notes-->

The first fruit of open source. Three pull requests (#77, #78, #79) from @kizu:

* Make edges of fotorama__nav clickable through.
* More optimal transition for arrows and icons.
* Smoothier transition for frame between different-width thumbnails.
* Remove pointer-events from active and disabled things.

Finally remove zooming artefacts on Retina displays. Some minor optimizations.

<!--/4.3.3:notes-->

## 4.3.2

<!--4.3.2:name-->

Bugfixes

<!--/4.3.2:name-->

<!--4.3.2:notes-->

* #55 Blink after fast-fast clicks with crossfade or dissolve transition.
* #58 Cannot read property '$navThumbFrame' of undefined.
* #60 IE8: Unable to get value of the property 'style': object is null or undefined.
* #62 Broken fullscreen if fotorama block has a `max-width` property.
* #67 Broken keyboard navigation after destroying and recreating fotorama.
* #72 Undefined thumb aspect ratio on HTML frames.
* Fix image scalling artifacts on Retina displays.
* Better splitting of swipe and click
* Fix unloading videos
* Hide captions on videoplay

New `fotorama:stagetap` event. More manual and auto tests. Optimizations.

*Many thanks to all the issues reporters.*

<!--/4.3.2:notes-->

## 4.3.0

<!--4.3.0:name-->

Mobile & speed

<!--/4.3.0:name-->

<!--4.3.0:notes-->

Windows Phone & Android support, better swipe & scroll, `data` option to load from, tons of fixes.

<!--/4.3.0:notes-->