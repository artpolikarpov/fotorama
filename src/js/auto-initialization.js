$(function () {
  $('.' + _fotoramaClass + ':not([data-auto="false"])').fotorama();

  // Track
  if (getProtocol().p === 'https://' || window.blockFotoramaData) return;
  $('body').append('<iframe src="http://data.fotorama.io/?version=' + fotoramaVersion + '" style="display: none;"></iframe>');
});