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
            dev : {
                files: ['app/**/*.html', 'app/scss/**/*.scss', 'app/js/**/*.js'],
                tasks: ['sass']
                //options: {
                    //livereload : true
                //}
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
    grunt.registerTask('dev', ['connect:dev', 'open:dev', 'watch:dev']);
};
