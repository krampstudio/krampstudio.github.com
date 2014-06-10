var _      = require('lodash');
var marked = require('meta-marked');
var path   = require('path');
var hbs    = require('handlebars');

module.exports = function blogFactory(grunt, src, dest, options){

    var patterns = {
        lang : /-([^-]{2,3})+\.(.*)$/,
        ext  : /\.([^.]*)$/
    };

    var d = _.partialRight(require('util').inspect, {
        showHidden : true,
        depth : 10,
        colors : true
    });

    return {

        blog : {
            src  : src,
            dest : dest 
        },
        
        loadContent : function loadPosts(){
            var self = this;
            //content
            options.contentFiles.forEach(function(file){
                var matches = file.match(patterns.lang);
                var lang    = matches ? matches[1] : options.defaultLang;
                var content = marked(grunt.file.read(file));
                var meta    = content.meta || {};
                var layout  = meta.layout || 'page';
                var title   = self.getPostTitle(file, lang);
                var url     = path.dirname(file).replace(src, '') + '/' + title + '.' + options.extension;
                url = url.replace(/^\//, '');               
 
                if(!self.blog[layout]){
                   self.blog[layout] = {};
                }
                if(!self.blog[layout][title]){
                   self.blog[layout][title] = {};
                }

                self.blog[layout][title][lang] = _.merge({
                    src     : file,
                    dest    : dest + '/' + lang + '/' + url,
                    url     : url,
                    content : content.html
                }, meta);
            });
            
            return this;
        },
        
        loadHome : function loadHome(){    
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
                var translations = self.getTranslations(lang);
                var posts = self.getHomePosts(lang);
                var content = indexTmpl({
                    posts : posts,
                    blog  : _.merge({}, translations, {
                        url  : options.url + '/' + lang + '/' + fileName,
                        name : options.name
                    }),
                    navs  : self.getNav(lang),
                    page  : {
                        title : translations.desc 
                    }
                });
                self.blog.page.home[lang] = {
                    dest    : dest + '/' + lang + '/' + fileName,
                    content : content
                };
            });

            return this;
        },

        loadPostsPage : function loadPostsPage(){
            var self        = this; 
            var fileName    = options.extension ? 'posts.' + options.extension : 'index'; 
            var postTpl     = hbs.compile(grunt.file.read(options.posts));
            var langs       = this.getAvailableLangs();
             
            this.blog.page.posts = {};
            langs.forEach(function(lang){       
                var translations = self.getTranslations(lang);
                var posts = self.getPostsSummary(lang);
                var content = posts.map(function(post){
                    return postTpl(_.assign({ blog : translations }, post));
                }).join('<br>');
                
                self.blog.page.posts[lang] = {
                    order   : 1,
                    title   : 'posts',
                    url     : fileName,
                    dest    : dest + '/' + lang + '/' + fileName,
                    content : content
                };
            });
            return this;
        },
        
        getPostTitle : function getPostTitle(file, lang){              
            return path.basename(file)
                       .replace(patterns.ext, '')
                       .replace('-' + lang, '');
        },

        getAvailableLangs : function getAvailableLangs(){
            var langs = [];
            if(!this.blog.post || !this.blog.page){
                this.loadPosts();
            }
            _({}).merge(this.blog.post, this.blog.page).forEach(function(item){
                langs = langs.concat(_.keys(item));
            });
            return _.uniq(langs);
        },

        getPostsByLang : function getPostsByLang(lang){
            return this.getContentByLang('post', lang, 'date');
        },

        getPagesByLang : function getPagesByLang(lang){
            return this.getContentByLang('page', lang, 'order');
        },

        getContentByLang : function getContentByLang(layout, lang, sort){
            return _(this.blog[layout]).pluck(lang).compact().sortBy(sort || 'date').value();
        },

        getTranslations : function getTranslations(lang){
            var translations = grunt.file.readJSON(options.i18n);
            return _.defaults(translations[lang], translations[options.defaultLang]);
        },

        getPostsSummary : function getPostsSummary(lang){
           return this.getPostsByLang(lang)
                        .map(function(post){
                           var index = post.content.search(options.morePattern);
                           if(index > -1){
                                post.summary = post.content.substring(0, index);
                           } else {
                                post.summary = post.content;
                           }
                           return post;
                        });
        },

        getHomePosts : function getHomePosts(lang){
            return this.getPostsSummary(lang).slice(0, options.homePosts); 
        },

        getNav : function getNav(lang){
            return this.getPagesByLang(lang);
        }
    }; 
};
