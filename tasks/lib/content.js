/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license GPL3
 */
var _       = require('lodash');
var fs      = require('fs');
var path    = require('path');
var marked  = require('meta-marked');
var hbs     = require('handlebars');

var contentTpl;

var patterns = {
    lang : /-([^-]{2,3})+\.(.*)$/,
    ext  : /\.([^.]*)$/
};


function extractLang(file, defaultLang){
    var matches = file.match(patterns.lang);
    return matches ? matches[1] : defaultLang;
}

function extractTitle(file, lang){
    return path.basename(file)
               .replace(patterns.ext, '')
               .replace('-' + lang, '');
}

function extractUrl(file, title, src, extension){
    return  (path.dirname(file)
                  .replace(src, '') +
                  '/' + title +
                  (extension ? '.' + extension : ''))
              .replace(/^\//, '');
}

exports.extractor = function extractor(file, options){
    var content, meta, layout;
    var lang    = extractLang(file, options.defaultLang);
    var title   = extractTitle(file, lang);
    var url     = extractUrl(file, title, options.src, options.extension);

   var renderer = new marked.Renderer();
    renderer.code = function (code, lang) {
        return "<x-code-prism language='" + (lang || '*') + "' line-numbers='true'>" +
                    (lang === 'markup' ? code.replace(/>/gm, '&gt;').replace(/</g, '&lt;') : code) +
                "</x-code-prism>";
    };

    //marked tranform md to html and read yml metas.
    content = marked(fs.readFileSync(file, 'utf-8'), { renderer: renderer });
    meta    = content.meta || {};
    layout  = meta.layout || 'page';

    if(!contentTpl){
        contentTpl = hbs.compile(fs.readFileSync(options.contentTpl, 'utf-8'));
    }

    return _.merge({
        src         : file,
        dest        : options.dest + '/' + lang + '/' + url,
        url         : url,
        fullUrl     : options.url + '/' + lang + '/' + url,
        baseUrl     : options.url + '/' + lang,
        blogName    : options.name,
        lang        : lang,
        fileTitle   : title,
        content     : content.html,

        render      : function(){
            return contentTpl(this);
        }

    }, meta);
};
