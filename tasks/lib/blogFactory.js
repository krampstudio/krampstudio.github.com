var _      = require('lodash');
var fs     = require('fs');
var path   = require('path');
var hbs    = require('handlebars');
var blog   = require('./blog')
var contentExtractor = require('./content').extractor; 

var d = _.partialRight(require('util').inspect, {
    showHidden : true,
    depth : 10,
    colors : true
});

module.exports = function blogFactory(options){

    var homePageName    = options.extension ? 'index.' + options.extension : 'index'; 
    var indexTpl        = hbs.compile(fs.readFileSync(options.index, 'utf-8'));

    var postsPageName   = options.extension ? 'posts.' + options.extension : 'index'; 
    var postTpl         = hbs.compile(fs.readFileSync(options.posts, 'utf-8'));

    //register partials
    options.partialFiles.forEach(function(file){
        var name = path.basename(file)
                       .replace(/\.([^.]*)$/, '');
        hbs.registerPartial(name, hbs.compile(fs.readFileSync(file, 'utf-8'))); 
    });

    //load content from files
    options.contentFiles.forEach(function loadContent(file){
        //build blog model from each files
        var layout, title, lang;
        var content = contentExtractor(file, options);
        layout      = content.layout;
        title       = content.title;
        lang        = content.lang;

        if(!blog[layout]){
           blog[layout] = {};
        }
        if(!blog[layout][title]){
           blog[layout][title] = {};
        }

        blog[layout][title][lang] = content;
    });

    //load pages generated from meta : home and the post page
    blog.getAvailableLangs().forEach(function(lang){
 
        var tr = _.defaults(options.translations[lang] || {}, options.translations[options.defaultLang]);

        blog.page.home[lang] = {
            dest    : options.dest + '/' + lang + '/' + homePageName,
            content : indexTpl(_.defaults({
                name  : options.name,
                paths : options.paths,
                url   : options.url + '/' + lang + '/' + homePageName,
                posts : blog.getHomePosts(lang),
                navs  : blog.getNav(lang)
            }, tr))
        };

        blog.page.posts[lang] = {
            order   : 1,
            title   : 'posts',
            url     : postsPageName,
            dest    : options.dest + '/' + lang + '/' + postsPageName,
            content : blog.getPostsSummary(lang, tr.readmore).map(postTpl).join('<br>')
        };
    });

    //fs.writeFileSync('result.json', JSON.stringify(blog, null, '\t'));

    return blog;
};
