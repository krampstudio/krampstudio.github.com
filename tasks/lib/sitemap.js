/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license GPL3 
 */
var xmlbuilder = require('xmlbuilder');
var _ = require('lodash');

var siteMapBuilder = {
    
    createFromContents : function(baseUrl, contents){
        var urlSet = xmlbuilder.create('urlset')
                       .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        _.forEach(contents, function(content){
            var url = urlSet.ele('url');
            url.ele('loc', content.url ? baseUrl + '?state=' + content.url : baseUrl );
            if(content.date){
                url.ele('lastmod', new Date(content.date).toISOString());
            }
        });
        return urlSet.end({pretty : true });
    },

    createIndex : function(siteMapUrls, date){
        var genDate      = (date || new Date()).toISOString(); 
        var sitemapIndex = xmlbuilder.create('sitemapindex')
                       .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        siteMapUrls.forEach(function(url){
            var sitemap = sitemapIndex.ele('sitemap');
                sitemap.ele('loc', url);
                sitemap.ele('lastmod', genDate);
        });
        return sitemapIndex.end({pretty : true });
    }
};

module.exports = siteMapBuilder;
