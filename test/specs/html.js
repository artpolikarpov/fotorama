document.write(
    '<div class="fotorama" id="fotorama" data-nav="thumbs">' +
        '<div>1</div>' +
        '<div data-img="test/i/okonechnikov/2-lo.jpg">2</div>' +
        '<div data-thumb="test/i/okonechnikov/9-thumb.jpg">9</div>' +
        '<div data-img="test/i/okonechnikov/6-lo.jpg" data-thumb="test/i/okonechnikov/6-thumb.jpg">6</div>' +
        '<div>LAST</div>' +
    '</div>'
);

describe('HTML', function () {
  var $fotorama, fotorama;

  beforeEach(function () {
    $fotorama = $fotorama || $('#fotorama');
    fotorama = fotorama || $fotorama.data('fotorama');
  });

  it('html is appended', function () {
    expect(fotorama.activeFrame.html).toBe($('.fotorama__html > *', fotorama.activeFrame.$stageFrame)[0]);
  });

  it('no images for the first frame `<div>1</div>`', function () {
    expect($('img', fotorama.activeFrame.$stageFrame).length).toBe(0);
    expect($('img', fotorama.activeFrame.$navThumbFrame).length).toBe(0);
  });

  it('stage & nav image with the same `src` for the second frame `<div data-img="2-lo.jpg">2</div>`', function (done) {
    fotorama.show({index: 1, time: 0});

    waitsFor(function () {
      return $('img', fotorama.activeFrame.$stageFrame).length;
    }, function () {
      expect($('img', fotorama.activeFrame.$stageFrame).length).toBe(1);
      expect($('img', fotorama.activeFrame.$navThumbFrame).length).toBe(1);
      expect($('img', fotorama.activeFrame.$stageFrame).attr('src')).toBe($('img', fotorama.activeFrame.$navThumbFrame).attr('src'));

      done();
    });
  });

  it('html is also appended', function () {
    expect(fotorama.activeFrame.html).toBe($('.fotorama__html > *', fotorama.activeFrame.$stageFrame)[0]);
  });

  it('only thumb for the third frame `<div data-thumb="9-thumb.jpg">9</div>`', function (done) {
    fotorama.show({index: 2, time: 0});

    waitsFor(function () {
      return $('img', fotorama.activeFrame.$navThumbFrame).length;
    }, function () {
      expect($('img', fotorama.activeFrame.$stageFrame).length).toBe(0);
      expect($('img', fotorama.activeFrame.$navThumbFrame).length).toBe(1);

      done();
    });
  });

  it('one more time: html appended too', function () {
    expect(fotorama.activeFrame.html).toBe($('.fotorama__html > *', fotorama.activeFrame.$stageFrame)[0]);
  });

  it('different stage & nav images for the fourth frame `<div data-img="6-lo.jpg" data-thumb="6-thumb.jpg">6</div>`', function (done) {
    fotorama.show({index: 3, time: 0});

    waitsFor(function () {
      return $('img', fotorama.activeFrame.$stageFrame).length;
    }, function () {
      expect($('img', fotorama.activeFrame.$stageFrame).length).toBe(1);
      expect($('img', fotorama.activeFrame.$navThumbFrame).length).toBe(1);
      expect($('img', fotorama.activeFrame.$stageFrame).attr('src')).not.toBe($('img', fotorama.activeFrame.$navThumbFrame).attr('src'));

      done();
    });
  });

  it('last test', function (done) {
    fotorama.show('>>');

    waitsFor(function () {
      return fotorama.activeFrame.$stageFrame.data('state') === 'error';
    }, function () {
      expect($('img', fotorama.activeFrame.$stageFrame).length).toBe(0);
      expect($('img', fotorama.activeFrame.$navThumbFrame).length).toBe(0);
      expect($('.fotorama__html', fotorama.activeFrame.$stageFrame).text()).toBe('LAST');

      done();
    });
  });
});