module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';\n'
            },
            basic: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/handlebars/handlebars.min.js',
                    'bower_components/nextprot/src/nextprot-core.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'js/compiled_infos_templates.js',
                    'js/additional-infos.js'
                ],
                dest: 'dist/additional-infos.bundle.js'
            },
            simple: {
                src: [
                    'js/compiled_infos_templates.js',
                    'js/additional-infos.js'
                ],
                dest: 'dist/additional-infos.min.js'
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
                    'dist/additional-infos.min.js': 'dist/additional-infos.min.js',
                    'dist/additional-infos.bundle.js': 'dist/additional-infos.bundle.js'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            all: {
                files: ['js/*.js', 'app/css/*.css', 'app/index.html'],
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