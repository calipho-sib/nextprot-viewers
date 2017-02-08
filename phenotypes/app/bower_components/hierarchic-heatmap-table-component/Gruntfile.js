var path = require('path');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
                options: {
                separator: ';\n'
            },
            basic: {
                 //use core because it is the "base", but needs compiled templates to work 
                 src: ['src/heatmap-table-core.js',
                      'templates/build/heatmap-compiled-templates.js'],
                dest: 'dist/heatmap-table.js'
            },
            css: {
                src: ['src/heatmap-table.css',
                      'bower_components/bootstrap/dist/css/bootstrap.min.css',
                      'bower_components/jquery-typeahead/dist/jquery.typeahead.min.css'],
                dest: 'dist/heatmap-table.css'
            },
            vendor: {
                src: ['bower_components/handlebars/handlebars.js',
                      'bower_components/jquery/dist/jquery.min.js',
                      'bower_components/jquery-typeahead/dist/jquery.typeahead.min.js',
                      'bower_components/bootstrap/dist/js/bootstrap.min.js'],
                dest: 'dist/heatmap-table-vendor.js'
            },
            bundle: {
                 //the keyword vendor is used for external dependencies
                 src: ['dist/heatmap-table-vendor.js', 
                       'dist/heatmap-table.js'],
                //the keyword bundle is for the full package source + dependencies
                dest: 'dist/heatmap-table-bundle.js'
            },
            nextprot: {
                src: ['dist/heatmap-table-bundle.js', 
                      'vendor/js/nextprot.js',
                      'src/convert-nextprot-to-heatmap.js'],
                dest: 'dist/hierarchic-heatmap-table.nextprot.js'  
            }
        },
        connect: {
            server: {
                options: {
                    port: 5000,
                    livereload: true,
                    base: '.'
                }
            }
        },
        watch: {
            all: {
                options: {
                    livereload: true
                },
                files: ['src/*.js', 'templates/src/*.tmpl', 'src/*.css', 'doc/*.pug'],
                tasks: ['handlebars:compile', 'concat', "pug:compile"]
            },
            handlebars: {
                files: 'templates/src/*.tmpl',
                tasks: ['handlebars:compile']
            },
            pug: {
                files: "doc/pug/*.pug",
                tasks: ['pug:compile']
            }
        },
        handlebars: {
            compile: {
                src: 'templates/src/*.tmpl',
                dest: 'templates/build/heatmap-compiled-templates.js',
                options: {
                    namespace: "HBtemplates"
                }
            }
        },
        pug: {
            compile: {
                options: {
                    data: {}
                },
                files: [{
                    src: "**/*.pug",
                    dest: "doc",
                    ext: ".html",
                    cwd: "doc",
                    expand: true
                }]
            }
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'https://github.com/calipho-sib/hierarchic-heatmap-table-component.git',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('default', ['connect:server', 'pug', 'concat', 'watch:all']);
    grunt.registerTask('prod', ['concat']);
    grunt.registerTask('serve', ['connect:server','watch']);
};
