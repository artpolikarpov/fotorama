module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('fotorama.jquery.json'),
    meta: {
      banner: '/*!\n * <%= pkg.title %> <%= pkg.version %> | <%= pkg.licenses[0].url %>\n */\n',
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
        'src/js/spin.js',
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
            return filename.replace('src/templates/', '').replace(/.html$/, '').replace(/\//g, '_');
          },
          templateSettings: {
            variable: 'v'
          }
        },
        files: {
          'src/templates/compiled.js': ['src/templates/style']
        }
      }
    },
    watch: {
      jst: {
        files: 'src/templates/**/*',
        tasks: 'jst'
      },
      sass: {
        files: '<%= meta.sass %>',
        tasks: 'compass'
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
    compass: {
			mixdown: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'product',
          noLineComments: true,
          force: true
        }
      }
    },
	  copy: {
		  i: {
			  files: [
					{
						expand: true,
						flatten: true,
						src: ['src/i/*'],
						dest: 'product/'
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
					{expand: true, cwd: 'product/', src: 'fotorama@2x.png', dest: 'fotorama-<%= pkg.version %>/'}
				]
      }
		},
		s3: {
			options: {
				key: '<%= grunt.file.readJSON("grunt-s3.json").key %>',
				secret: '<%= grunt.file.readJSON("grunt-s3.json").secret %>',
				bucket: 'fotorama',
				access: 'public-read',
				secure: false
			},
			product: {
				upload: [
						// Separate version to separate folder
					{
						src: 'product/*',
						dest: '<%= pkg.version %>/'
					},

						// Latest to the root
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
		}
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.loadNpmTasks('grunt-s3');
	grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task
  grunt.registerTask('default', [
		'copy',
		'compass',
		'jst',
		'concat:js',
		'string-replace',
		'uglify',
		'concat:css',
		'cssmin',
		'clean',
		'compress'/*,
		's3'*/
	]);
};