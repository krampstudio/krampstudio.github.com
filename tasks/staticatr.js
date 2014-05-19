var marked  = require('meta-marked');
var path    = require('path');
var _       = require('lodash');

module.exports = function staticatrTask(grunt) {
	'use strict';

    var d = require('util').inspect;
    var langPattern = /-([^-]*)+\.(.*)$/;

    var staticatr = function staticatr(){
        var siteModel = {};
        var options = this.options({
            defaultLang : 'en'
        });
        
        this.files.forEach(function(file){

            grunt.log.debug(d(file, true));
            
            var matches = file.src[0].match(langPattern);
            var lang    = matches ? matches[1] : options.defaultLang;
            var url     = file.dest;
            var content = marked(grunt.file.read(file.src));
            var meta    = content.meta || {};
            var title   = meta.title ? meta.title : path.basename(file.dest);
            var layout  = meta.layout || 'page';
            
            if(!siteModel[layout]){
               siteModel[layout] = {};
            }
            if(!siteModel[layout][title]){
               siteModel[layout][title] = {};
            }
            _.merge(siteModel[layout][title], meta); 


            
            //grunt.log.debug(file.src);
            //console.log(lang);
            //console.log(result.meta);
            //console.log(result.html);

            //grunt.log.debug('-------------');
        });

        
        grunt.log.debug(d(siteModel));
    };
    
    var blog = {
        url : 'index.html',
        content : {
            'en' : 'html',
            'fr' : 'hteumeule'
        },
        pages : [{
            url : '/projects.html',
            content : 'projects',
        }],
        posts : [{
            title: 'My awesome markdown file',
            author: 'Me',
            date: 'Wed Sep 11 2013 02:00:00 GMT+0200 (CEST)',
            publish: true,
            tags: [ 'tag1', 'tag2' ],
            content: ''
        }]
    };

    var rebuildHome = function rebuildHome(){
        
    };

	grunt.registerMultiTask('staticatr', 'Generates static web sites', staticatr);
};
