document.write(
    '<div class="fotorama" id="fotorama" data-shuffle="true">' +
        '<img src="test/i/okonechnikov/1.jpg">' +
        '<img src="test/i/okonechnikov/2.jpg">' +
        '<img src="test/i/okonechnikov/3.jpg">' +
        '<img src="test/i/okonechnikov/4.jpg">' +
        '<img src="test/i/okonechnikov/5.jpg">' +
    '</div>'
);

describe('Shuffle', function () {
  var $fotorama, fotorama, data;

  beforeEach(function () {
    $fotorama = $fotorama || $('#fotorama');
    fotorama = fotorama || $fotorama.data('fotorama');
    data = data || (fotorama.data && fotorama.data.slice(0));
  });

  it('frames are auto-shuffled', function () {
    var shuffled = false;

    $.each(data, function (i, frame) {
      shuffled = shuffled || !frame.img.match((i + 1) + '.jpg');
    });

    expect(shuffled).toBeTruthy();
  });

  it('frames are shuffled again after .shuffle()', function () {
    expect(data).toEqual(fotorama.data);

    fotorama.shuffle();

    expect(data).not.toEqual(fotorama.data);
  });

  it('frames are not corrupted by .shuffle()', function () {
    var oldData = {},
        newData = {};

    $.each(data, function (i, frame) {
      oldData[frame.i] = frame;
    });

    $.each(fotorama.data, function (i, frame) {
      newData[frame.i] = frame;
    });

    $.each(new Array(5), function (i) {
      expect(oldData[i]).toEqual(newData[i]);
    });
  });
});