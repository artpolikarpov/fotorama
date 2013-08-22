document.write(
    '<div style="position: relative; width: 50%;">' +
        '<div class="fotorama" id="fotorama" style="position: absolute; width: 50%; max-width: 199px; top: 12px; left: 17px;">' +
        '<img src="test/i/okonechnikov/1-lo.jpg">' +
        '<img src="test/i/okonechnikov/2-lo.jpg">' +
        '<img src="test/i/okonechnikov/9-lo.jpg">' +
        '<img src="test/i/okonechnikov/6-lo.jpg">' +
        '<img src="test/i/okonechnikov/5-lo.jpg">' +
        '</div>' +
    '</div>'
);

describe('Fullscreen', function () {
  var $window, $fotorama, fotorama, startPosition, startDimensions, fullscreenPosition;

  beforeEach(function () {
    $window = $window || $(window);
    $fotorama = $fotorama || $('#fotorama');
    fotorama = fotorama || $fotorama.data('fotorama');
    //jasmine.Clock.useMock();
  });

  describe('requestFullScreen', function () {

    it('correct position on start', function () {
      startPosition = $fotorama.position();
      startDimensions = {width: $fotorama.width(), height: $fotorama.height()};
      expect(startPosition.left).toEqual(Number($fotorama.css('left').replace(/px$/, '')));
      expect(startPosition.top).toEqual(Number($fotorama.css('top').replace(/px$/, '')));
    });

    it('no fullscreen if it is not allowed yet', function () {
      fotorama.requestFullScreen();
      //jasmine.Clock.tick(100);
      expect($fotorama.hasClass('fotorama--fullscreen')).toBeFalsy();
    });

    it('fullscreen is opened', function () {
      // allow fullscreen
      fotorama.setOptions({allowFullScreen: true});
//
//		    // try again
      fotorama.requestFullScreen();
      //jasmine.Clock.tick(100);
//
//		    // fullscreen is here
      expect($fotorama.hasClass('fotorama--fullscreen')).toBeTruthy();
    });
//
    it('size & position are correct', function () {
      fullscreenPosition = $fotorama.position();
      expect($fotorama.width()).toEqual($window.width());
      expect($fotorama.height()).toEqual($window.height());
      expect(fullscreenPosition.left).toEqual(0);
      expect(fullscreenPosition.top).toEqual(0);
    });
  });

  describe('cancelFullscreen', function () {
    it('fullscreen is cancelled', function () {
      fotorama.cancelFullScreen();
      //jasmine.Clock.tick(100);
      expect($fotorama.hasClass('fotorama--fullscreen')).toBeFalsy();
    });

    it('size & position are back and correct', function () {
      expect({width: $fotorama.width(), height: $fotorama.height()}).toEqual(startDimensions);
      expect($fotorama.position()).toEqual(startPosition);
    });
  });
});