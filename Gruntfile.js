module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    frontend: {
      // `frontend` is a multi-task
      main: {
        // task options
        options: {
          // Force file minification even if they were not modified
          force: false,

          // Path to project sources root folder.
          // It is used to resolve absolute paths in CSS imports,
          // for example: @import "/css/file.css" will be resolved
          // to 'src/files/css/file.css'
          srcWebroot: 'src/files',

          // Destination root folder.
          // Used to update minified files paths in catalog,
          // e.g. instead of storing '/Users/foo/project/out/css/minified.css' path,
          // task will cut-out path to webroot and store '/css/minified.css' instead
          webroot: 'out'
        },

        // CSS subtask: find all CSS files in `src` folder and
        // store minified version in `dest` folder
        css: {
          src: 'src/files/css',
          dest: 'out/c'
        },

        // JS subtask: works pretty much the same as default
        // `min` task:
        // https://github.com/gruntjs/grunt/blob/master/docs/task_min.md
        js: {
	        files: {
	          'out/j/script.js': [
		          'src/files/js/*.js'
	          ]

	//          'out/j/f2.js': [
	//            'src/js/fileC.js',
	//            'src/js/fileD.js'
	//          ]
	        }
        }
      }
    },
    autoprefixer: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: 'out/c/*',
            dest: 'out/c/'
          }
        ]
      }
    },
    csso: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: 'out/c/*',
            dest: 'out/c/'
          }
        ]
      }
    },
	  s3: {
			options: {
				key: '<%= grunt.file.readJSON("grunt-s3.json").key %>',
				secret: '<%= grunt.file.readJSON("grunt-s3.json").secret %>',
				bucket: 'fotorama',
				access: 'public-read',
				secure: false,
        gzip: true,
				headers: {'Cache-Control': 'max-age=2592000', 'Content-Encoding': 'gzip', 'Accept-Encoding': 'gzip'}
			},
			product: {
				upload: [
					// css
					{
						src: 'out/c/*',
						dest: 'c/'
					},

					// js
					{
						src: 'out/j/*',
						dest: 'j/'
					}
				]
			}
		}
  });


  grunt.loadNpmTasks('grunt-frontend');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-s3');

  grunt.registerTask('default', process.env.NODE_ENV ? ['frontend', 'autoprefixer', 'csso', 's3'] : ['frontend', 'autoprefixer']);
};