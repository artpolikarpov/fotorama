$(function () {
  function sendEvent (optional) {
    window.ga && ga('send', 'event', optional);
  }

  $(document)
      .on('click', '.js-analytics-click', function (e) {
        if (!window.ga) {
          return;
        }

        if (!e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey && !e.wheel && e.button !== 1) {
          e.preventDefault();
        }

        var $this = $(this),
            data = $this.data(),
            href = $this.attr('href'),
            value = $this.text() + ' (' + href + ')';

        sendEvent({
          eventCategory: 'link',
          eventAction: 'click',
          eventLabel: data.label,
          eventValue: value,
          hitCallback: function () {
            if (e.isDefaultPrevented()) {
              location = href;
            }
          }
        });
      })
      .on('copy', 'code', function (e) {
        sendEvent({
          eventCategory: 'code',
          eventAction: 'copy',
          eventLabel: location.pathname,
          eventValue: window.getSelection && window.getSelection().toString()
        });
      });
});