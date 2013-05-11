exec = require('child_process').exec

docpadConfig = {
  # watchOptions: preferredMethods: ['watchFile', 'watch']
  templateData:
    site:
      author: "Artem Polikarpov"
      name: "Fotorama"
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
}

# Export the DocPad Configuration
module.exports = docpadConfig