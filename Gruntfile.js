module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*!\n * <%= pkg.name %> <%= pkg.version %> | <%= pkg.license %>\n */\n',
      sass: ['SRC/scss/*'],
      js: [
        'SRC/js/intro.js',
        'SRC/js/_.js',
        'SRC/js/modernizr.js',
        'SRC/js/fullscreen.js',
        'SRC/js/bez.js',
        'SRC/js/css-classes.js',
        'SRC/js/basevars.js',
        'SRC/js/utils.js',
        'SRC/js/animate.js',
        'SRC/js/touch.js',
        'SRC/js/moveontouch.js',
        'SRC/js/spin.js',
        'SRC/js/fotorama.js',
        'SRC/templates/compiled.js',
        'SRC/js/outro.js'
      ]
    },
    jst: {
      compile: {
        options: {
          namespace: '$.Fotorama.jst',
          processName: function (filename) {
            return filename.replace('SRC/templates/', '').replace(/.html$/, '').replace(/\//g, '_');
          },
          templateSettings: {
            variable: 'v'
          }
        },
        files: {
          'SRC/templates/compiled.js': ['SRC/templates/style']
        }
      }
    },
    watch: {
      jst: {
        files: 'SRC/templates/**/*',
        tasks: 'jst'
      },
      sass: {
        files: '<%= meta.sass %>',
        tasks: 'compass'
      },
      js: {
        files: '<%= meta.js %>',
        tasks: 'concat:mixdown'
      }
    },
    compass: {
      dev: {
        options: {
          sassDir: 'SRC/scss',
          cssDir: 'PRODUCT',
          noLineComments: true,
          force: true
        }
      }
    },
    concat: {
      mixdown: {
        files: {
          '_mixdown/fotorama.js': '<%= meta.js %>'
        },
        options: {
          banner: '<%= meta.banner %>'
        }
      },
      product: {
        files: {
          'PRODUCT/fotorama.uncompressed.css': 'PRODUCT/fotorama.css'
        },
        options: {
          banner: '<%= meta.banner %>'
        }
      }
    },
    cssmin: {
      product: {
        files: {
          'PRODUCT/fotorama.css': 'PRODUCT/fotorama.css'
        },
        options: {
          banner: '<%= meta.banner.replace(/\\n$/, "") %>'
        }
      }
    },
    'string-replace': {
      console: {
        files: {
          'PRODUCT/fotorama.uncompressed.js': '_mixdown/fotorama.js'
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
          'PRODUCT/fotorama.js': 'PRODUCT/fotorama.uncompressed.js'
        }
      }
    },
		clean: {
			zip: ['PRODUCT/fotorama*.zip']
		},
		compress: {
      product: {
				options: {
					archive: 'PRODUCT/fotorama-<%= pkg.version %>.zip'
				},
        files: [
					{expand: true, cwd: 'PRODUCT/', src: 'fotorama.css', dest: 'fotorama-<%= pkg.version %>/'},
					{expand: true, cwd: 'PRODUCT/', src: 'fotorama.js', dest: 'fotorama-<%= pkg.version %>/'},
					{expand: true, cwd: 'PRODUCT/', src: 'fotorama.png', dest: 'fotorama-<%= pkg.version %>/'},
					{expand: true, cwd: 'PRODUCT/', src: 'fotorama@2x.png', dest: 'fotorama-<%= pkg.version %>/'}
				]
      }
		},
		s3: {
			options: {
				bucket: 'code.fotorama.io',
				access: 'public-read',
				secure: false
				/* Security credentials are in environment variables */
			},
			product: {
				upload: [
					{
						src: 'PRODUCT/*',
						dest: '<%= pkg.version %>/'
					}
				]
			}
		},

		connect: {
			server: {
				options: {
					hostname: '*',
					port: 9001
				}
			}
		}
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jst');
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
		'compass',
		'cssmin',
		'jst',
		'concat:mixdown',
		'string-replace',
		'concat:product',
		'uglify',
		'clean',
		'compress'/*,
		's3'*/
	]);
};