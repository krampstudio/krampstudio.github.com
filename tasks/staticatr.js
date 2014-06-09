var _            = require('lodash');
var blogFactory = require('./lib/blogFactory');
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
        return grunt.file.expand(patterns.map(function(pattern){
            return src + '/' + pattern.replace(/^\//, '');
        }));
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
            resources   : '**/*.png',
            engine      : 'handlebars',
            index       : 'src/index.hbs',
            partials    : 'src/partials/*.hbs',
            i18n        : 'src/i18n.json',
            cleanDest   : false
        });

        var src  = this.data.src.replace(/\/$/, '');
        var dest = this.data.dest.replace(/\/$/, '');

        grunt.log.debug('Going to generate into ' + dest); 
        if(!grunt.file.exists(dest)){
            grunt.log.debug('mkdir -p ' + dest); 
            grunt.file.mkdir(dest);
        } else if (options.cleanDest === true){
            grunt.file.delete(dest);
        }

        options.contentFiles = expand(src, options.content);

        //build the site model        
        factory =blogFactory(grunt, src, dest, options);

        blog = factory.loadContent()
                      .loadPostsPage()
                      .loadHome()
                      .blog;
         
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

        _.forEach(_.merge({}, blog.page, blog.post), function(page, title){
            grunt.log.debug('Creating page : ' + title);
            _.forEach(page, function (pageModel, lang){
                grunt.log.debug('  to ' + pageModel.dest);
                grunt.file.write(pageModel.dest, pageModel.content);
            });
        });
        
        //copy resources
        expand(src, options.resources).forEach(function(resource){
            grunt.file.copy(resource, dest + '/' + resource.replace(src, '').replace(/^\//, ''));
        });
    });
};
