var chai    = require('chai');
var expect  = chai.expect;
var chaiXml = require('chai-xml');

var siteMapBuilder = require('../tasks/lib/sitemap');

chai.use(chaiXml);

describe('siteMapBuilder', function(){

    it('should be an object', function(){
        expect(siteMapBuilder).to.be.an('object');
    });

    it('should expose a createFromContents method', function(){
        expect(siteMapBuilder.createFromContents).to.be.a('function');
    });

    it('should expose a createIndex method', function(){
        expect(siteMapBuilder.createIndex).to.be.a('function');
    });


    describe('createFromContents', function(){
        
        it('should generate sitemap xml from given content', function(){
            var expected =  
                '<?xml version="1.0" encoding="UTF-8"?>' +
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
                '  <url>' +
                '    <loc>http://www.example.com?state=foo.html</loc>' +
                '  </url>' +
                '</urlset>';
            var contents = {
                'example' : {
                    'url' : 'foo.html'
                }            
            };

            var sitemap = siteMapBuilder.createFromContents('http://www.example.com', contents);
            
            expect(sitemap).to.be.a('string');
            expect(sitemap).xml.to.be.valid();
            expect(sitemap).xml.to.equal(expected);
        });
    });


    describe('createIndex', function(){
        
        it('should generate sitemap index xml from given urls', function(){
            var lastMod = new Date();
            var expected =  
                '<?xml version="1.0" encoding="UTF-8"?>' +
                '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
                    '<sitemap>' +
                        '<loc>http://www.example.com/sitemap1.xml</loc>' +
                        '<lastmod>' + lastMod.toISOString() + '</lastmod>' +
                    '</sitemap>' +
                    '<sitemap>' +
                        '<loc>http://www.example.com/sitemap2.xml</loc>' +
                        '<lastmod>' + lastMod.toISOString() + '</lastmod>' +
                    '</sitemap>' +
                 '</sitemapindex>';

            var urls = ['http://www.example.com/sitemap1.xml', 'http://www.example.com/sitemap2.xml'];

            var sitemap = siteMapBuilder.createIndex(urls, lastMod);
            
            expect(sitemap).to.be.a('string');
            expect(sitemap).xml.to.be.valid();
            expect(sitemap).xml.to.equal(expected);
        });
    });
});
