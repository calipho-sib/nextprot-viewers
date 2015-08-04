module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';\n'
      },
      basic: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'app/js/highcharts.js',
          'bower_components/handlebars/handlebars.js',
          'bower_components/sequence-viewer/src/sequence-viewer.js',
          'app/js/nextprot2.js',
          'bower_components/iframe-resizer/js/iframeResizer.contentWindow.min.js',
          'app/js/gist_templates.js',
          'app/js/stupidtable.js',
          'app/js/nextprot-histogram.js',
          'app/js/overview.js',
          'app/js/gist.js'

        ],
        dest: 'dist/peptide-viewer.bundle.js'
      },
      extras: {
        src: ['app/css/gist.css', 'bower_components/bootstrap/dist/css/bootstrap.min.css'],
        dest: 'dist/peptide-viewer.css'
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

