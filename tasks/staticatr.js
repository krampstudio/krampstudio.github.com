/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license GPL3
 */
var _            = require('lodash');
var blogFactory  = require('./lib/blogFactory');
var format       = require('util').format;

/**
 * Grunt task to generate your awesome blog.
 * @exports tasks/staticatr
 * @param {Object} grunt - the grunt instance
 */
module.exports = function staticatrTask(grunt) {
	'use strict';

    //var d = _.partialRight(require('util').inspect, {
        //showHidden : true,
        //depth : 10,
        //colors : true
    //});

    /**
     * Expand patterns scoped into the src
     * @private
     * @param {String} src - the source path
     * @param {Array|String} patterns - the patterns to expand (minimatch like)
     * @returns {Array} of file paths
     */
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

    /**
     * Register the staticatr Grunt task
     */
    grunt.registerMultiTask('staticatr', 'Generates static web sites', function staticatr(){
        var factory, blog;

        //build the options using defaults
        //TODO group options ? yes most of them are obscur
        var options = this.options({
            defaultLang : 'en',                                 //default language
            name        : 'Krampstudio',                        //blog name
            url         : 'http://krampstudio.com',             //blog base url
            homePosts   : 3,                                    //number of posts to display to the home page
            morePattern : /<!--\s?more\s?-->/gi,                //pattern to look at to display only the beginning of a post
            extension   : 'html',                               //generated files extension
            content     : ['**/*.md', '!js/vendor/**/*.md'],    //where to find posts
            resources   : ['fonts/**', 'css/**', 'scss/**', 'js/**', 'img/**', 'favicon.ico', '*.txt'],     //resources to include during the generation
            engine      : 'handlebars',                         //template engine
            index       : 'src/index.hbs',                      //main temaple
            contentTpl  : 'src/partials/content.hbs',           //contents template
            posts       : 'src/partials/post-entry.hbs',        //post entry template
            partials    : 'src/partials/*.hbs',                 //partials templates
            i18n        : 'src/i18n.json',                      //i18n file
            paths       : {                                     //resources paths for inside a content
                css     : '../css/',
                js      : '../js/',
                img     : '../img/',
                postImg : '../img/posts/images/'
            },
            cleanDest   : false                                 //if the task should clean the destination folder before generation
        });

        //expand fs based options
        options.src  = this.data.src.replace(/\/$/, '');
        options.dest = this.data.dest.replace(/\/$/, '');
        options.contentFiles = expand(options.src, options.content);
        options.partialFiles = grunt.file.expand(options.partials);
        options.translations = grunt.file.readJSON(options.i18n);

        //create or clean up  dest
        grunt.log.debug('Going to generate into ' + options.dest);
        if(!grunt.file.exists(options.dest)){
            grunt.log.debug('mkdir -p ' + options.dest);
            grunt.file.mkdir(options.dest);
        } else if (options.cleanDest === true){
            grunt.log.debug('Clean up ' + options.dest);
            grunt.file.delete(options.dest);
        }

        //build the blog object
        blog = blogFactory(options);

        //display some stats about
        grunt.log.write(
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

        //generate content : pages and posts
        _.forEach(blog.getAllContent(), function(content, title){
            _.forEach(content, function (contentModel, lang){
                grunt.log.debug('Creating content : ' + title + '  to ' + contentModel.dest);
                grunt.file.write(contentModel.dest, contentModel.render());
            });
        });

        //generate tech files, ie. sitemaps, robots, etc.
        var sitemaps = [];
        _.forEach(blog.tech, function(content, title){
            _.forEach(content, function (contentModel, lang){
                grunt.log.debug('Creating tech content : ' + contentModel.dest);
                grunt.file.write(contentModel.dest, contentModel.render());

                if(title === 'sitemap'){
                    sitemaps.push(contentModel.url);
                }
            });
        });

        //create the site map index for all sub sitemaps created
        if(sitemaps.length){
            grunt.file.write(options.dest + '/sitemap.xml', require('./lib/sitemap').createIndex(sitemaps));
        }

        //and copy resources
        expand(options.src, options.resources).forEach(function(resource){
            grunt.log.debug(resource);
            grunt.file.copy(resource, options.dest + '/' + resource.replace(options.src, '').replace(/^\//, ''));
        });
    });
};
