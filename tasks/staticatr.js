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
            defaultLang : 'en',
            base : 'src',
            dest : 'app'
        });

        grunt.log.debug(d(this.filesSrc));
        
        //build siteModel
        this.filesSrc.forEach(function(file){

            var matches = file.match(langPattern);
            var lang    = matches ? matches[1] : options.defaultLang;
            var content = marked(grunt.file.read(file));
            var meta    = content.meta || {};
            var layout  = meta.layout || 'page';
            var title   = path.basename(file)
                              .replace(/\.([^.]*)$/, '')
                              .replace('-' + lang, '');

            if(!siteModel[layout]){
               siteModel[layout] = {};
            }
            if(!siteModel[layout][title]){
               siteModel[layout][title] = {};
            }

            siteModel[layout][title][lang] = _.merge({
                content : content.html
            }, meta);

            grunt.file.write(file.replace(options.base, options.dest), content.html);
            grunt.log.debug(file.replace(options.base, options.dest));
        });

        grunt.verbose.write(d(siteModel));
    };

    var rebuildHome = function rebuildHome(){
        
    };

	grunt.registerMultiTask('staticatr', 'Generates static web sites', staticatr);
};
