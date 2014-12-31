module.exports = function (grunt) {
'use strict';
grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),
meta: {
  banner: '/*!\n * <%= pkg.name %> <%= pkg.version %> | http://fotorama.io/license/\n */\n',
  bannerJs: '<%= meta.banner %>fotoramaVersion = \'<%= pkg.version %>\';\n',
  sass: ['src/scss/*'],
  js: [
    'src/js/intro.js',
    'src/js/css-classes.js',
    'src/js/skip.js',
    'src/js/_.js',
    'src/js/modernizr.js',
    'src/js/fullscreen.js',
    'src/js/spin.js',
    'src/js/bez.js',
    'src/js/basevars.js',
    'src/js/utils.js',
    'src/js/animate.js',
    'src/js/touch.js',
    'src/js/moveontouch.js',
    'src/js/wheel.js',
    'src/js/fotorama.js',
    'src/js/fn-fotorama.js',
    'src/js/instances.js',
    'src/js/cache.js',
    'src/js/measures.js',
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
  options: {
    atBegin: true
  },
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
      'out/fotorama.css': 'src/scss/fotorama.scss'
    }
  }
},
autoprefixer: {
  mixdown: {
    options: {
      browsers: ['last 2 version', 'ie 8', 'ie 7']
    },
    files: {
      'out/fotorama.css': 'out/fotorama.css'
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
        dest: 'out/'
      }
    ]
  },
  example: {
    files: [
      {
        src: 'src/example/example.html',
        dest: 'out/example.html'
      }
    ]
  },
  bower: {
    files: [
      {
        src: 'out/fotorama.css',
        dest: '.fotorama-bower/fotorama.css'
      },
        {
        src: 'out/fotorama.png',
        dest: '.fotorama-bower/fotorama.png'
      },
      {
        src: 'out/fotorama@2x.png',
        dest: '.fotorama-bower/fotorama@2x.png'
      },
      {
        src: 'out/fotorama.js',
        dest: '.fotorama-bower/fotorama.js'
      },
      {
        src: 'out/example.html',
        dest: '.fotorama-bower/example.html'
      }
    ]
  },
  npm: {
    files: [
      {
        src: 'out/fotorama.css',
        dest: '.fotorama-npm/fotorama.css'
      },
        {
        src: 'out/fotorama.png',
        dest: '.fotorama-npm/fotorama.png'
      },
      {
        src: 'out/fotorama@2x.png',
        dest: '.fotorama-npm/fotorama@2x.png'
      },
      {
        src: 'out/fotorama.js',
        dest: '.fotorama-npm/fotorama.js'
      }
    ]
  }
},
concat: {
  js: {
    files: {
      'out/fotorama.js': '<%= meta.js %>'
    },
    options: {
      banner: '<%= meta.bannerJs %>'
    }
  },
  css: {
    files: {
      'out/fotorama.dev.css': 'out/fotorama.css'
    },
    options: {
      banner: '<%= meta.banner %>'
    }
  }
},
cssmin: {
  min: {
    files: {
      'out/fotorama.css': 'out/fotorama.css'
    },
    options: {
      banner: '<%= meta.banner.replace(/\\n$/, "") %>',
      report: 'gzip',
      compatibility: 'ie7'
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
      'out/fotorama.dev.js': 'out/fotorama.js'
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
      'fotorama.jquery.json': 'fotorama.jquery.json',
      '.fotorama-bower/bower.json': '.fotorama-bower/bower.json',
      '.fotorama-npm/package.json': '.fotorama-npm/package.json'
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
      'history.json': 'HISTORY.md'
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
  min: {
    options: {
      banner: '<%= meta.banner %>',
      report: 'gzip'
    },
    files: {
      'out/fotorama.js': 'out/fotorama.dev.js'
    }
  }
},
clean: {
  zip: ['out/fotorama*.zip']
},
compress: {
  dev: {
    options: {
      archive: 'out/fotorama-<%= pkg.version %>.dev.zip'
    },
    files: [
      {expand: true, cwd: 'out/', src: 'fotorama.dev.css', dest: 'fotorama-<%= pkg.version %>.dev/'},
      {expand: true, cwd: 'out/', src: 'fotorama.dev.js', dest: 'fotorama-<%= pkg.version %>.dev/'},
      {expand: true, cwd: 'out/', src: 'fotorama.png', dest: 'fotorama-<%= pkg.version %>.dev/'},
      {expand: true, cwd: 'out/', src: 'fotorama@2x.png', dest: 'fotorama-<%= pkg.version %>.dev/'}
    ]
  },
  min: {
    options: {
      archive: 'out/fotorama-<%= pkg.version %>.zip'
    },
    files: [
      {expand: true, cwd: 'out/', src: 'fotorama.css', dest: 'fotorama-<%= pkg.version %>/'},
      {expand: true, cwd: 'out/', src: 'fotorama.js', dest: 'fotorama-<%= pkg.version %>/'},
      {expand: true, cwd: 'out/', src: 'fotorama.png', dest: 'fotorama-<%= pkg.version %>/'},
      {expand: true, cwd: 'out/', src: 'fotorama@2x.png', dest: 'fotorama-<%= pkg.version %>/'},
      {expand: true, cwd: 'out/', src: 'example.html', dest: 'fotorama-<%= pkg.version %>/'}
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
  separate: {
    options: {
      headers: {'Cache-Control': 'max-age=2592000'}
    },
    upload: [
        // Separate version to separate folder
      {
        src: 'out/fotorama.*',
        dest: '<%= pkg.version %>/'
      },
      {
        src: 'out/fotorama@2x.png',
        dest: '<%= pkg.version %>/fotorama@2x.png'
      },
      {
        src: 'out/*.zip',
        dest: '<%= pkg.version %>/',
        options: {
          gzip: false
        }
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
        src: 'out/fotorama.*',
        dest: ''
      },
      {
        src: 'out/fotorama@2x.png',
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
  indexes: {
    command: './test/index.sh'
  },
  commit: {
    command: 'git commit fotorama.jquery.json -m \'Tagging the <%= pkg.version %> release\''
  },
  push: {
    command: 'git push --tags --progress origin master:master'
  },
  bower: {
    command: 'cd .fotorama-bower ' +
        '&& git add . ' +
        '&& git commit -am \'Tagging the <%= pkg.version %> release\' ' +
        '&& git tag <%= pkg.version %> ' +
        '&& git push --tags --progress origin master:master'
  },
  npm: {
    command: 'cd .fotorama-npm ' +
        '&& npm publish'
  },
  heroku: {
    command: 'heroku config:add FOTORAMA_VERSION=<%= pkg.version %>'
  }
},

jasmine: grunt.file.readJSON('test/specs/_specs.json'),

tweet: {
  options: {
    consumer_key: '<%= grunt.file.readJSON("secret.json").tweet.consumer_key %>',
    consumer_secret: '<%= grunt.file.readJSON("secret.json").tweet.consumer_secret %>',
    access_token: '<%= grunt.file.readJSON("secret.json").tweet.access_token %>',
    access_token_secret: '<%= grunt.file.readJSON("secret.json").tweet.access_token_secret %>'
  },
  release: {
    options: {
      crop: true
    },
    text: 'Fotorama <%= pkg.version %>, “<%= grunt.file.readJSON("history.json")[pkg.version + ":name"] %>”',
    url: 'https://github.com/artpolikarpov/fotorama/releases/tag/<%= pkg.version %>'
  }
},

gh_release: {
  options: {
    token: '<%= grunt.file.readJSON("secret.json").github.token %>',
    owner: 'artpolikarpov',
    repo: 'fotorama'
  },
  release: {
    tag_name: '<%= pkg.version %>', // required
    name: '<%= grunt.file.readJSON("history.json")[pkg.version + ":name"] %>',
    body: '<%= grunt.file.readJSON("history.json")[pkg.version + ":notes"] %>',
    asset: [
      {
        name: 'fotorama-<%= pkg.version %>.zip',
        file: 'out/fotorama-<%= pkg.version %>.zip',
        'Content-Type': 'application/zip'
      },
      {
        name: 'fotorama-<%= pkg.version %>.dev.zip',
        file: 'out/fotorama-<%= pkg.version %>.dev.zip',
        'Content-Type': 'application/zip'
      }
    ]
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

grunt.loadNpmTasks('grunt-tweet');
grunt.loadNpmTasks('grunt-gh-release');

var defaultTask = 'copy:i sass autoprefixer jst replace:jst concat:js replace:console concat:css uglify cssmin jasmine clean copy:example compress';
//var build = 'copy:i sass autoprefixer jst replace:jst concat:js replace:console concat:css uglify cssmin clean copy:example compress'.split(' ');

// Compile
grunt.registerTask('default', defaultTask.split(' '));
//grunt.registerTask('build', build);
//grunt.registerTask('look', 'copy:i sass autoprefixer jst replace:jst concat:js watch'.split(' '));

// Publish, will fail without secret details ;-)
grunt.registerTask('publish', (defaultTask + ' replace:version copy:bower copy:npm shell:commit shell:push shell:bower shell:npm').split(' '));
grunt.registerTask('release', ('shell:heroku replace:history gh_release tweet').split(' '));
};