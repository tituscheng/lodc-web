module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-serve');
  var serveStatic = require('serve-static');
var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
}
require('jit-grunt')(grunt, {
    "watch": "grunt-contrib-watch"
});
  // Project configuration.
  grunt.initConfig({
     connect: {
        options: {
            port: 9000,
            hostname: 'localhost',
            livereload: 35729
        },
        livereload: {
            options: {
                open: true,
                middleware: function (connect) {
                    return [

                              connect().use('/bower_components', serveStatic('./bower_components'))
                              , connect().use('/app/styles', serveStatic('./app/styles'))
                              , serveStatic(appConfig.app)

                            ];
                }
            }
        },
        test: {
            options: {
                port: 9001,
                middleware: function (connect) {
                    return [
                          connect.static('.tmp'), connect.static('test'), connect().use('/bower_components', connect.static('./bower_components')), connect.static(appConfig.app)
                    ];
                }
            }
        }
    },
    watch: {
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
              'app/views/{,*/}*.html',
              'app/views/modals/{,*/}*.html',
              'app/js/controllers/{,*/}*.js',
              'app/css/{,*/}*.css',
              'app/js/{,*/}*.js'
            ]
        }
    }, 
    useminPrepare: {
      html: 'app/index.html',
      options: {
            dest: 'dist'
      }
    },
    clean: {
      build: {
          src: ['.tmp', 'dist']
      }
    },
    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/css/{,*/}*.css'],
      js: ['dist/js/{,*/}*.js'],
      options: {
        assetsDirs: [
          'dist',
          'dist/images',
          'dist/css'
        ],
        patterns: {
          
        }
      }
    },
    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          'dist/js/*.js',
          'dist/css/*.css',
          'dist/images/img*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'app',
            src: ['**', '!css/**', '!js/**'], 
            dest: 'dist'
          }, {
            expand: true,
            cwd: 'app/css',
            src: ['**', '!*.css'], 
            dest: 'dist/css'
          }, {
            expand: true,
            cwd: 'app/js',
            src: ['lib/**', 'plugins/**'], 
            dest: './dist/js'
          }
        ],
      }
    }
  })



 
    grunt.registerTask("serve", [
        'connect:livereload',
        'watch:livereload'
    ]);

      // simple build task
    grunt.registerTask('build', [
    'clean',
    'copy',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'filerev',
    'usemin'
    ]);
}