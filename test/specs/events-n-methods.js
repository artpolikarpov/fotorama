document.write(
    '<div class="fotorama" data-width="700" data-height="467" data-max-width="false" data-auto="false" id="fotorama">' +
        '<img src="test/i/okonechnikov/1-lo.jpg">' +
        '<img src="test/i/okonechnikov/2-lo.jpg">' +
        '<img src="test/i/okonechnikov/9-lo.jpg">' +
        '<img src="ERROR">' +
        '<img src="test/i/okonechnikov/5-lo.jpg">' +
    '</div>'
);

describe('Events', function () {
  var $fotorama, fotorama, binded, e = {};

  beforeEach(function () {
    $fotorama = $fotorama || $('#fotorama');
    fotorama = fotorama || $fotorama.data('fotorama');

    if (!binded) {
      $fotorama.on(
          'fotorama:ready ' + //
          'fotorama:load ' + //
          'fotorama:error ' + //
          'fotorama:show ' + //
          'fotorama:showend ' + //
          'fotorama:fullscreenenter ' + //
          'fotorama:fullscreenexit ' + //
          'fotorama:loadvideo ' + //
          'fotorama:unloadvideo ' + //
          'fotorama:startautoplay ' + //
          'fotorama:stopautoplay', //
          function (event, fotorama, extra) {
            var type = event.type.replace(/^fotorama:/, '');
            e[type] = e[type] || {i: 0, fotorama: fotorama};
            e[type].i++;
            e[type].extra = extra;
          }
      );

      binded = true;
    }
  });

  it('initializing...', function () {
    expect($fotorama.fotorama()).toBeDefined();
  });

  it('initialized', function () {
    expect(fotorama).toBeDefined();
    expect(fotorama.size).toBe(5);
    expect(fotorama.destroy).toEqual(jasmine.any(Function));
  });

  it('fotorama:ready, fotorama:show, and fotorama:showend already called', function () {
    expect(e.ready.i).toBe(1);
    expect(e.ready.fotorama).toEqual(fotorama);
    expect(e.show.i).toBe(1);
    expect(e.showend.i).toBe(1);
  });

  it('fotorama:load & .show(\'>\')', function (done) {
    waitsFor(function () {
      return e.load && e.load.i === 2;
    }, function () {
      fotorama.show('>');
      expect(e.show.i).toBe(2);
      expect(fotorama.activeIndex).toBe(1);
      // auto event, no touch
      expect(e.show.extra.user).toBeUndefined();
      expect(e.show.extra.time).toBe(fotorama.options.transitionduration);

      waitsFor(function () {
        return e.load.i === 3;
      }, function () {
        expect(e.load.extra.index).toBe(2);
        expect(e.showend.i).toBe(2);

        done();
      });
    });
  });

  it('<, <<, >>, fotorama:error', function (done) {
    fotorama.show('<'); // e.show.i = 3
    expect(fotorama.activeIndex).toBe(0);
    fotorama.show('>'); // e.show.i = 4
    expect(fotorama.activeIndex).toBe(1);
    fotorama.show('<<'); // e.show.i = 5
    expect(fotorama.activeIndex).toBe(0);

    fotorama.show('>>'); // e.show.i = 6; e.showend.i = 3
    expect(fotorama.activeIndex).toBe(4);

    waitsFor(function () {
      return e.error && e.error.i === 1;
    }, function () {
      expect(e.show.i).toBe(6);
      expect(e.showend.i).toBe(3);

      // extra data on fotorama:error
      expect(e.error.extra.index).toBe(3);
      expect(e.error.extra.src).toBe('ERROR');
      expect(e.error.extra.frame.img).toBe('ERROR');

      // error frame was removed
      expect(fotorama.size).toBe(4);
      expect(fotorama.activeIndex).toBe(3);

      done();
    });
  });

  it('.startAutoplay(interval)', function (done) {
    expect(e.startautoplay).toBeUndefined();
    fotorama.startAutoplay(500);
    expect(e.startautoplay.i).toBe(1);

    // other api calls don’s disturb autoplay
    fotorama.setOptions({navPosition: 'top'});

    waitsFor(function () {
      return fotorama.activeIndex === 1;
    }, function () {
      expect(e.show.i).toBe(8);
      done();
    });



    //runs(function () {

    //});
  });

  it('.stopAutoplay()', function (done) {
    expect(e.stopautoplay).toBeUndefined();
    fotorama.stopAutoplay();
    expect(e.startautoplay.i).toBe(1);
    expect(e.stopautoplay.i).toBe(1);
    expect(fotorama.activeIndex).toBe(1);

    var checked, index = fotorama.activeIndex;

    setTimeout(function () {
      checked = true;
    }, 600);

    waitsFor(function () {
      return checked;
    }, function () {
      // it is really stopped
      expect(fotorama.activeIndex).toBe(index);

      done();
    });
  });

  it('fullscreen events', function (done) {
    fotorama.requestFullScreen();
    expect(e.fullscreenenter).toBeUndefined();

    fotorama.setOptions({allowFullScreen: true});

    fotorama.requestFullScreen();
    expect(e.fullscreenenter.i).toBe(1);
    expect(e.fullscreenexit).toBeUndefined();

    waitsFor(function () {
      return fotorama.fullScreen;
    }, function () {
      fotorama.cancelFullScreen();
      expect(e.fullscreenenter.i).toBe(1);
      expect(e.fullscreenexit.i).toBe(1);
      expect(fotorama.fullScreen).toBe(false);

      done();
    });



    //runs(function () {

    //});

  });

  it('pushing new frames, video for example', function () {
    fotorama.push({video: 'http://youtu.be/d27gTrPPAyk'});
    expect(fotorama.size).toBe(5);
  });

  it('play video remotely', function () {
    fotorama.show({index: 4, time: 0});
    expect(e.loadvideo).toBeUndefined();
    expect(e.unloadvideo).toBeUndefined(1);

    fotorama.playVideo();
    expect(e.loadvideo.i).toBe(1);

    fotorama.stopVideo();
    expect(e.loadvideo.i).toBe(1);
    expect(e.unloadvideo.i).toBe(1);
  });

  it('understands .pop(), .shift(), .unshift(), .splice(), .reverse()', function () {
    fotorama.pop();
    expect(fotorama.size).toBe(4);

    fotorama.shift();
    expect(fotorama.size).toBe(3);
    expect(fotorama.activeIndex).toBe(2);

    var lastFrame = fotorama.data[fotorama.size - 1],
        newFrame = {img: 'test/i/okonechnikov/1-lo.jpg'};

    fotorama.unshift(newFrame);
    expect(fotorama.size).toBe(4);

    fotorama.splice(2, 1, newFrame, newFrame, newFrame);
    expect(fotorama.size).toBe(6);

    expect(fotorama.data[0]).toEqual(newFrame);

    fotorama.reverse();

    expect(fotorama.data[0]).toEqual(lastFrame);
    expect(fotorama.data[1]).toEqual(fotorama.data[fotorama.size - 1]);
  });

  it('options are exported', function () {
    expect(fotorama.options).toEqual(jasmine.any(Object));
    expect(fotorama.options.auto).toBe(false);
    expect(fotorama.options.width).toBe(700);
    expect(fotorama.options.allowfullscreen).toBe(true);

    expect(fotorama.options.keyboard).toBe(false);
    fotorama.setOptions({keyboard: true});
    expect(fotorama.options.keyboard).toBe(true);
  });

  it('resizable', function () {
    fotorama.resize({maxwidth: null});

    var $stage = $('.fotorama__stage', $fotorama);

    expect($stage.width()).toEqual(700);
    expect($stage.height()).toEqual(467);

    fotorama.resize({width: 300, ratio: 700 / 467, height: 'auto', minWidth: '400px'});
    fotorama.setOptions({fooo: 'baar'}).reverse().reverse();

    expect($stage.width()).toEqual(400);
    expect($stage.height()).toEqual(Math.round(400 / (700 / 467)));
  });

  it('methods are chained', function () {
    expect(fotorama.show()).toEqual(fotorama);
    expect(fotorama.setOptions()).toEqual(fotorama.resize());
    expect(fotorama.startAutoplay()).toEqual(fotorama.stopAutoplay());
    expect(fotorama.requestFullScreen()).toEqual(fotorama.cancelFullScreen());
    expect(fotorama.playVideo()).toEqual(fotorama.stopVideo());
    expect(fotorama.load()).toEqual(fotorama.push({img: 'test/i/okonechnikov/19-lo.jpg'}));
    //expect(fotorama.pop()).toEqual(fotorama.shift());
    expect(fotorama.unshift({img: 'test/i/okonechnikov/11-lo.jpg'})).toEqual(fotorama.reverse());
    expect(fotorama.sort()).toEqual(fotorama.splice());
  });

  it('can be destroyed', function () {
    expect($('.fotorama__wrap').size()).toBe(1);

    fotorama.destroy();
    expect($('.fotorama__wrap').size()).toBe(0);
  });

  it('after that: some methods throw, some don’t', function () {
    expect(fotorama.show).toThrow();
    expect(fotorama.resize).not.toThrow();
  });

  it('and restored from scratch', function () {
    $fotorama.fotorama();
    expect($('.fotorama__wrap').size()).toBe(1);
    expect(fotorama.size).toBe(fotorama.activeIndex < 2 ? 5 : 4);
  });
});