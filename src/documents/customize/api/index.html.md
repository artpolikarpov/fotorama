---
title: "<abbr>API</abbr>"
headTitle: "API"
layout: "page"
menuOrder: 103
---

<p></p>

    <script>
      $(function () {
        // 1. Initialize fotorama manually.
        var $fotoramaDiv = $('#fotorama').fotorama();

        // 2. Get the API object.
        var fotorama = $fotoramaDiv.data('fotorama');

        // 3. Inspect it in console.
        console.log(fotorama);
      });
    </script>

    <div id="fotorama"
         class="fotorama"
         data-auto="false">
    <!-- ↑ Important attribute. -->
      <img src="1.jpg">
      <img src="2.jpg">
    </div>

## Variables

### `fotorama.index` <small>Number</small>
Zero-based position of the fotorama within the all fotoramas on the page.

### `fotorama.size` <small>Number</small>
Number of frames in the fotorama.

### `fotorama.data` <small>Array</small>

### `fotorama.options` <small>Object</small>

### `fotorama.activeIndex` <small>Number</small>
Zero-based position of the active frame.

### `fotorama.activeFrame` <small>Object</small>
Frame data object with following key properties:

* `img` <small>String</small><br/>
Image <abbr>URL</abbr>.
* `thumb` <small>String</small><br/>
Thumbnail <abbr>URL</abbr>.
* `full` <small>String</small><br/>
Fullscreen image <abbr>URL</abbr>.
* `id` <small>String</small><br/>
Given id.
* `$stageFrame` <small>jQuery</small><br/>
<abbr>DOM</abbr> element of the active stage frame. Wrapped in a jQuery.
* `$navDotFrame` <small>jQuery</small><br/>
<abbr>DOM</abbr> element of the active navigation frame with iPhone-style dot. Wrapped in a jQuery.
* `$navThumbFrame` <small>jQuery</small><br/>
<abbr>DOM</abbr> element of the active navigation frame with thumbnail. Wrapped in a jQuery.

## Methods

### `fotorama.show(index)`
Shows the frame with the set `index`, zero-based number:

```javascript
// Go to the first frame:
fotorama.show(0);

// Fourth:
fotorama.show(3);
```

...or keystring:

```javascript
// Next:
fotorama.show('>');

// Previous:
fotorama.show('<');

// Last:
fotorama.show('>>');

// Arbitrary id:
fotorama.show('some-id');
```

### `fotorama.show(options)`
Shows the frame with the set `index` and in the given `time`:

```javascript
fotorama.show({
  index: 1, // The second frame.
  time: 500 // Half-second transition.
});
```

### `fotorama.startAutoplay([interval])`
Starts the slideshow with a set `interval` in milliseconds. Default iterval is `5000`, 5 seconds.

### `fotorama.stopAutoplay()`
Stops the slideshow.

### `fotorama.requestFullScreen()`
Opens fotorama in fullscreen mode, if [allowed in options](/customize/options/#allowfullscreen).

### `fotorama.cancelFullScreen()`
Leaves the fullscreen mode.

### `fotorama.playVideo()`
Starts the video if the active frame has it.

### `fotorama.stopVideo()`
Stops and unloads the currently playing video.

### `fotorama.resize(options)`
Changes the size of the fotorama, `options` is an object with `width`, `minwidth`, `maxwidth`, `height`, `minheight`, `maxheight`, and `ratio` that you can pass to force a certain size:

```javascript
fotorama.resize({
  width: 500,
  height: 333
});
```

Animate the changes by passing the `time`:

```javascript
fotorama.resize({
  width: 333,
  height: 500,
  time: 1000
});
```

### `fotorama.setOptions(options)`
Manipulates the [fotorama options](/customize/options/) at runtime:

```javascript
fotorama.setOptions({
  nav: false,
  arrows: false
});
```

### `fotorama.load(data)`
Loads new `data` into the fotorama. It should be structured as an array and follow the same patterns as the [original data](/customize/initialization/#data):

```javascript
fotorama.load([
  {img: '1.jpg', thumb: '1-thumb.jpg'},
  {img: '2.jpg', thumb: '2-thumb.jpg'}
]);
```

### `fotorama.push(frame1, ..., frameN)`
Appends the given frames to the fotorama:

```javascript
fotorama.push({img: '3.jpg', thumb: '3-thumb.jpg'});
```

### `fotorama.pop()`
Removes the last frame.

### `fotorama.shift()`
Removes the first frame.

### `fotorama.unshift(frame1, ..., frameN)`
Adds one or more frames to the beginning of the fotorama.

### `fotorama.splice(index , howMany[, frame1, ..., frameN])`
Changes the data array, adding new frames while removing old frames. It works just like the [Array.splice](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice):

```javascript
// Remove two frames after the first:
fotorama.splice(0, 2);

// Replace the last frame:
fotorama.splice(-1, 1, {img: 'new-last.jpg'});
```

### `fotorama.reverse()`
Reverses the fotorama in place.

### `fotorama.sort([compareFunction])`
Sorts the frames like the [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort):

```javascript
items.sort(function (frameA, frameB) {
  if (frameA.img > frameA.img) return 1;
  if (frameB.img < frameB.img) return -1;
  return 0;
});
```

### `fotorama.shuffle()`
Shuffles the frames.

### `fotorama.destroy()`
Kills the fotorama and restores the original content.

## Events
Attach callbacks to the Fotorama events. Every callback contains the event object and refference to the API as a function arguments:

```javascript
$('.fotorama').on('fotorama:ready', function (e, fotorama) {
  console.log(e.type, fotorama.activeIndex);
});
```

Some of the handlers contain third `extra` argument with additional data:

```javascript
$('.fotorama').on(
  'fotorama:show fotorama:showend',
  function (e, fotorama, extra) {
    console.log(e.type + (extra.user ? ' after user’s touch' : ''));
    console.log('transition duration: ' + extra.time);
  }
);
```

<p></p>

```javascript
$('.fotorama').on('fotorama:load', function (e, fotorama, extra) {
  console.log(extra.src + ' is loaded');
});
```

It is recommended to start listening to the events before initialization. Here is the snippet to explore all the Fotorama events in console:

    <script>
      $(function () {
        $('.fotorama')
            // Listen to the events
            .on('fotorama:ready ' +           // Fotorama is fully ready
                'fotorama:show ' +            // Start of transition to the new frame
                'fotorama:showend ' +         // End of the show transition
                'fotorama:load ' +            // Stage image of some frame is loaded
                'fotorama:error ' +           // Stage image of some frame is broken
                'fotorama:startautoplay ' +   // Slideshow is started
                'fotorama:stopautoplay ' +    // Slideshow is stopped
                'fotorama:fullscreenenter ' + // Fotorama is fullscreened
                'fotorama:fullscreenexit ' +  // Fotorama is unfullscreened
                'fotorama:loadvideo ' +       // Video iframe is loaded
                'fotorama:unloadvideo',       // Video iframe is removed
                function (e, fotorama, extra) {
                  console.log('## ' + e.type);
                  console.log('active frame', fotorama.activeFrame);
                  console.log('additional data', extra);
                }
            )
            // Initialize fotorama manually
            .fotorama();
      });
    </script>

    <div class="fotorama"
         data-auto="false">
    <!-- ↑ Important attribute. -->
      <img src="1.jpg">
      <img src="2.jpg">
    </div>
