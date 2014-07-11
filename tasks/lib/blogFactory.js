var _      = require('lodash');
var marked = require('meta-marked');
var path   = require('path');
var hbs    = require('handlebars');

var patterns = {
    lang : /-([^-]{2,3})+\.(.*)$/,
    ext  : /\.([^.]*)$/
};

var d = _.partialRight(require('util').inspect, {
    showHidden : true,
    depth : 10,
    colors : true
});

module.exports = function blogFactory(src, dest, options){

    var translations = require(options.i18n);


    var loadContent = function loadContent(files){
        var blogMeta = {};
        
        //content
        files.forEach(function(file){
            var matches = file.match(patterns.lang);
            var lang    = matches ? matches[1] : options.defaultLang;
            //var content = marked(grunt.file.read(file));
            var meta    = content.meta || {};
            var layout  = meta.layout || 'page';
            var title   = self.getPostTitle(file, lang);
            var url     = path.dirname(file).replace(src, '') + '/' + title + '.' + options.extension;
            url = url.replace(/^\//, '');               

            if(!blogMeta[layout]){
               blogMeta[layout] = {};
            }
            if(!blogMeta[layout][title]){
               blogMeta[layout][title] = {};
            }

            blogMeta[layout][title][lang] = _.merge({
                src     : file,
                dest    : dest + '/' + lang + '/' + url,
                url     : url,
                content : content.html
            }, meta);
        });
        return blogMeta;
    };
        
        var loadHome = function loadHome(){    
            var self        = this; 
            var fileName    = options.extension ? 'index.' + options.extension : 'index'; 
            var langs       = this.getAvailableLangs();
            var indexTmpl   = hbs.compile(grunt.file.read(options.index)); 

            //register partials
            grunt.file.expand(options.partials).forEach(function(file){
                var name = path.basename(file)
                                   .replace(patterns.ext, '');
                hbs.registerPartial(name, hbs.compile(grunt.file.read(file))); 
            });

            this.blog.page.home = {};
            langs.forEach(function(lang){       
                var posts = self.getHomePosts(lang);
                var tr = self.getTranslations(lang);
                var content = indexTmpl(_.defaults({
                    name  : options.name,
                    paths : options.paths,
                    url   : options.url + '/' + lang + '/' + fileName,
                    posts : posts,
                    navs  : self.getNav(lang)
                }, tr));
                self.blog.page.home[lang] = {
                    dest    : dest + '/' + lang + '/' + fileName,
                    content : content
                };
            });

            return this;
        };

        var loadPostsPage = function loadPostsPage(){
            var self        = this; 
            var fileName    = options.extension ? 'posts.' + options.extension : 'index'; 
            var postTpl     = hbs.compile(grunt.file.read(options.posts));
            var langs       = this.getAvailableLangs();
             
            this.blog.page.posts = {};
            langs.forEach(function(lang){       
                var translations = self.getTranslations(lang);
                var posts = self.getPostsSummary(lang);
                var content = posts.map(postTpl).join('<br>');
                
                self.blog.page.posts[lang] = {
                    order   : 1,
                    title   : 'posts',
                    url     : fileName,
                    dest    : dest + '/' + lang + '/' + fileName,
                    content : content
                };
            });
            return this;
        };
};
