// Underscore

// List of HTML entities for escaping.
var escapeEntityMap = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#x27;',
	'/': '&#x2F;'
}

// Regexes containing the keys and values listed immediately above.
var escapeRegex = new RegExp('[&<>"\'/]', 'g');

var _ = {
	escape: function (string) {
		if (string == null) return '';
		return ('' + string).replace(escapeRegex, function (match) {
			return escapeEntityMap[match];
		});
	}
}