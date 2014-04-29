module.exports = function(grunt) {
    'use strict';

    //display times
   // require('time-grunt')(grunt);

    //load npm tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),        
        
        connect : {
            dev : {
                options: {
                    port: 4000,
                    base: 'app',
                    livereload: true
                }
            }
        },

        markdown: {
            all: {
                files: [{
                    cwd : 'src',
                    expand: true,
                    src: '**/*.md',
                    dest: '../app/',
                    ext: '.html'
                }],
                options: {
                    markdownOptions: {
                        gfm: true,
                        highlight: 'auto'
                    }
                }
            }
        },

        sass : {
            compile: {
                files : {
                    'app/css/main.css' : 'app/scss/main.scss'
                }
            },
            dev: {
                files : {
                    'app/css/main.css' : 'app/scss/main.scss'
                },
                options: {
                    sourceComments : 'map'
                }
            },
        },

        watch : {
            sass : {
                files: ['app/**/*.html', 'app/scss/**/*.scss', 'app/js/**/*.js'],
                tasks: ['sass:dev'],
                options: {
                    livereload : true
                }
            },
            md : {
                files: ['src/**/*.md'],
                tasks: ['markdown'],
                options: {
                    livereload : true
                }
            }
        },

        open : {
            dev : {
                path : 'http://localhost:4000',
                app : 'firefox -p dev -no-remote'
            }
        }
    });

    // Tasks flow.
    grunt.registerTask('dev', ['connect:dev', 'open:dev', 'watch:sass', 'watch:md']);
    grunt.registerTask('compile', ['sass:compile', 'markdown']);
};
