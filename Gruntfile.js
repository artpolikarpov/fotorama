module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*!\n * <%= pkg.name %> <%= pkg.version %> | http://fotorama.io/license/\n */\n',
      sass: ['src/scss/*'],
      js: [
        'src/js/intro.js',
        'src/js/_.js',
        'src/js/modernizr.js',
        'src/js/fullscreen.js',
        'src/js/bez.js',
        'src/js/css-classes.js',
        'src/js/basevars.js',
        'src/js/utils.js',
        'src/js/animate.js',
        'src/js/touch.js',
        'src/js/moveontouch.js',
		    'src/js/oooo.js',
        'src/js/fotorama.js',
        'src/templates/compiled.js',
        'src/js/outro.js'
      ]
    },
    jst: {
      compile: {
        options: {
          namespace: '$.Fotorama.jst',
          processName: function (filename) {
            return filename.replace('src/templates/', '').replace(/\.jst$/, '').replace(/\//g, '_');
          },
          templateSettings: {
            variable: 'v'
          }
        },
        files: {
          'src/templates/compiled.js': ['src/templates/*.jst']
        }
      }
    },
    watch: {
      jst: {
        files: 'src/templates/*.jst',
        tasks: ['jst', 'string-replace:jst']
      },
      sass: {
        files: '<%= meta.sass %>',
        tasks: ['sass', 'autoprefixer']
      },
      js: {
        files: '<%= meta.js %>',
        tasks: 'concat:js'
      },
	    i: {
		    files: 'src/i/*',
		    tasks: 'copy:i'
	    }
    },
    sass: {
			mixdown: {
        options: {
        },
        files: {
          'product/fotorama.css': 'src/scss/fotorama.scss'
        }
      }
    },
    autoprefixer: {
      mixdown: {
        options: {
          browsers: ['last 2 version', 'ie 8', 'ie 7']
        },
        files: {
          'product/fotorama.css': 'product/fotorama.css'
        }
      }
    },
	  copy: {
		  i: {
			  files: [
					{
						expand: true,
						flatten: true,
						src: ['src/i/*.png'],
						dest: 'product/'
					}
				]
		  },
		  example: {
			  files: [
				  {
					  src: 'src/example/example.html',
					  dest: 'product/example.html'
				  }
			  ]
		  }
	  },
    concat: {
      js: {
        files: {
          'product/fotorama.js': '<%= meta.js %>'
        },
        options: {
          banner: '<%= meta.banner %>'
        }
      },
      css: {
        files: {
          'product/fotorama.uncompressed.css': 'product/fotorama.css'
        },
        options: {
          banner: '<%= meta.banner %>'
        }
      }
    },
    cssmin: {
      product: {
        files: {
          'product/fotorama.css': 'product/fotorama.css'
        },
        options: {
          banner: '<%= meta.banner.replace(/\\n$/, "") %>'
        }
      }
    },
    'string-replace': {
	    jst: {
		    files: {
			    'src/templates/compiled.js': 'src/templates/compiled.js'
		    },
		    options: {
			    replacements: [
            {
              pattern: /this\[\"(\$)\"\]/g,
              replacement: "$"
            },
				    {
					    pattern: /\[\"([a-z]+)\"\]/gi,
					    replacement: ".$1"
				    }
          ]
		    }
	    },
      console: {
        files: {
          'product/fotorama.uncompressed.js': 'product/fotorama.js'
        },
        options: {
          replacements: [
            {
              pattern: /(console\.)/g,
              replacement: "//$1"
            }
          ]
        }
      },
	    version: {
		    files: {
			    'fotorama.jquery.json': 'fotorama.jquery.json'
		    },
		    options: {
			    replacements: [
				    {
					    pattern: /\d+.\d+.\d+/g,
					    replacement: '<%= pkg.version %>'
				    }
			    ]
		    }
	    }
    },
    uglify: {
      product: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          'product/fotorama.js': 'product/fotorama.uncompressed.js'
        }
      }
    },
		clean: {
			zip: ['product/fotorama*.zip']
		},
		compress: {
			uncompressed: {
				options: {
					archive: 'product/fotorama-<%= pkg.version %>.uncompressed.zip'
				},
        files: [
					{expand: true, cwd: 'product/', src: 'fotorama.uncompressed.css', dest: 'fotorama-<%= pkg.version %>.uncompressed/'},
					{expand: true, cwd: 'product/', src: 'fotorama.uncompressed.js', dest: 'fotorama-<%= pkg.version %>.uncompressed/'},
					{expand: true, cwd: 'product/', src: 'fotorama.png', dest: 'fotorama-<%= pkg.version %>.uncompressed/'},
					{expand: true, cwd: 'product/', src: 'fotorama@2x.png', dest: 'fotorama-<%= pkg.version %>.uncompressed/'}
				]
			},
      product: {
				options: {
					archive: 'product/fotorama-<%= pkg.version %>.zip'
				},
        files: [
					{expand: true, cwd: 'product/', src: 'fotorama.css', dest: 'fotorama-<%= pkg.version %>/'},
					{expand: true, cwd: 'product/', src: 'fotorama.js', dest: 'fotorama-<%= pkg.version %>/'},
					{expand: true, cwd: 'product/', src: 'fotorama.png', dest: 'fotorama-<%= pkg.version %>/'},
					{expand: true, cwd: 'product/', src: 'fotorama@2x.png', dest: 'fotorama-<%= pkg.version %>/'},
		      {expand: true, cwd: 'product/', src: 'example.html', dest: 'fotorama-<%= pkg.version %>/'}
				]
      }
		},
		s3: {
			options: {
				key: '<%= grunt.file.readJSON("grunt-s3.json").key %>',
				secret: '<%= grunt.file.readJSON("grunt-s3.json").secret %>',
				bucket: 'fotorama',
				access: 'public-read',
        gzip: true,
				secure: false
			},
			product: {
        options: {
          headers: {'Cache-Control': 'max-age=2592000'}
        },
				upload: [
						// Separate version to separate folder
					{
						src: 'product/*',
						dest: '<%= pkg.version %>/'
					}
				]
			},
      edge: {
        // Latest to the root
        options: {
          headers: {'Cache-Control': 'max-age=1'}
        },
				upload: [
					{
						src: 'product/fotorama.*',
						dest: ''
					},
					{
						src: 'product/fotorama@2x.png',
						dest: 'fotorama@2x.png'
					}
				]
			}
		},

		connect: {
			server: {
				options: {
					hostname: '*',
					port: 9001,
					keepalive: true
				}
			}
		},

	  shell: {
		  commit: {
			  command: 'git commit fotorama.jquery.json -m \'Tagging the <%= pkg.version %> release\'',
			  stdout: true,
			  stderr: true,
			  failOnError: true
		  },
		  tag: {
			  command: 'git tag <%= pkg.version %>',
			  stdout: true,
			  stderr: true,
			  failOnError: true
		  },
		  push: {
			  command: 'git push --tags --progress origin master:master',
			  stdout: true,
			  stderr: true,
			  failOnError: true
		  },
		  publish: {
			  command: 'heroku config:add FOTORAMA_VERSION=<%= pkg.version %>',
			  stdout: true,
			  stderr: true,
			  failOnError: true
		  }
	  },

	  jasmine: grunt.file.readJSON('test/specs/_specs.json')
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.loadNpmTasks('grunt-s3');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-shell');

	var defaultTask = 'copy sass autoprefixer jst string-replace:jst concat:js string-replace:console concat:css jasmine uglify cssmin jasmine clean compress';

  // Compile
  grunt.registerTask('default', defaultTask.split(' '));

	// Publish, will fail without secret details ;-)
	grunt.registerTask('publish', (defaultTask + ' ' + 's3 string-replace:version shell').split(' '));
};