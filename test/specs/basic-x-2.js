document.write(
    '<div class="fotorama" data-max-width="false" data-startindex="2" data-nav="thumbs" id="fotorama1">' +
        '<img src="test/i/okonechnikov/1-lo.jpg">' +
        '<img src="test/i/okonechnikov/2-lo.jpg">' +
        '<img src="test/i/okonechnikov/9-lo.jpg">' +
        '<img src="test/i/okonechnikov/6-lo.jpg">' +
        '<img src="test/i/okonechnikov/5-lo.jpg">' +
    '</div>'
);

document.write(
    '<div class="fotorama" data-width="500" data-startindex="3" data-max-width="false" data-ratio="3.14/5.6" data-nav="dots" id="fotorama2">' +
        '<img src="test/i/okonechnikov/3-lo.jpg">' +
        '<img src="test/i/okonechnikov/4-lo.jpg">' +
        '<img src="test/i/okonechnikov/7-lo.jpg">' +
        '<img src="test/i/okonechnikov/8-lo.jpg">' +
    '</div>'
);

var fotorama1, fotorama2;

function eachFotorama (callback) {
  $.each([fotorama1, fotorama2], callback);
}

function random (min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}

describe('Two fotoramas', function () {

  beforeEach(function () {
    fotorama1 = fotorama1 || $('#fotorama1').data('fotorama');
    fotorama2 = fotorama2 || $('#fotorama2').data('fotorama');
  });

  it('are initialized', function () {
    eachFotorama(function (i, fotorama) {
      expect(fotorama).toBeDefined();
      expect(fotorama).toEqual(jasmine.any(Object));
    });
  });
  it('all elements are here', function () {
    eachFotorama(function (i, fotorama) {
      var $fotorama = $('#fotorama' + (i + 1));

      expect($('.fotorama__wrap', $fotorama).size()).toEqual(1);
      expect($('.fotorama__stage', $fotorama).size()).toEqual(1);
      expect($('.fotorama__stage__shaft', $fotorama).size()).toEqual(1);
      expect($('.fotorama__nav', $fotorama).size()).toEqual(1);
      expect($('.fotorama__nav__shaft', $fotorama).size()).toEqual(1);
      expect($('.fotorama__arr', $fotorama).size()).toEqual(2);
      expect($('.fotorama__stage__frame', $fotorama).size()).toEqual(i ? 2 : 3);
      expect($('.fotorama__nav__frame', $fotorama).size()).toEqual(5 - i);
    });
  });
  it('dimensions are correct', function (done) {
    eachFotorama(function (i, fotorama) {
      var $fotorama = $('#fotorama' + (i + 1)),
          $stage = $('.fotorama__stage', $fotorama);

      if (!i) {
        waitsFor(function () {
          return $stage.width() === 700
        }, function () {
          expect($stage.height()).toEqual(467);
          done();
        });
      } else {
        expect($stage.width()).toEqual(500);
        expect($stage.height()).toEqual(Math.round(500/(3.14/5.6)));
      }
    });
  });

  it('`data-startindex` works', function () {
    eachFotorama(function (i, fotorama) {
      expect(fotorama.activeIndex).toBe(i ? 3 : 2);
    });
  });

  it('thumbs and dots are ok', function () {
    eachFotorama(function (i, fotorama) {
      var $fotorama = $('#fotorama' + (i + 1)),
          $navFrames = $('.fotorama__nav__frame', $fotorama),
          index = random(1, fotorama.size - 1);

      fotorama.show({index: index, time: 0});

      expect($navFrames.index($navFrames.filter('.fotorama__active'))).toBe(index);
    });
  });


});