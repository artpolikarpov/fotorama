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
#          mark = (match) ->
#            return '<mark>' + match.toLowerCase() + '</mark>'
#          result.value = result.value.replace(/[A-Z\-]{3,}/g, mark)
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
      server.get /^\/use\//, (req, res, next) ->
        req.url = req.url.replace /^\/use\//, '/customize/'
        next()
      server.get /^\/\d+\/(c|j)\//, (req, res, next) ->
        req.url = req.url.replace /^\/\d+\//, '/'
        next()

    # Supply headers with named anchors
    renderDocument: (opts) ->
      {extension,file} = opts

      if file.type is 'document' and extension is 'html'
        opts.content = opts.content.replace /<(h\d)>(.+?)<\/\1>/g, (str, name, header) ->
          if /<a\s+[^>]*name="/.test(header)
            return str

          # strip tags
          # console.log header
          anchor = header
            .replace(/^|<\/?\w+(?:\s.+?)*>.*/g, '')
            .replace(/<\w+(?:\s.+?)*>/g, '')
            .trim()
            .replace(/[\s]+/g, '-')
            # .replace(/[^\w\-]/g, '')
            # .toLowerCase()

          anchor = anchor.charAt(0).toLowerCase() + anchor.slice(1);

          "<#{name}><a name=\"#{anchor}\" href=\"\##{anchor}\" class=\"icon-link\"></a>#{header}</#{name}>"
  maxAge: 3600
}

# Export the DocPad Configuration
module.exports = docpadConfig