document.write(
    '<div class="fotorama" id="fotorama"' +
        'data-data=\'[{"img": "test/i/okonechnikov/1-lo.jpg"}, {"img": "test/i/okonechnikov/2-lo.jpg"}, {"img": "test/i/okonechnikov/3-lo.jpg"}]\'>' +
    '</div>'
);

describe('Initialization with data', function () {
  var $fotorama, fotorama;

  beforeEach(function () {
    $fotorama = $fotorama || $('#fotorama');
    fotorama = fotorama || $fotorama.data('fotorama');
  });

  it('initialized with array in `data-data` attribute', function () {
    expect(fotorama).toBeDefined();
    expect(fotorama).toEqual(jasmine.any(Object));
    expect(fotorama.data.length).toEqual(3);
  });

  it('can be initialized dinamically', function (done) {
    var api;
    $('<div class="gallery"></div>')
        .on('fotorama:ready', function (e, fotorama) {
          api = fotorama;
        })
        .appendTo('body')
        .fotorama({
          data: [
            {img: 'test/i/okonechnikov/4-lo.jpg'},
            {img: 'test/i/okonechnikov/5-lo.jpg'}
          ],
          maxwidth: null
        });

    waitsFor(function () {
      return api;
    }, function () {
      expect(api.data[0].img).toBe('test/i/okonechnikov/4-lo.jpg');
      expect($('.gallery .fotorama__wrap').width()).toBe(700);

      done();
    });
  });

  it('two fotoramas can be initialized with the same data, and nothing is broken', function () {
    var photos = [
          {img: 'test/i/okonechnikov/6-lo.jpg'},
          {img: 'test/i/okonechnikov/7-lo.jpg'},
          {img: 'test/i/okonechnikov/8-lo.jpg'},
          {img: 'test/i/okonechnikov/9-lo.jpg'}
        ],
        $galleries = $('<div class="fotorama"></div><div class="fotorama"></div>').appendTo('body');

    expect($galleries.size()).toBe(2);

    $galleries.fotorama({data: photos, width: 400, height: 300});

    var fotorama1 = $galleries.eq(0).data('fotorama'),
        fotorama2 = $galleries.eq(1).data('fotorama');

    expect(photos).not.toEqual(fotorama1.data);
    expect(photos).not.toEqual(fotorama2.data);

    fotorama1.show({index: '>>', time: 0});

    expect(fotorama1.data).not.toEqual(fotorama2.data);
  });

  it('fotorama.load(data) is ok too', function (done) {
    var data = [
          {img: 'test/i/okonechnikov/6-lo.jpg'},
          {img: 'test/i/okonechnikov/7-lo.jpg'},
          {img: 'test/i/okonechnikov/8-lo.jpg'},
          {img: 'test/i/okonechnikov/9-lo.jpg'}
        ],
        $rama = $('<div class="fotorama"></div>').appendTo('body').fotorama(),
        rama = $rama.data('fotorama');

    $rama.on('fotorama:show', function (e, fotorama) {
      expect(fotorama).toBe(rama);
      done();
    });

    rama.load(data);

  });
});