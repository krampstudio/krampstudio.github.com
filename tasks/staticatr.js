var marked  = require('meta-marked');
var path    = require('path');
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
        var siteModel = {};
        
        var options = this.options({
            defaultLang : 'en'
        });
        
        //build siteModel
        this.files.forEach(function(file){

            var matches = file.src[0].match(langPattern);
            var lang    = matches ? matches[1] : options.defaultLang;
            var content = marked(grunt.file.read(file.src));
            var meta    = content.meta || {};
            var layout  = meta.layout || 'page';
            var title   = path.basename(file.dest)
                              .replace(/\.([^.]*)$/, '')
                              .replace('-' + lang, '');

            if(!siteModel[layout]){
               siteModel[layout] = {};
            }
            if(!siteModel[layout][title]){
               siteModel[layout][title] = {};
            }

            siteModel[layout][title][lang] = _.merge({
                content : content.html,
                dest    : file.dest 
            }, meta);

            grunt.file.write(file.dest, content.html);
        });

        //build posts
        //_.forEach(siteModel.post, function(page, title){
            //grunt.log.debug(title);
            //grunt.log.debug(d(page, true));
            //grunt.log.debug("-------------");
        //});
        
        //grunt.log.debug(d(siteModel, true));
    };

    var rebuildHome = function rebuildHome(){
        
    };

	grunt.registerMultiTask('staticatr', 'Generates static web sites', staticatr);
};
