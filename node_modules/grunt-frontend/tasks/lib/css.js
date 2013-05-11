var csso = require('csso');
var parser = require('./parser');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

function isToken(token, type) {
	return token instanceof Array && token[1] == type;
}

function findToken(list, type) {
	return _.find(list, function(item) {
		return isToken(item, type);
	});
}

/**
 * Finds all @imported files in CSS file and returns their paths and locations
 * inside CSS
 */
function findImports(css) {
	var tokens = parser.parse(css, 'stylesheet');
	var imports = [];
	tokens.forEach(function(token, i) {
		if (isToken(token, 'atrules')) {
			// is it @import rule?
			var kw = findToken(token, 'atkeyword');
			if (kw && kw[2][2].toLowerCase() == 'import') {
				var valueToken;
				var urlToken = findToken(token, 'uri');
				
				if (urlToken) {
					valueToken = findToken(urlToken, 'raw') || findToken(urlToken, 'string');
				} else {
					valueToken = findToken(urlToken, 'string');
				}
				
				if (!valueToken) {
					return;
				}

				var ruleStart = token[0].f;
				var ruleEnd = token[0].l;
				if (css.charAt(ruleEnd) == ';') {
					ruleEnd++;
				}

				imports.push({
					file: valueToken[2].replace(/^['"]|['"]$/g, ''),
					start: ruleStart,
					end: ruleEnd,
					value: css.substring(ruleStart, ruleEnd)
				});
			}
		}
	});

	return imports;
}

/**
 * Compiles singe CSS file: concats all @imported file into singe one
 * @param {String} file Absolute path to CSS file
 * @param {Function} pathResolver Function that will resolve paths to imported file
 * @returns {String} Content of compiled file
 */
function inlineCSSFile(file, pathResolver, keepImports, alreadyImported) {
	keepImports = keepImports || [];
	alreadyImported = alreadyImported || {};
	alreadyImported[file] = true;

	var originalFile = fs.readFileSync(file, 'utf8');
	var imports = findImports(originalFile);
	if (!imports.length) {
		return originalFile;
	}

	var replacements = [];
	var reExternal = /^\w+\:\/\//;
	imports.forEach(function(imp) {
		var fullPath = pathResolver(imp.file, file);
		var replaceValue = '';

		if (reExternal.test(imp.file)) {
			keepImports.push(imp);
		} else if (!(fullPath in alreadyImported)) {
			alreadyImported[fullPath] = true;
			try {
				replaceValue = inlineCSSFile(fullPath, pathResolver, keepImports, alreadyImported);
			} catch (e) {
				throw 'Unable to read "' + imp.file + '" import in ' + file;
			}
		}

		replacements.push({
			start: imp.start,
			end: imp.end,
			value: replaceValue
		});
	});

	// actually replace imports
	while (replacements.length) {
		var r = replacements.pop();
		originalFile = originalFile.substring(0, r.start) + r.value + originalFile.substring(r.end);
	}

	return originalFile;
}

/**
 * Compiles singe CSS file: concats all @imported file into singe one
 * @param {String} file Absolute path to CSS file
 * @param {Function} pathResolver Function that will resolve paths to imported file
 * @returns {String} Content of compiled file
 */
function compileCSSFile(file, pathResolver, alreadyImported) {
	var keepImports = [];
	var inlinedContent = inlineCSSFile(file, pathResolver, keepImports, alreadyImported);

	var header = _.map(keepImports, function(imp) {
		return imp.value;
	}).join(';\n') + '\n';

	return csso.justDoIt(header + inlinedContent, true);
}

exports.compileCSSFile = compileCSSFile;
exports.inlineCSSFile = inlineCSSFile;