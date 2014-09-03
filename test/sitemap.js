
var expect = require('chai').expect;
var siteMapBuilder = require('../tasks/lib/sitemap');

describe('siteMapBuilder', function(){

    it('should be an object', function(){
        expect(siteMapBuilder).to.be.an('object');
    });

    it('should expose a createFromContents method', function(){
        expect(siteMapBuilder.createFromContents).to.be.a('function');
    });

    it('should generate sitemap xml from given content', function(){
        var expected =  
'<?xml version="1.0" encoding="UTF-8"?>' +
'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
'  <url>' +
'    <loc>http://www.example.com/foo.html</loc>' +
'  </url>' +
'</urlset>';
        var contents = {
            'example' : {
                'url' : 'http://www.example.com/foo.html'
            }            
        };
        var sitemap = siteMapBuilder.createFromContents(contents);
        expect(sitemap).to.be.a('string');
        expect(sitemap.replace(/\s/g, '')).to.equal(expected.replace(/\s/g, ''));

    });

    it('should expose a createIndex method', function(){
        expect(siteMapBuilder.createIndex).to.be.a('function');
    });
});
