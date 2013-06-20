var socialLikesButtons = {
	github: {
		counterUrl: 'https://api.github.com/repos/artpolikarpov/fotorama?callback=?',
		convertNumber: function(data) {
			return data.data.watchers_count;
		},
		clickUrl: 'https://github.com/artpolikarpov/fotorama/'
	}
};