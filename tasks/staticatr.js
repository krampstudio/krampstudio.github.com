var _            = require('lodash');
var blogFactory  = require('./lib/blogFactory');
var format       = require('util').format;

module.exports = function staticatrTask(grunt) {
	'use strict';

    var d = _.partialRight(require('util').inspect, {
        showHidden : true,
        depth : 10,
        colors : true
    });

    var expand = function expand(src, patterns){
        if(!_.isArray(patterns)){
            patterns = [patterns];
        }
        return grunt.file.expand({
                filter : 'isFile',
            },
            patterns.map(function(pattern){
                return src + '/' + pattern.replace(/^\//, '');
            })
        );
    };

    grunt.registerMultiTask('staticatr', 'Generates static web sites', function staticatr(){
        var factory, blog; 
        var options = this.options({
            defaultLang : 'en',
            name        : 'Krampstudio',
            url         : 'http://krampstudio.com',
            homePosts   : 3,
            morePattern : /<!--\s?more\s?-->/gi,
            extension   : 'html',
            content     : '**/*.md',
            resources   : ['fonts/**', 'css/**', 'scss/**', 'js/**', 'img/**', 'favicon.ico', '*.txt'],
            engine      : 'handlebars',
            index       : 'src/index.hbs',
            posts       : 'src/partials/post-entry.hbs',
            partials    : 'src/partials/*.hbs',
            i18n        : 'src/i18n.json',
            paths       : {
                css     : '../css/',
                js      : '../js/',
                img     : '../img/',
                postImg : '../img/posts/images/' 
            },
            cleanDest   : false
        });

        var src  = this.data.src.replace(/\/$/, '');
        var dest = this.data.dest.replace(/\/$/, '');

        grunt.log.debug('Going to generate into ' + dest); 
        if(!grunt.file.exists(dest)){
            grunt.log.debug('mkdir -p ' + dest); 
            grunt.file.mkdir(dest);
        } else if (options.cleanDest === true){
            grunt.log.debug('Clean up ' + dest); 
            grunt.file.delete(dest);
        }

        options.contentFiles = expand(src, options.content);

        //build the site model        
        factory = blogFactory(grunt, src, dest, options);

        blog = factory.getBlog();
         
        grunt.log.debug(
            format('Model extracted from src (%s) :\n' +
                         'langs : %j\n' + 
                         'posts : %d\n' + 
                         'pages : %d\n', 
                    src, 
                    factory.getAvailableLangs(), 
                    _.size(blog.post), 
                    _.size(blog.page)
            )
        );

 
       console.log('cwd : ' + process.cwd());
 
        _.forEach(_.merge({}, blog.page, blog.post), function(page, title){
            _.forEach(page, function (pageModel, lang){
                grunt.log.debug('Creating page : ' + title + '  to ' + pageModel.dest);
                grunt.file.write(pageModel.dest, pageModel.content);
            });
        });
    
        //copy resources
        expand(src, options.resources).forEach(function(resource){
            grunt.log.debug(resource);
            grunt.file.copy(resource, dest + '/' + resource.replace(src, '').replace(/^\//, ''));
        });
    });
};
