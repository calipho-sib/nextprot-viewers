module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n'
            },
            basic: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/handlebars/handlebars.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/nextprot/src/nextprot-core.js',
                    'vendor/datatables.min.js',
                    'js/compiled_infos_templates.js',
                    
                    'biovizJS/library/jquery-ui.min.js',
                    'biovizJS/library/jquery.ui-contextmenu.min.js',
                    
                    'js/bio-viz.js',
                    'biovizJS/BiovizJS.js'
                ],
                dest: 'dist/bio-viz.bundle.js'
            },
            simple: {
                src: [
                    'vendor/datatables.min.js',
                    'js/compiled_infos_templates.js',
                    'biovizJS/library/jquery-ui.min.js',
                    'biovizJS/library/jquery.ui-contextmenu.min.js',
                    'js/bio-viz.js',
                    'biovizJS/BiovizJS.js'
                ],
                dest: 'dist/bio-viz.min.js'
            },
            css:{
                src: ['bower_components/bootstrap/dist/css/bootstrap.min.css',
                      'biovizJS/css/bioviz-theme/jquery-ui.min.css',
                      'vendor/datatables.min.css',
                      'css/style.css'],
                dest: 'dist/bio-viz.bundle.css'
            },
            simpleCss:{
                src: [
                      'vendor/datatables.min.css',
                      'biovizJS/css/bioviz-theme/jquery-ui.min.css',
                      'css/style.css'],
                dest: 'dist/bio-viz.min.css'
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
        uglify: {
            options : {sourceMap : true},
            dist: {
                files: {
                    'dist/bio-viz.min.js': 'dist/bio-viz.min.js',
                    'dist/bio-viz.bundle.js': 'dist/bio-viz.bundle.js'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            all: {
                files: ['js/*.js', 'css/*.css', 'app/index.html'],
                tasks: ['concat']
            },
            handlebars: {
                files: 'templates/*.tmpl',
                tasks: ['handlebars:compile', 'concat']
            }
        },
        handlebars: {
            compile: {
                src: 'templates/*.tmpl',
                dest: 'js/compiled_infos_templates.js',
                options: {
                    namespace: "HBtemplates"
                }
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },

            unit: {
                singleRun: true,
                browsers: ['Chrome']
            },

            //continuous integration mode: run tests once in PhantomJS browser.
            continuous: {
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    // Default task(s).
    grunt.registerTask('default', ['concat']);

    // Call this task for production
    grunt.registerTask('prod', ['concat', 'uglify']);
    grunt.registerTask('hbs', ['handlebars:compile']);
    grunt.registerTask('serve', ['connect:server', 'watch']);

};