var fs = require('fs');

module.exports = function(grunt) {
    'use strict';

    var paths = {
        preview: 'tmp',
        build: 'dist',
        jslibs: 'src/js/vendor'
    };

    //load npm tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            preview: {
                options: {
                    port: 4000,
                    base: paths.preview
                }
            }
        },

        open: {
            preview: {
                path: 'http://localhost:4000/en/index.html',
                app: 'firefox -p dev -no-remote'
            }
        },

        sass: {
            options: {
                sourceComments: 'map',
                outputStyle: 'compressed'
            },
            compile: {
                files: {
                    'src/css/main.css': 'src/scss/main.scss'
                }
            }
        },

        bower: {
            install: {
                options: {
                    targetDir: paths.jslibs,
                    layout: 'byComponent',
                    copy: true,
                    cleanup: true
                }
            }
        },

        uglify: {
            options: {
                sourceMap: true
            },
            lib: {
                files: {
                    'src/js/lib.min.js': [
                        paths.jslibs + '/x-tag-core/web-components-polyfills.js',
                        paths.jslibs + '/modernizr/modernizr.js',
                        paths.jslibs + '/history/scripts/bundled/html4+html5/native.history.js',
                        paths.jslibs + '/x-tag-core/core.js',
                        paths.jslibs + '/lodash/lodash.compat.js',
                        paths.jslibs + '/moment/moment-with-locales.js'
                    ]
                }
            },
            component: {
                files: {
                    'src/js/components.min.js': ['src/js/components/*.js']
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

        watch: {
            options: {
                livereload: 35729,
                debounceDelay: 1000
            },
            sasspreview: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass:compile']
            },
            uglifypreview: {
                files: ['src/js/components/*.js'],
                tasks: ['uglify:component']
            },
            blogpreview: {
                files: ['src/*.min.js', 'src/**/*.css', 'src/**/*.map', 'src/**/*.hbs', 'src/**/*.md'],
                tasks: ['staticatr:preview']
            }
        },

        staticatr: {
            build: {
                src: 'src',
                dest: paths.build,
                cleanDest: true
            },
            preview: {
                src: 'src',
                dest: paths.preview,
                cleanDest: true
            }
        },

        compress: {
            package: {
                options: {
                    archive: '<%=pkg.name%>-<%=pkg.version%>.tar.gz',
                    mode: 'tgz'
                },
                expand: true,
                cwd: paths.build,
                src: ['**/*'],
                dest: '.'
            }
        },

        'gh-pages': {
            options: {
                base: paths.build,
                message: 'Deploy <%=pkg.name%> <%=pkg.version%>'
            },
            src: ['**']
        },

        'staticatr-migrate': {
            test: {
                src: './src/posts/**/*.md',
                dest: 'migrated'
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

    
    /*
     * Tasks flow.
     */
    
    //compile assets
    grunt.registerTask('assets', ['sass:compile', 'uglify:lib', 'uglify:component']);

    //set up, should be done once (or each time you add bower deps). npm runs it during install
    grunt.registerTask('install', ['bower:install', 'assets']);

    //tasks related unit tests
    grunt.registerTask('test', ['mochaTest:test']);

    //preview the blog
    grunt.registerTask('preview', ['assets', 'staticatr:preview', 'connect:preview', 'open:preview', 'watch']);

    //build the blog 
    grunt.registerTask('build', ['assets', 'staticatr:build']);

    //create an archive of the blog
    grunt.registerTask('package', ['build', 'compress:package']);

    //deploy the blog
    grunt.registerTask('deploy', ['build', 'gh-pages']);
};
