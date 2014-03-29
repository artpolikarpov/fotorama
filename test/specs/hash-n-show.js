document.write(
    '<div class="fotorama" data-hash="true" id="fotorama">' +
        '<img src="test/i/okonechnikov/1-lo.jpg" id="first">' +
        '<img src="test/i/okonechnikov/2-lo.jpg">' +
        '<img src="test/i/okonechnikov/9-lo.jpg" id="9-lo">' +
        '<div>The fourth sequence</div>' +
        '<a href="http://www.youtube.com/watch?v=zyXF-BjY6pM" id="fifth">Fifth</a>' +
    '</div>'
);

describe('Hash', function () {
  var $fotorama, fotorama;

  beforeEach(function () {
    $fotorama = $fotorama || $('#fotorama');
    fotorama = fotorama || $fotorama.data('fotorama');
  });

  it('hash is empty', function () {
    expect(location.hash).toBe('');
  });

  it('hash is a number', function (done) {
    fotorama.show('>');

    waitsFor(function () {
      return location.hash === '#2';
    }, function () {
      expect(location.hash).toBe('#' + (fotorama.activeIndex + 1));
      done();
    });
  });

  it('hash is an id', function () {
    fotorama.show({index: '>', time: 0});

    expect(location.hash).toBe('#9-lo');
  });

  it('hash is a number for a html-frame', function () {
    fotorama.show({index: '>', time: 0});

    expect(location.hash).toBe('#4');
  });

  it('hash is an id for a html-frame', function () {
    fotorama.show({index: '>', time: 0});

    expect(location.hash).toBe('#fifth');
  });

  it('.show() works with indexes', function () {
    fotorama.show({index: 0, time: 0});
    expect(fotorama.activeIndex).toBe(0);
    fotorama.show({index: '1', time: 0});
    expect(fotorama.activeFrame.$stageFrame.css('left')).toBe('0px');
    expect(fotorama.activeIndex).toBe(1);
    fotorama.show({index: '2', time: 0});
    expect(fotorama.activeFrame.$stageFrame.css('left')).toBe('0px');
    expect(fotorama.activeIndex).toBe(2);
    fotorama.show({index: fotorama.size - 1, time: 0});
    expect(fotorama.activeIndex).toBe(fotorama.size - 1);
  });

  it('.show() works with ids', function () {
    fotorama.show({index: 'first', time: 0});
    expect(fotorama.activeIndex).toBe(0);
    fotorama.show({index: '9-lo', time: 0});
    expect(fotorama.activeIndex).toBe(2);
    fotorama.show({index: 'fifth', time: 0});
    expect(fotorama.activeIndex).toBe(fotorama.size - 1);
    fotorama.show({index: 'qwerty', time: 0});
    expect(fotorama.activeIndex).toBe(fotorama.size - 1);
  });
});