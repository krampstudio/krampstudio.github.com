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
            preview : {
                options: {
                    port: 4000,
                    base: 'tmp',
                    livereload: true
                }
            }
        },

        open : {
            preview : {
                path : 'http://localhost:4000/en/index.html',
                app : 'firefox -p dev -no-remote'
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            }
        },

        sass : {
            options: {
                sourceComments : 'map'
            },
            compile: {
                files : {
                    'src/css/main.css' : 'src/scss/main.scss'
                }
            },
            preview: {
                files : {
                    'tmp/css/main.css' : 'src/scss/main.scss'
                }
            },
        },

        watch : {
            sasssrc : {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass:compile'],
            },
            sasspreview : {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass:preview'],
                options: {
                    livereload : 35729
                }
            }
        },

        staticatr: {
            build: {
                src       : 'src',
                dest      : 'dist',
                cleanDest : true 
            },
            preview: {
                src       : 'src',
                dest      : 'tmp',
                cleanDest : true 
            }
        }
    });

    // Load local tasks.
    grunt.loadTasks('tasks');

    // Tasks flow.
    grunt.registerTask('build', ['sass:compile', 'staticatr:build']);
    grunt.registerTask('preview', ['sass:compile', 'staticatr:preview', 'connect:preview', 'open:preview', 'watch:sasspreview']);
};
