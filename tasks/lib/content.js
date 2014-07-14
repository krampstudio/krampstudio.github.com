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
    
    var lang    = extractLang(file, options.defaultLang);
    var title   = extractTitle(file, lang);
    var url     = extractUrl(file, title, options.src, options.extension);

    //marked tranform md to html and read yml metas.
    var content = marked(fs.readFileSync(file, 'utf-8'));
    var meta    = content.meta || {};
    var layout  = meta.layout || 'page';

    if(!contentTpl){
        contentTpl = hbs.compile(fs.readFileSync(options.contentTpl, 'utf-8'));
    }

    return _.merge({
        src         : file,
        dest        : options.dest + '/' + lang + '/' + url,
        url         : url,
        lang        : lang,
        fileTitle   : title,
        content     : content.html,

        render      : function(){
            return contentTpl(this);
        }

    }, meta);
}
