module.exports = function(grunt) {

  // Project Configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'src/js/*.js']
    },

    sass: {
      dist: {
        files: {
          'public/css/main.css' : 'sass/main.scss'
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src:  'src/js/<%= pkg.name %>.js',
        dest: 'src/js-uglify/<%= pkg.name %>.min.js'
      }
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/js-uglify/<%= pkg.name %>.min.js'],
        dest: 'public/js/<%= pkg.name %>_all.min.js',
      },
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'public/index.html': 'src/index.html',
          // 'destination2': 'source2'
        }
      },
    },

    // configure nodemon
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },


    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    },

    // dev: {                                       // Another target
    //   files: {
    //     'dist/index.html': 'src/index.html',
    //     'dist/contact.html': 'src/contact.html'
    //   }
    // }

  });

/* 
http-server public/
*/

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('start',['nodemon']);
  grunt.registerTask('default',['jshint','uglify','concat','htmlmin','sass']);
  grunt.registerTask('dev',['jshint','uglify','concat','htmlmin','concurrent']);
};
