$(function () {
	function searchToArray(search) {
		var request = {};
		var pairs = search.substring(search.indexOf('?') + 1).split('&');

		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i].split('=');
			var key = decodeURIComponent(pair[0]),
					value = decodeURIComponent(pair[1]);
			if (key && value) {
				request[key] = value !== 'false' ? value !== 'true' ? value : true : false;
			}
		}
		return request;
	}

	var licensee = searchToArray(location.search).domain;

	if (licensee) {
		var _protocol = /^[a-z]+:\/\//,
				protocol = licensee.match(_protocol),
				host = licensee.replace(_protocol, '').replace(/\/.*/, ''),
        href = (protocol && protocol[0] || 'http://') + host;

		$('#licensee')
				.attr({href: href})
				.text(host);
	}
});