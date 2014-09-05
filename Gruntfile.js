var fs = require('fs');

module.exports = function(grunt) {
    'use strict';

    var paths = {
        preview : 'tmp',
        build   : 'dist'
    };

    //load npm tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),        
        
        connect : {
            preview : {
                options: {
                    port: 4000,
                    base: paths.preview
                }
            }
        },

        open : {
            preview : {
                path : 'http://localhost:4000/en/index.html',
                app : 'firefox -p dev -no-remote'
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
            }
        },

        bower : {
            install :  {
                options: {
                    targetDir: 'src/js/vendor',
                    layout: 'byComponent',
                    copy: true,
                    cleanup: true
                }
            }
        },
        
        mochaTest: {
          test: {
            options: {
              reporter: 'spec'
            },
            src: ['test/**/*.js']
          }
        },

        watch : {
            options: {
                livereload : 35729,
                debounceDelay: 1000
            },
            sasspreview : {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass:compile']
            },
            blogpreview : {
                files: ['src/**/*.js', 'src/**/*.css', 'src/**/*.map',  'src/**/*.hbs', 'src/**/*.md'],
                tasks: ['staticatr:preview']
            }
        },

        staticatr: {
            build: {
                src       : 'src',
                dest      : paths.build,
                cleanDest : true 
            },
            preview: {
                src       : 'src',
                dest      : paths.preview,
                cleanDest : true 
            }
        },

        compress : {
            package : {
                options : {
                    archive : '<%=pkg.name%>-<%=pkg.version%>.tar.gz',
                    mode : 'tgz'
                },
                expand: true,
                cwd : paths.build,
                src: ['**/*'], 
                dest: '.'
            }
        },
        
        'gh-pages' : {
            options : {
                base : paths.build,
                message: 'Deploy <%=pkg.name%> <%=pkg.version%>'
            },
            src : ['**']
        },
        
        'staticatr-migrate' : {
            test: {
                src       : './src/posts/**/*.md',
                dest      : 'migrated'
            }
        },


        notify: {
            'blogpreview': {
                options: {
                    message: 'Blog reloaded'
                }
            }
        }
    });

    // Load local tasks.
    grunt.loadTasks('tasks');

    // Tasks flow.

    //set up, should be done once (or each time you add bower deps). npm runs it during install
    grunt.registerTask('install', ['bower:install', 'sass:compile']);

    //tasks related unit tests
    grunt.registerTask('test', ['mochaTest:test']);

    //preview the blog
    grunt.registerTask('preview', ['sass:compile', 'staticatr:preview', 'connect:preview', 'open:preview', 'watch']);

    //build the blog 
    grunt.registerTask('build', ['sass:compile', 'staticatr:build']);

    //create an archive of the blog
    grunt.registerTask('package', ['build', 'compress:package']);

    //deploy the blog
    grunt.registerTask('deploy', ['build', 'gh-pages']);
};
