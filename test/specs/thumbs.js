document.write(
    '<div class="fotorama" data-nav="thumbs" data-width="500" data-height="333" data-thumb-width="48" data-thumb-height="48" id="fotorama">' +
        '<a href="test/i/nyc/guy-in-car.jpg" width="500" height="335" data-caption="Guy in car"></a>' +
        '<a href="test/i/nyc/acapella.jpg" data-caption="Acapella"></a>' +
        '<img src="test/i/nyc/crazyjohn.jpg" data-caption="Crazy John" width="450" height="591px">' +
        '<a href="test/i/nyc/dudeintheground.jpg" data-caption="Dude in the ground"><img src="test/i/nyc/dudeintheground.jpg" width="55" height="34"></a>' +
        '<a href="test/i/nyc/dudes.jpg" data-caption="Dudes" data-width="550" data-height="341"><img src="test/i/nyc/eyes.jpg"></a>' +
        '<a href="test/i/nyc/explanation.jpg" data-caption="Explanation" data-thumb-width="50" data-thumb-height="36"></a>' +
        '<a href="test/i/nyc/facing-wind.jpg" data-caption="Facing wind" data-width="500" data-height="383"><img></a>' +
        '<a href="test/i/nyc/father-son-looking.jpg" data-caption="Father son looking" data-width="500" data-height="491"><img src="test/i/nyc/father-son-looking.jpg" width="50" height="49"></a>' +
        '<a href="test/i/nyc/flipoff.jpg" data-caption="Flip off"></a>' +
        '<a href="test/i/nyc/freakout.jpg" data-thumb="test/i/nyc/freakout.jpg" data-width="443" data-height="525"></a>' +
        '<a href="test/i/nyc/guy-in-park.jpg" data-thumb="test/i/nyc/homeless-sleeping.jpg" data-width="500" data-height="335"></a>' +
        '<a href="test/i/nyc/italianguy.jpg" data-caption="Italian guy"></a>' +
        '<a href="test/i/nyc/KIOSK.jpg" data-caption="Kiosk"></a>' +
        '<a href="test/i/nyc/ladies-riding.jpg" data-caption="Ladies riding"></a>' +
        '<a href="test/i/nyc/lift-dude.jpg" data-caption="Lift dude"></a>' +
        '<a href="test/i/nyc/severedhead-lo.jpg" data-thumb-width="550" data-thumb-height="455" data-caption="Severed head"></a>' +
        '<a href="test/i/nyc/smoking.jpg" data-thumb-width="500" data-thumb-height="394" data-caption="Smoking"></a>' +
        '<a href="test/i/nyc/streetlook.jpg" data-thumb-width="500" data-thumb-height="333" data-caption="Streetlook"></a>' +
        '<a href="test/i/nyc/two-umbrellas.jpg" data-caption="Two umbrellas"></a>' +
        '<a href="test/i/nyc/woman-reading.jpg" data-caption="Woman reading"></a>' +
    '</div>'
);

function random (min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}

function setStyle ($el, style) {
  var el = $el[0];
  if (el.styleSheet) {
    el.styleSheet.cssText = style;
  } else {
    $el.html(style);
  }
}

describe('Thumbs', function () {
  var $fotorama, fotorama, data, $thumb, $style, max;

  beforeEach(function () {
    $fotorama = $fotorama || $('#fotorama');
    fotorama = fotorama || $fotorama.data('fotorama');
    data = data || fotorama.data;
    $thumb = $thumb || $('.fotorama__nav__frame--thumb');
    $style = $style || $('<style></style>').insertAfter($fotorama);
    max = fotorama.size - 1;

  });

  it('thumbs height is correct', function () {
    expect($thumb.eq(random(max)).height()).toBe(48);
  });

  it('even with global `* { box-sizing: border-box; }`', function () {
    setStyle($style, '* { box-sizing: border-box; }');
    expect($thumb.eq(random(max)).height()).toBe(48);
  });

  it('thumbs dimenstions are read correctly', function () {
    expect(data[0].thumbRatio).toBe(500 / 335);

    expect(data[1].thumbRatio).toBeUndefined();

    expect(data[2].thumbRatio).toBe(450 / 591);

    expect(data[3].thumbRatio).toBe(55 / 34);

    expect(data[4].thumbRatio).toBeUndefined();

    expect(data[5].thumbRatio).toBe(50 / 36);

    expect(data[6].thumbRatio).toBe(500 / 383);

    expect(data[7].thumbRatio).toBe(50 / 49);

    expect(data[8].thumbRatio).toBeUndefined();

    expect(data[9].thumbRatio).toBe(443 / 525);

    expect(data[10].thumbRatio).toBeUndefined();
  });

  it('positions are good', function () {
    $thumb.each(function () {
      var $this = $(this);

      expect($this.position().left).toBe($this.data('l'));
    });
  });

  it('hidden thumbs are not loaded', function () {
    $thumb.each(function () {
      var $this = $(this);

      if ($this.position().left < $('.fotorama__wrap', $fotorama).width()) {
        waitsFor(function () {
          return $('.fotorama__img', $this)[0];
        }, 'Here must be an image...', 100);
      } else {
        expect($('.fotorama__img', $this)[0]).toBeFalsy();
      }
    });
  });


});