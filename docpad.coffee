exec = require('child_process').exec
hljs = require './plugins/highlight.js'

docpadConfig = {
	watchOptions: preferredMethods: ['watchFile', 'watch']
	templateData:
		site:
			author: 'Artem Polikarpov'
			name: 'Fotorama'
	plugins:
		marked:
			markedOptions:
				sanitize: false
				highlight: (text, lang) ->
					result = if lang then hljs.highlight(lang, text) else hljs.highlightAuto(text)
#					mark = (match) ->
#						return '<mark>' + match.toLowerCase() + '</mark>'
#					result.value = result.value.replace(/[A-Z\-]{3,}/g, mark)
					"<span class='#{result.language}'>#{result.value}</span>"
	environments:
		debug:
			# Enable debug mode for frontend-assets plugin:
			# generates files with '-debug' suffix with
			# assets sources
			frontendDebug: true
	events:
		# Regenerate assets each time resources are changed
		generateBefore: (opts, next) ->
			# do not re-buid assets in debug mode, save resources
			if @docpad.getConfig().frontendDebug
				return next()

			proc = exec 'grunt', {cwd: process.cwd()}, (error, stdout, stderr) ->
				console.log stdout
				process.exit() if error

			proc.on 'exit', next

		serverAfter: ({server}) ->
			server.get /^\/\d+\/(c|j)\//, (req, res, next) ->
				req.url = req.url.replace /^\/\d+\//, '/'
				next()
	maxAge: false
}

# Export the DocPad Configuration
module.exports = docpadConfig