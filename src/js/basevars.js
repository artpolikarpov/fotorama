var $WINDOW = $(window),
    $DOCUMENT = $(document),
    $HTML,
    $BODY,

    TOUCH = Modernizr.touch,
    QUIRKS_FORCE = document.location.hash.replace('#', '') === 'quirks',
    CSS3 = Modernizr.csstransforms3d && Modernizr.csstransitions && !QUIRKS_FORCE,
    FULLSCREEN = fullScreenApi.ok,

    TOUCH_TIMEOUT = 300,
    TRANSITION_DURATION = 333,
    SPINNER_COLOR = '#777',
    AUTOPLAY_INTERVAL = 5000,
    MARGIN = 10,
    THUMB_SIZE = 64,

    // Размеры на тот случай, если пользователь не укажет и брать не откуда
    WIDTH = 500,
    HEIGHT = 333,

    BEZIER = bez([.1, 0, .25, 1]);
