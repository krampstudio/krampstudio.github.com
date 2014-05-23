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
            extension   : 'html',
            content     : '**/*.md',
            engine      : 'handlebars',
            index       : 'src/index.hbs',
            partials    : 'src/partials/*.hbs'
        });
        var src  = this.data.src;
        var dest = this.data.dest;
        var model = createModel(src, dest, options);
        home(model, options); 
        //grunt.log.debug("Site model generated : " +  d(siteModel));
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

        var main = index();
        grunt.file.write('tmp/index.html', main);
        grunt.log.debug(d(main));
    };

	grunt.registerMultiTask('staticatr', 'Generates static web sites', staticatr);
};
