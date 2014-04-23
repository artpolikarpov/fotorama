document.write(
    '<div class="fotorama" id="fotorama">' +
        '<img src="test/i/okonechnikov/1-lo.jpg">' +
        '<img src="test/i/okonechnikov/2-lo.jpg">' +
        '<img src="test/i/okonechnikov/9-lo.jpg">' +
        '<img src="test/i/okonechnikov/6-lo.jpg">' +
        '<img src="test/i/okonechnikov/5-lo.jpg">' +
    '</div>'
);

function waitsFor (test, fn) {
  if (test()) {
    fn();
  } else {
    setTimeout(function () {
      waitsFor(test, fn);
    }, 10);
  }
}

describe('jQuery 1.8.0', function () {
  var $fotorama, fotorama;

  beforeEach(function () {
    $fotorama = $fotorama || $('#fotorama');
    fotorama = fotorama || $fotorama.data('fotorama');
  });

  it('jQuery version is actually 1.6.4', function () {
    expect($fotorama.jquery).toBe('1.8.0');
  });
  it('$.fn.fotorama is here', function () {
    expect($.fn.fotorama).toBeDefined();
  });
  it('it’s initialized', function () {
    expect(fotorama).toBeDefined();
    expect(fotorama).toEqual(jasmine.any(Object));
  });
  it('all elements are here', function () {
    //expect($('.fotorama__load').size()).toEqual(1);
    expect($('.fotorama__wrap', $fotorama).size()).toEqual(1);
    expect($('.fotorama__stage', $fotorama).size()).toEqual(1);
    expect($('.fotorama__stage__shaft', $fotorama).size()).toEqual(1);
    expect($('.fotorama__nav', $fotorama).size()).toEqual(1);
    expect($('.fotorama__nav__shaft', $fotorama).size()).toEqual(1);
    expect($('.fotorama__arr', $fotorama).size()).toEqual(2);
    expect($('.fotorama__stage__frame', $fotorama).size()).toEqual(2);
    expect($('.fotorama__nav__frame', $fotorama).size()).toEqual(5);
  });
  it('dimensions are correct', function (done) {
    var $body = $('body'),
        $stage = $('.fotorama__stage', $fotorama);

    waitsFor(function () {
      return $stage.height() > 0
    }, function () {
      expect($stage.height()).toBeGreaterThan(0);
      expect($stage.width()).toEqual($body.width());
      expect($stage.height()).toEqual(Math.round($body.width()/(700/467)));

      done();
    });
  });
});