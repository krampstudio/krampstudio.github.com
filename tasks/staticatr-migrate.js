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

    var d = _.partialRight(require('util').inspect, {
        showHidden : true,
        depth : 10,
        colors : true
    });


//<x-code-prism language="javascript" line-numbers="true">
//function test() {
////do stuffs
//};
//console.log(test instanceof Object);
////stdout: true

//console.log(require('util').inspect(test, true));
////stdout: { [Function: test]
////stdout:   [length]: 0,
////stdout:   [name]: 'test',
////stdout:   [arguments]: null,
////stdout:   [caller]: null,
////stdout:   [prototype]: { [constructor]: [Circular] } }
//</x-code-prism>

//- Une fonction peut être assignée à une variable, comme un objet ou n'importe quel type. 
//{% codeblock lang:javascript %}
//var getOs = function get_os() {
//return 'windows';
//}
//console.log( typeof getOs ); 
////stdout: 'function'
//{% endcodeblock %}

    var migrateCodeBlocks = function migrateCodeBlocks(content){
        var openStart = '<x-code-prism'; 
        var openEnd   = ' lin-numbers="true">';
        var close     = '</x-code-prism>';

        return content

                //replace octopress like {% codeblock lang:javascript %} ... {% endcodeblock %}
                .replace(/(\{%\s?codeblock.*%\})/gmi, function(match){
                    var lang = '';
                    var langMatch = match.match(/lang:(\S*)?/);
                    if(langMatch[1]){
                        lang = ' language="' + langMatch[1] + '" ';
                    }

                    return openStart + lang + openEnd;
                })
                .replace(/\{%\s?endcodeblock\s?%\}/gmi, close)
 
                //replace github like ```bash ... ```
                .replace(/```\s?(\w+)\s+(.*)+\s+```/gmi,  openStart + ' language="$1"' + openEnd +  '\n$2\n' + close);
    };

    /**
     * Register the staticatr Grunt task
     */
    grunt.registerMultiTask('staticatr-migrate', 'Migrate octopress posts', function staticatr(){
        var factory, blog;

        //build the options using defaults 
        //TODO group options ? yes most of them are obscur
        var options = this.options({
        });

        var dest = this.data.dest.replace(/\/$/, '');

        //expand fs based options
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
