var $WINDOW = $(window),
		$DOCUMENT = $(document),
		$HTML,
		$BODY,

		COMPAT = document.compatMode === 'CSS1Compat',
		QUIRKS_FORCE = document.location.hash.replace('#', '') === 'quirks',
		CSS3 = Modernizr.csstransforms3d && !QUIRKS_FORCE,
		FULLSCREEN = fullScreenApi.ok,

		TOUCH_TIMEOUT = 300,
		TRANSITION_DURATION = 333,
		AUTOPLAY_INTERVAL = 5000,
		MARGIN = 2,
		THUMB_SIZE = 64,

		// Размеры на тот случай, если пользователь не укажет и брать не откуда
		WIDTH = 500,
		HEIGHT = 333,

		BEZIER = bez([.1, 0, .25, 1]);


console.log('Modernizr.csstransforms3d', Modernizr.csstransforms3d);
