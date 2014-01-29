---
title: "Initialization"
layout: "page"
menuOrder: 100
class: 'divider'
---


Fotorama initialized automatically in all the blocks with the `fotorama` class.

Change this with `data-auto="false"`:

    <div class="fotorama"
         data-auto="false">
      <img src="1.jpg">
      <img src="2.jpg">
    </div>

...and turn it on manually:

    $(function () {
      $('.fotorama').fotorama();
    });

## Data
Load data into fotorama directly via Javascript:

    <div class="fotorama"
         data-auto="false"></div>

    <script>
      $('.fotorama').fotorama({
        data: [
          {img: '1.jpg', thumb: '1-thumb.jpg'},
          {img: '2.jpg', thumb: '2-thumb.jpg'}
        ]
      });
    </script>

## Frame object
The complete frame object may look like so:

```javascript
{
  img: '1.jpg',
  thumb: '1-thumb.jpg',
  full: '1-full.jpg', // Separate image for the fullscreen mode.
  id: 'one', // Custom anchor is used with the hash:true option.
  caption: 'The first caption',
  html: $('selector'), // ...or '<div>123</div>'. Custom HTML inside the frame.
  fit: 'cover', // Override the global fit option.
  any: 'Any data relative to the frame you want to store'
}
```