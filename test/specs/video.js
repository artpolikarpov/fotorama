document.write(
    '<div class="fotorama" id="fotorama" data-nav="thumbs">' +
        '<a href="http://youtu.be/d27gTrPPAyk"></a>' +
        '<a href="http://www.youtube.com/embed/KLVq0IAzh1A"></a>' +
        '<a href="http://player.vimeo.com/video/61527416"></a>' +
        '<a href="http://vimeo.com/67556702"></a>' +
        '<a href="http://youtube.com/watch?v=C3lWwBslWqg"></a>' +
    '</div>'
);

describe('Video', function () {
  var $fotorama, fotorama, data, $thumb;

  beforeEach(function () {
    $fotorama = $fotorama || $('#fotorama');
    fotorama = fotorama || $fotorama.data('fotorama');
    data = data || fotorama.data;
    $thumb = $thumb || $('.fotorama__nav__frame--thumb');
  });


  it('previews are fetched (works only if script able to connect to the Internet)', function (done) {
    $thumb.each(function () {
      var $this = $(this);
      waitsFor(function () {
        return $('.fotorama__img', $this)[0];
      }, done);
    });
  });


  // more coming...
});