$(function () {
  function sendEvent (optional) {
    if (window.ga) {
      console.log('Analytics event', optional);
      ga('send', 'event', optional);
    }
  }

  $(document)
      // клик по внешним ссылкам
      .on('click', '.js-analytics-click', function (e) {
        if (!window.ga) {
          return;
        }

        if (!e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey && !e.wheel && e.button !== 1) {
          e.preventDefault();
        }

        var $this = $(this),
            data = $this.data(),
            href = $this.attr('href');

        sendEvent({
          eventCategory: 'Link',
          eventAction: data.action,
          eventLabel: $this.text() + ' (' + href + ')',
          hitCallback: function () {
            if (e.isDefaultPrevented()) {
              console.log('Analytics hit callback');
              location = href;
            }
          }
        });
      })
      // копирование примеров кода
      .on('copy', 'code', function (e) {
        sendEvent({
          eventCategory: 'Code',
          eventAction: 'copy',
          // что конкретно скопировали
          eventLabel: window.getSelection && window.getSelection().toString().slice(0, 499),
          hitCallback: function () {
            console.log('Analytics hit callback');
          }
        });
      });
});