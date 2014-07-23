/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license GPL3 
 */

var _       = require('lodash');
var path    = require('path');

/**
 * Grunt task to generate your awesome blog.
 * @exports tasks/staticatr
 * @param {Object} grunt - the grunt instance
 */
module.exports = function staticatrTask(grunt) {
	'use strict';

    var langMapping = {
        'js'    : 'javascript',
        'html'  : 'markup',
        'xml'   : 'markup',
        'json'  : 'javascript'
    };

    /**
     * Replace octopress like {% codeblock lang:javascript %} ... {% endcodeblock %} by github ```javascript ... ```
     * @private
     * @param {String} content
     * @returns {String} migrated content
     */
    var migrateCodeBlocks = function migrateCodeBlocks(content){
        return content
                .replace(/(\{%\s?codeblock.*%\})/gmi, function(match){
                    var lang;
                    var langMatch = match.match(/lang:(\S*)?/);
                    if(langMatch[1]){
                       lang = langMapping[langMatch[1]] || langMatch[1];
                    }
                    return '\n``` ' + lang;
                })
                .replace(/\{%\s?endcodeblock\s?%\}/gmi, '```');
    };

    /**
     * Register the staticatr Grunt task
     */
    grunt.registerMultiTask('staticatr-migrate', 'Migrate octopress posts', function staticatr(){
        var factory, blog;
        var dest = this.data.dest.replace(/\/$/, '');
        var counter = 0;
        
        grunt.file.expand(this.data.src).forEach(function(file){
            var destPath = dest +  '/' + path.basename(file);
            if(grunt.file.write(destPath, migrateCodeBlocks(grunt.file.read(file)))){
                grunt.log.debug(file + ' migrated to ' + destPath);
                counter++;
            } else {
                grunt.fail.warn('Unable to migrate file ' + file + '. Verify destination : ' + destPath );
            }
        });
        if(counter > 0){
            grunt.log.ok(counter + ' ' + grunt.util.pluralize(counter, 'file/files') + ' migrated.');
        }
    });
};
