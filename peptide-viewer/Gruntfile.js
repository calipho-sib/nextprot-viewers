module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['bower_components/jquery/dist/jquery.js',
          'app/js/highcharts.js',
        'bower_components/handlebars/handlebars.js',
        'bower_components/sequence-viewer/src/sequence-viewer.js',
        'bower_components/nextprot/dist/nextprot.min.js'
        //'gist_templates.js'
        ],
        dest: 'app/js/dependencies.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          livereload: true,
          base: '.'
        }
      }
    },
    watch: {
      all: {
        options: {livereload: true},
        files: ['app/js/*.js']
      },
      handlebars: {
        files: 'app/assets/templates/*.tmpl',
        tasks: ['handlebars:compile']
      }
    },
    handlebars: {
      compile: {
        src: 'app/assets/templates/*.tmpl',
        dest: 'app/js/gist_templates.js',
        options: {
          namespace: "HBtemplates"
        }
      }
    }
  });



  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('default', ['concat']);
  grunt.registerTask('hbs', ['handlebars:compile']);
  grunt.registerTask('serve', ['connect:server','watch']);

};

