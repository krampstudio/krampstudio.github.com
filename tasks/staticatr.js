var marked = require('meta-marked');

module.exports = function staticatrTask(grunt) {
	'use strict';

    var staticatr = function staticatr(){
        
        this.files.forEach(function(file){

            grunt.log.debug(file.src);

            var result = marked(grunt.file.read(file.src));
            
            console.log(result.meta);
            console.log(result.html);

            grunt.log.debug(file.dest);
        });
        
    };
    
    var blog = {
        url : 'index.html',
        content : 'html',
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
