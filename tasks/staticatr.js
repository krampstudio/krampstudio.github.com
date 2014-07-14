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
        var toExpand;
        if(!_.isArray(patterns)){
            patterns = [patterns];
        }
        toExpand = patterns.map(function(pattern){
            var scoped;
            if(/^\!/.test(pattern)){
                scoped = '!' + src + '/' +  pattern.replace(/^\!/, '').replace(/^\//, '');
            } else {
               scoped = src + '/' + pattern.replace(/^\//, '');
            }
            return scoped;
        });
        return grunt.file.expand({filter: 'isFile'}, toExpand);
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
            content     : ['**/*.md', '!js/vendor/**/*.md'],
            resources   : ['fonts/**', 'css/**', 'scss/**', 'js/**', 'img/**', 'favicon.ico', '*.txt'],
            engine      : 'handlebars',
            index       : 'src/index.hbs',
            contentTpl  : 'src/partials/content.hbs',
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

        options.src  = this.data.src.replace(/\/$/, '');
        options.dest = this.data.dest.replace(/\/$/, '');
        options.contentFiles = expand(options.src, options.content);
        options.partialFiles = grunt.file.expand(options.partials);
        options.translations = grunt.file.readJSON(options.i18n); 

        grunt.log.debug('Going to generate into ' + options.dest); 
        if(!grunt.file.exists(options.dest)){
            grunt.log.debug('mkdir -p ' + options.dest); 
            grunt.file.mkdir(options.dest);
        } else if (options.cleanDest === true){
            grunt.log.debug('Clean up ' + options.dest); 
            grunt.file.delete(options.dest);
        }
        
        //build the site model        
        blog = blogFactory(options);
         
        grunt.log.debug(
            format('Model extracted from src (%s) :\n' +
                         'langs : %j\n' + 
                         'posts : %d\n' + 
                         'pages : %d\n', 
                    options.src, 
                    blog.getAvailableLangs(), 
                    _.size(blog.post), 
                    _.size(blog.page)
            )
        );
        _.forEach(_.merge({}, blog.page, blog.post), function(page, title){
            _.forEach(page, function (pageModel, lang){
                grunt.log.debug('Creating page : ' + title + '  to ' + pageModel.dest);
                grunt.file.write(pageModel.dest, pageModel.content);
            });
        });
    
        //copy resources
        expand(options.src, options.resources).forEach(function(resource){
            grunt.log.debug(resource);
            grunt.file.copy(resource, options.dest + '/' + resource.replace(options.src, '').replace(/^\//, ''));
        });
    });
};
