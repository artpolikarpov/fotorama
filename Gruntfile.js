module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*!\n * <%= pkg.name %> <%= pkg.version %> | http://fotorama.io/license/\n */\n',
      sass: ['src/scss/*'],
      js: [
        'src/js/intro.js',
        'src/js/css-classes.js',
        'src/js/skip.js',
        'src/js/_.js',
        'src/js/modernizr.js',
        'src/js/fullscreen.js',
        'src/js/bez.js',
        'src/js/basevars.js',
        'src/js/utils.js',
        'src/js/animate.js',
        'src/js/touch.js',
        'src/js/moveontouch.js',
        'src/js/wheel.js',
        'src/js/oooo.js',
        'src/js/fotorama.js',
        'src/js/fn-fotorama.js',
        'src/js/instances.js',
        'src/js/cache.js',
        'src/templates/compiled.js',
        'src/js/auto-initialization.js',
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
        tasks: ['jst', 'replace:jst']
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
      },
      test: {
        files: ['test/**/*', '!test/index.html', '!test/*/index.html', '!test/*/*/index.html', '!test/*/*/*/index.html'],
        tasks: 'shell:indexes'
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
    replace: {
      jst: {
        files: {
          'src/templates/compiled.js': 'src/templates/compiled.js'
        },
        options: {
          patterns: [
            {
              match: /this\[\"(\$)\"\]/g,
              replacement: "$"
            },
            {
              match: /\[\"([a-z]+)\"\]/gi,
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
          patterns: [
            {
              match: /(console\.)/g,
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
          patterns: [
            {
              match: /(\.?\d+){3,4}/g,
              replacement: '<%= pkg.version %>'
            }
          ]
        }
      },
      history: {
        files: {
          'history.json': 'README.md'
        },
        options: {
          patterns: [
            {
              match: /[^\r]+/g,
              replacement: function (file) {
                // /<!--(.+)-->([^\r]+)<!--\/\1-->/g
                var json = {};

                file.replace(/<!--(.+)-->([^\r]+?)<!--\/\1-->/g, function (fragment, key, notes) {
                  json[key] = notes
                      .replace(/^\n+/, '')
                      .replace(/\n+$/, '');
                });

                console.log('json', json);

                return JSON.stringify(json, null, '  ');
              }
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
        key: '<%= grunt.file.readJSON("secret.json").s3.key %>',
        secret: '<%= grunt.file.readJSON("secret.json").s3.secret %>',
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
      options: {
        stdout: true,
        stderr: true,
        failOnError: true
      },
      commit: {
        command: 'git commit fotorama.jquery.json -m \'Tagging the <%= pkg.version %> release\''
      },
      tag: {
        command: 'git tag <%= pkg.version %>'
      },
      push: {
        command: 'git push --tags --progress origin master:master'
      },
      publish: {
        command: 'heroku config:add FOTORAMA_VERSION=<%= pkg.version %>'
      },
      indexes: {
        command: './test/index.sh'
      }
    },

    jasmine: grunt.file.readJSON('test/specs/_specs.json'),

    tweet: {
      options: grunt.file.readJSON('secret.json').twit,
      release: {
        options: {
          crop: true
        },
        text: 'Fotorama <%= pkg.version %>',
        url: 'https://github.com/artpolikarpov/fotorama/releases/tag/<%= pkg.version %>'
      }
    },

  gh_release: {
    options: {
      token: grunt.file.readJSON('secret.json').github.token,
      owner: 'artpolikarpov',
      repo: 'fotorama'
    },
    release: {
      tag_name: '<%= pkg.version %>', // required
      name: '<%= grunt.file.readJSON("history.json")[pkg.version + ":name"] %>',
      body: '<%= grunt.file.readJSON("history.json")[pkg.version + ":notes"] %>',
      asset: {
        name: 'fotorama-<%= pkg.version %>.zip',
        file: 'product/fotorama-4.4.4.zip',
        'Content-Type': 'application/zip'
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
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-shell');

  grunt.loadNpmTasks('grunt-markdown-to-json');
  grunt.loadNpmTasks('grunt-tweet');
  grunt.loadNpmTasks('grunt-gh-release');

  var defaultTask = 'copy sass autoprefixer jst replace:jst concat:js replace:console concat:css jasmine uglify cssmin jasmine clean compress';
  var build = 'copy sass autoprefixer jst replace:jst concat:js replace:console concat:css uglify cssmin clean compress'.split(' ');

  // Compile
  grunt.registerTask('default', defaultTask.split(' '));
  grunt.registerTask('build', build);
  grunt.registerTask('look', 'copy:i sass autoprefixer jst replace:jst concat:js watch'.split(' '));

  // Publish, will fail without secret details ;-)
  grunt.registerTask('publish', (defaultTask + ' ' + 's3 replace:version shell').split(' '));
};