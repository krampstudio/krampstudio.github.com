
var expect = require('chai').expect;
var contentExtractor = require('../tasks/lib/content').extractor;

// tests.js
describe('contentParser', function(){

    var options = {
        defaultLang : 'en',
        extension   : 'html',
        src         : 'test/data',
        dest        : 'test/tmp',
        contentTpl  : 'src/partials/content.hbs' 
    };


    it('should be a function', function(){
        expect(contentExtractor).to.be.a('function');
    });

    it('should extract meta from a file', function(){

        var file = options.src + '/about-en.md';

        var content = contentExtractor(file, options);
        expect(content).to.be.a('object');
        expect(content).to.contain.keys(['src', 'dest', 'url', 'lang', 'fileTitle', 'content']);
    });

    it('should extract correct meta from a file', function(){

        var file = options.src + '/about-en.md';

        var content = contentExtractor(file, options);
        expect(content).to.be.a('object');
        expect(content.src).to.equal(file);
        expect(content.url).to.equal('about.html');
        expect(content.dest).to.equal('test/tmp/en/about.html');
    });

    it('should extract meta from within the file', function(){

        var file = options.src + '/about-en.md';

        var content = contentExtractor(file, options);

        expect(content).to.be.a('object');
        expect(content).to.contain.keys(['layout', 'title', 'author', 'date', 'comments', 'sharing']);
        expect(content.layout).to.equal('page');
        expect(content.title).to.equal('about');
        expect(content.comments).to.be.false;
    });

    it('should render the content', function(){

        var file = options.src + '/about-en.md';

        var content = contentExtractor(file, options);
        
        expect(content).to.be.a('object');
        expect(content.render).to.be.a('function');

        var rendered = content.render();

        expect(rendered).to.be.a('string');
        expect(rendered).to.contain('<h1>about</h1>');
        expect(rendered).to.be.not.empty;

    });
});
