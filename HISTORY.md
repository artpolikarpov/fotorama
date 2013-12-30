# Release history

> https://github.com/artpolikarpov/fotorama/releases

## 4.4.9, Dec 30 2013

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

## 4.4.8, Nov 13 2013

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

## 4.4.7, Nov 5 2013

<!--4.4.7:name-->

Spin the spinner

<!--/4.4.7:name-->

<!--4.4.7:notes-->

* New preloader ([spin.js](http://fgnass.github.io/spin.js)).
* Fix some issues with fade transitions in IE 7 and IE 8.
* Disable GPU compositing of frame when video plays.
* Cache image dimensions. Improved loading mechanics.

<!--/4.4.7:notes-->

## 4.4.6, Oct 20 2013

<!--4.4.6:name-->

Optimizations

<!--/4.4.6:name-->

<!--4.4.6:notes-->

* More optimizations of GPU and CPU rendering.

<!--/4.4.6:notes-->

## 4.4.5, Oct 17 2013

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