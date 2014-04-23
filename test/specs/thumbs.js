document.write(
    '<div class="fotorama" data-nav="thumbs" data-width="500" data-height="333" data-thumb-width="48" data-thumbheight="48" id="fotorama">' +
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
        '<a href="test/i/nyc/italianguy.jpg" data-caption="Italian guy" data-thumbratio="34/75"></a>' +
        '<div data-img="test/i/nyc/KIOSK.jpg" data-width="443" data-height="525">Kiosk</div>' +
        '<div data-thumb="test/i/nyc/ladies-riding.jpg" data-width="443" data-height="525">Ladies riding</div>' +
        '<div data-thumb="test/i/nyc/lift-dude.jpg" data-thumbwidth="70" data-thumbheight="47">Hmm...</div>' +
        '<div data-img="test/i/nyc/severedhead-lo.jpg" data-thumbratio="1.5">Severed head</div>' +
        '<div data-img="test/i/nyc/smoking.jpg" data-thumbratio="500/394">Smoking</div>' +
        '<a href="test/i/nyc/streetlook.jpg" data-thumb-width="500" data-thumbheight="333" data-caption="Streetlook"></a>' +
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
    expect(data[0].thumbratio).toBe(500 / 335);
    expect(data[1].thumbratio).toBeUndefined();
    expect(data[2].thumbratio).toBe(450 / 591);
    expect(data[3].thumbratio).toBe(55 / 34);
    expect(data[4].thumbratio).toBeUndefined();
    expect(data[5].thumbratio).toBe(50 / 36);
    expect(data[6].thumbratio).toBe(500 / 383);
    expect(data[7].thumbratio).toBe(50 / 49);
    expect(data[8].thumbratio).toBeUndefined();
    expect(data[9].thumbratio).toBe(443 / 525);
    expect(data[10].thumbratio).toBeUndefined();
    expect(data[11].thumbratio).toBe(34/75);
    expect(data[12].thumbratio).toBe(443/525); //
    expect(data[13].thumbratio).toBe(undefined);
    expect(data[14].thumbratio).toBe(70/47);
    expect(data[15].thumbratio).toBe(1.5);
    expect(data[16].thumbratio).toBe(500/394);
  });

  it('positions are good', function () {
    $thumb.each(function () {
      var $this = $(this);

      expect(Math.round($this.position().left)).toBe($this.data('l'));
    });
  });

  it('hidden thumbs are not loaded', function (done) {
    $thumb.each(function () {
      var $this = $(this);

      if ($this.position().left < $('.fotorama__wrap', $fotorama).width()) {
        waitsFor(function () {
          return $('.fotorama__img', $this)[0];
        }, done);
      } else {
        expect($('.fotorama__img', $this)[0]).toBeFalsy();
      }
    });
  });


});