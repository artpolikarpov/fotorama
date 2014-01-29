$(function () {

  function setHash (hash) {
    location.replace(location.protocol
        + '//'
        + location.host
        + location.pathname.replace(/^\/?/, '/')
        + location.search
        + '#' + hash);
  }

  $('.js-tags').each(function () {
    var $this = $(this),
        $items = $($this.data('selector')),
        tags = {};

    function showTag (tag) {
      if (tag && !tags[tag]) return;

      $this.toggleClass('tags-all', !tag);
      $items.toggle(!tag);

      if (tag) {
        $.each(tags, function (key, content) {
          if (tag === key) {
            $.each(content.items, function (i, $item) {
              $item.show();
            });
          }
        });
      }

      setHash(tag);
    }

    $items.each(function () {
      var $item = $(this);

      $.each($item.data('tags').split(','), function (i, tag) {
        tags[tag] = tags[tag] || {
          items: []
        };

        tags[tag].items.push($item);
      });
    });

    var sortedTags = $.map(tags, function (content, tag) {
      return {title: tag, items: content.items};
    });

    sortedTags.sort(function (a, b) {
      return a.items.length < b.items.length;
    });

    sortedTags.push({
      title: ''
    });

    $.each(sortedTags, function (i, tag) {
      var $li = $('<li></li>'),
          $a = $('<a></a>')
              .attr({'href': '#' + tag.title, name: tag.title})
              .text(tag.title),
          $small = $('<small></small>')
              .text(tag.items ? ' ' + tag.items.length : '');

      $a.on('click', function (e) {
        e.preventDefault();

        showTag(tag.title);
      });

      $this.append($li.append($a).append($small));
    });


    showTag(location.hash.replace(/^#/, ''));

  });

});