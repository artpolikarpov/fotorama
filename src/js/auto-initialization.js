$(function () {
  $('.' + _fotoramaClass + ':not([data-auto="false"])').fotorama();

  // Get usage statistics
  if (getProtocol().p !== 'http://' || window.blockFotoramaData) return;
  $('body').append('<iframe src="http://data.fotorama.io/?version=' + fotoramaVersion + '" style="display: none;"></iframe>');
});