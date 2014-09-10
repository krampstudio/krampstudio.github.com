/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license GPL3 
 */
var _      = require('lodash');

/**
 * The blog model object with it's utility methods
 * 
 * TODO separate utility and delegate 
 * 
 * @exports tasks/lib/blog
 * @typedef Blog
 */
var blog = {

    /**
     * Contains the pages (layout=page)
     */
    page : {
        home : {},
        posts: {}
    },
    
    /**
     * Contains technical contents
     */
    post : {},

    tech : {
        sitemap : {},
        robots   : {}
    },

    /**
     * Get the available langs by inspecting the pages/posts
     * @returns {Array} the langs
     */
    getAvailableLangs : function getAvailableLangs(){
        var langs = [];
        _({}).merge(this.post, this.page).forEach(function(item){
            langs = langs.concat(_.keys(item));
        });
        return _.uniq(langs);
    },

    /**
     * Get all the posts for a given lang, sorted by date
     * @param {String} lang
     * @returns {Array} of posts, ie. (this.post[lang].*)
     */
    getPostsByLang : function getPostsByLang(lang){
        return this.getContentByLang('post', lang, 'date').reverse();
    },

    /**
     * Get all the pages for a given lang, sorted by the order attribute
     * @param {String} lang
     * @returns {Array} of pages, ie. (this.page[lang].*)
     */
    getPagesByLang : function getPagesByLang(lang){
        return this.getContentByLang('page', lang, 'order');
    },

    /**
     * Get contents  for a given lang
     * @param {String} layout - page or post
     * @param {String} lang
     * @param {String} [sort = date] - the content's attribute used to sort
     * @returns {Array} of contents, ie. (this[layout][lang].*)
     */
    getContentByLang : function getContentByLang(layout, lang, sort){
        return _(this[layout])
                .pluck(lang).compact()
                .sortBy(sort || 'date').value();
    },

    /**
     * Get all contents for a given lang
     * @param {String} lang
     * @param {String} [sort = date] - the content's attribute used to sort
     * @returns {Array} of contents, ie. (this.*[lang].*)
     */
    getContentsByLang : function getContentsByLang(lang, sort){
        return _(this.getAllContent())
                .pluck(lang).compact()
                .sortBy(sort || 'date').value();
    },

    /**
     * Get all contents
     * @returns {Array} of contents, ie. (this.*)
     */
    getAllContent : function getAllContent(){
        return _.merge({}, this.page, this.post);
    },

    /**
     * Prepare the posts to be summarized
     * @param {String} lang
     * @param {Regexp} morePattern - the pattern to detect in the post where to cut and add readmore
     * @param {String} moreLabel - the readmore label to use
     * @returns {Array} the posts with the summary
     */
    getPostsSummary : function getPostsSummary(lang, morePattern, moreLabel){
       return this.getPostsByLang(lang)
                    .map(function(post){
                       var index = post.content.search(morePattern);
                       if(index > -1){
                            post.summary = post.content.substring(0, index);
                       } else {
                            post.summary = post.content;
                       }
                       post.readmore = moreLabel; 
                       return post;
                    });
    },

    /**
     * Get summaries for the home page
     * @param {String} lang
     * @param {Regexp} morePattern - the pattern to detect in the post where to cut and add readmore
     * @param {String} moreLabel - the readmore label to use
     * @param {Number} [size = 5] - the number of summaries to retrieve
     * @returns {Array} the posts with the summary
     */
    getHomePosts : function getHomePosts(lang, morePattern, moreLabel, size){
        return this.getPostsSummary(lang, morePattern, moreLabel).slice(0, size || 5); 
    },

    /**
     * Get the list of pages used to build the navigation
     * @param {String} lang
     * @returns {Array} of pages, ie. (this.page[lang].*)
     */
    getNav : function getNav(lang){
        return _.reject(this.getPagesByLang(lang), {title : 'home'});
    }
};

module.exports = blog;
