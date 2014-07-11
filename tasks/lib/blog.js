var _      = require('lodash');
var path   = require('path');

var patterns = {
    lang : /-([^-]{2,3})+\.(.*)$/,
    ext  : /\.([^.]*)$/
};


var blog = {

    _translations : {},
    


    getAvailableLangs : function getAvailableLangs(){
        var langs = [];
        _({}).merge(this.post, this.page).forEach(function(item){
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
        return _(this[layout])
                .pluck(lang).compact()
                .sortBy(sort || 'date').value().reverse();
    },

    getTranslations : function getTranslations(lang, defaultLang){
        return _.defaults(this._translations[lang], this._translations[defaultLang]);
    },

    getPostsSummary : function getPostsSummary(lang, morePattern){
       var tr = this.getTranslations(lang);
       return this.getPostsByLang(lang)
                    .map(function(post){
                       var index = post.content.search(morePattern);
                       if(index > -1){
                            post.summary = post.content.substring(0, index);
                       } else {
                            post.summary = post.content;
                       }
                       post.readmore = tr.readmore; 
                       return post;
                    });
    },

    getHomePosts : function getHomePosts(lang, size){
        return this.getPostsSummary(lang).slice(0, size || 5); 
    },

    getNav : function getNav(lang){
        return this.getPagesByLang(lang);
    }
};

module.exports = blog;
