module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/highcharts/highcharts.js'
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
        files: ['*.js','*.html','*.css']
      }
    }
  });



  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('default', ['concat']);
  grunt.registerTask('serve', ['connect:server','watch']);

};

