$(function () {
  function count ($el, url, getNumberFromData) {
    $el[0] &&
      $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function (json) {
          var _count = +$el.text() || 0;
          $el.text(_count + getNumberFromData(json));
        }
      });
  }

  function countTweets (url) {
    count($('#twitter-counter'), 'http://urls.api.twitter.com/1/urls/count.json?url=' + url, function (json) { return json.count });
  }

  countTweets('fotoramajs.com');
  countTweets('fotorama.io');

  count($('#github-counter'), 'https://api.github.com/repos/artpolikarpov/fotorama', function (json) { return json.data.watchers_count });
});