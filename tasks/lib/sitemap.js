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

    createIndex : function(siteMapUrls){
        var genDate      = new Date().toISOString(); 
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
//index
//<?xml version="1.0" encoding="UTF-8"?>
   //<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   //<sitemap>
      //<loc>http://www.example.com/sitemap1.xml.gz</loc>
      //<lastmod>2004-10-01T18:23:17+00:00</lastmod>
   //</sitemap>
   //<sitemap>
      //<loc>http://www.example.com/sitemap2.xml.gz</loc>
      //<lastmod>2005-01-01</lastmod>
   //</sitemap>
   //</sitemapindex>

////sitemap
//<?xml version="1.0" encoding="UTF-8"?>
//<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  //<url>
    //<loc>http://www.example.com/foo.html</loc> 
  //</url>
//</urlset>

