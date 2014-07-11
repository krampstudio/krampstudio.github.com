
var expect = require('chai').expect;
var contentParser = require('../tasks/lib/content.js');

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
        expect(contentParser).to.be.a('function');
    });

    it('should extract meta from a file', function(){

        var file = options.src + '/about-en.md';

        var content = contentParser(file, options);
        expect(content).to.be.a('object');
        expect(content).to.have.property('src');
        expect(content).to.have.property('dest');
        expect(content).to.have.property('url');
        expect(content).to.have.property('lang');
        expect(content).to.have.property('fileTitle');
        expect(content).to.have.property('content');
    });

    it('should extract correct meta from a file', function(){

        var file = options.src + '/about-en.md';

        var content = contentParser(file, options);
        expect(content).to.be.a('object');
        expect(content.src).to.equal(file);
        expect(content.url).to.equal('about.html');
        expect(content.dest).to.equal('test/tmp/en/about.html');
    });

    it('should extract meta from within the file', function(){

        var file = options.src + '/about-en.md';

        var content = contentParser(file, options);
        expect(content).to.be.a('object');
        expect(content).to.have.property('layout');
        expect(content.layout).to.equal('page');
        expect(content).to.have.property('title');
        expect(content.title).to.equal('about');
        expect(content).to.have.property('date');
        expect(content).to.have.property('comments');
    });

});
