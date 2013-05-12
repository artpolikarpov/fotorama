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
          'PRODUCT/fotorama.css': 'PRODUCT/fotorama.css'
        },
        options: {
          banner: '<%= meta.banner %>'
        }
      }
    },
    cssmin: {
      product: {
        files: {
          'PRODUCT/fotorama.min.css': 'PRODUCT/fotorama.css'
        },
        options: {
          banner: '<%= meta.banner.replace(/\\n$/, "") %>'
        }
      }
    },
    'string-replace': {
      console: {
        files: {
          'PRODUCT/fotorama.js': '_mixdown/fotorama.js'
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
          'PRODUCT/fotorama.min.js': 'PRODUCT/fotorama.js'
        }
      }
    }
    //zip: {
    //'DOWNLOAD/fotorama.zip': 'PRODUCT'
//      dev: {
//        src: ['PRODUCT/fotorama.css', 'PRODUCT/fotorama.js', 'PRODUCT/fotorama.png', 'PRODUCT/fotorama@2x.png'],
//        dest: 'DOWNLOAD/fotorama.uncompressed.zip'
//      },
//      min: {
//        src: ['PRODUCT/fotorama.min.css', 'PRODUCT/fotorama.min.js', 'PRODUCT/fotorama.png', 'PRODUCT/fotorama@2x.png'],
//        dest: 'DOWNLOAD/fotorama.zip'
//      }
    //}
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-string-replace');

  // Default task
  grunt.registerTask('default', ['compass', 'cssmin', 'jst', 'concat:mixdown', 'string-replace', 'concat:product', 'uglify']);
};