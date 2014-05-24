var marked  = require('meta-marked');
var path    = require('path');
var hbs     = require('handlebars');
var _       = require('lodash');

module.exports = function staticatrTask(grunt) {
	'use strict';

    var d = _.partialRight(require('util').inspect, {
        showHidden : true,
        depth : 10,
        colors : true
    });

    var langPattern = /-([^-]{2,3})+\.(.*)$/;

    var staticatr = function staticatr(){
        
        var options = this.options({
            defaultLang : 'en',
            homePosts   : 3,
            morePattern : /<!--\s?more\s?-->/gi,
            extension   : 'html',
            content     : '**/*.md',
            engine      : 'handlebars',
            index       : 'src/index.hbs',
            partials    : 'src/partials/*.hbs'
        });

        var src     = this.data.src;
        var dest    = this.data.dest;
        var model   = createModel(src, dest, options);
        var langs   = getAvailableLangs(model);

        home(model, options); 
        //grunt.log.debug("Site model generated : " +  d(model));
        //grunt.log.debug("Langs : " +  d(getAvailableLangs(model)));
        //grunt.log.debug("FR posts : " +  d(getPostsByLang(model, 'fr')));
        //grunt.log.debug("FR Home posts : " +  d(getHomePosts(model, 'fr', options)));
    };

    var createModel = function createModel(src, dest, options){
        var model = {}; 
        var contentFiles = grunt.file.expand(src + '/' + options.content);
         
        //grunt.log.debug("Found content files :" + d(contentFiles)); 

        //build model
        contentFiles.forEach(function(file){

            var matches = file.match(langPattern);
            var lang    = matches ? matches[1] : options.defaultLang;
            var content = marked(grunt.file.read(file));
            var meta    = content.meta || {};
            var layout  = meta.layout || 'page';
            var title   = path.basename(file)
                              .replace(/\.([^.]*)$/, '')
                              .replace('-' + lang, '');

            if(!model[layout]){
               model[layout] = {};
            }
            if(!model[layout][title]){
               model[layout][title] = {};
            }

            model[layout][title][lang] = _.merge({
                src     : file,
                dest    : file.replace(src, dest)
                              .replace(/\.([^.]*)$/, '')
                              .replace('-' + lang, '') + '.' + options.extension,
                content : content.html
            }, meta);

            //grunt.file.write(file.replace(options.base, options.dest), content.html);
        });

        return model;
    };

    var home = function home(model, options){
       if(!grunt.file.exists(options.index)){
            grunt.fail.warn("No index template found at location " + options.index);
        }
        var index = hbs.compile(grunt.file.read(options.index)); 

        grunt.file.expand(options.partials).forEach(function(file){
            var name = path.basename(file)
                           .replace(/\.([^.]*)$/, '');
            hbs.registerPartial(name, hbs.compile(grunt.file.read(file))); 
        });

        var main = index({
            posts : getHomePosts(model, 'fr', options)
        });
        grunt.file.write('tmp/index.html', main);
        //grunt.log.debug(d(main));
    };

    var getAvailableLangs = function getAvailableLangs(model){
        var langs = [];
        _({}).merge(model.post, model.page).forEach(function(item){
            langs = langs.concat(_.keys(item));
        });
        return _.uniq(langs);
    };

    var getPostsByLang = function getPostsByLang(model, lang){
        return _(model.post).pluck(lang).sortBy('date').value();
    };

    var getHomePosts = function getHomePosts(model, lang, options){
       return getPostsByLang(model, lang)
                    .slice(0, options.homePosts)
                    .map(function(post){
                       var index = post.content.search(options.morePattern);
                       if(index > -1){
                            post.summary = post.content.substring(0, index);
                       } else {
                            post.summary = post.content;
                       }
                       return post;
                    });
        
    };

	grunt.registerMultiTask('staticatr', 'Generates static web sites', staticatr);
};
