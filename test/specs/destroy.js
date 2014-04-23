document.write(
    '<div id="html">' +
      '<div class="fotorama" data-width="700" data-height="467" data-auto="false" id="fotorama">' +
        '<img src="test/i/okonechnikov/1-lo.jpg">' +
        '<img src="test/i/okonechnikov/2-lo.jpg">' +
        '<img src="test/i/okonechnikov/3-lo.jpg">' +
        '<img src="test/i/okonechnikov/4-lo.jpg">' +
        '<img src="test/i/okonechnikov/5-lo.jpg">' +
      '</div>' +
    '</div>'
);

describe('Destroy', function () {
  var loaded, $fotorama, fotorama, data, $html, html, htmlWithFotorama;

  it('$(el).fotorama() changes the DOM', function (done) {
    $html = $('#html');
    html = $html.html();

    $fotorama = $('#fotorama').on('fotorama:load', function (e, fotorama, extra) {
      if (!extra.index) loaded = true;
    }).fotorama();
    fotorama = $fotorama.data('fotorama');
    data = fotorama.data;

    waitsFor(function () {
      return loaded;
    }, function () {
      htmlWithFotorama = $html.html();
      expect(html).not.toBe(htmlWithFotorama);

      done();
    });
  });

  it('fotorama.destroy() leaves nothing extra', function () {
    fotorama.destroy();

    expect(html).toBe($html.html());
  });

  it('even if fullscreen', function (done) {
    $fotorama.fotorama({allowFullScreen: true});

    loaded = false;
    waitsFor(function () {
      return loaded;
    }, function () {
      htmlWithFotorama = $html.html();

      fotorama.requestFullScreen();

      expect(fotorama.fullScreen).toBe(true);

      fotorama.destroy();

      expect(fotorama.fullScreen).toBe(false);
      expect(html).toBe($html.html());

      done();
    });
  });

  it('fotorama.load([{}, {}, {}]) can revive the fotorama', function (done) {
    var photos = [];

    for (var _i = 1; _i <= 5; _i++) {
      photos.push({img: 'test/i/okonechnikov/' + _i + '-lo.jpg'});
    }

    loaded = false;
    fotorama.load(photos);
    waitsFor(function () {
      return loaded;
    }, function () {
      expect(htmlWithFotorama).toBe($html.html());

      done();
    });

  });

  it('It seems that all is well', function (done) {
    // test some functions after all

    fotorama.setOptions({nav: 'thumbs', thumbWidth: '39px'});
    expect($('.fotorama__nav__frame--thumb').width()).toBe(39);

    fotorama.show({index: 1, time: 0});

    waitsFor(function () {
      return $('.fotorama__stage__frame.fotorama__active .fotorama__img').size();
    }, function () {
      expect(fotorama.activeIndex).toBe(1);
      expect($('.fotorama__stage__frame.fotorama__active .fotorama__img').attr('src')).toBe('test/i/okonechnikov/2-lo.jpg');

      done();
    });
  });
});