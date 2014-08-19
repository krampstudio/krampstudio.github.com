
var expect = require('chai').expect;
var _ = require('lodash');
var blog = require('../tasks/lib/blog');

_.merge(blog, require('./data/blog.json'));

describe('blog', function(){
 
    it('should be an object', function(){
        expect(blog).to.be.an('object');
    });

    it('should contain post and page', function(){
        expect(blog).to.contain.keys(['post', 'page']);
        expect(_.size(blog.page)).to.be.above(0);
        expect(_.size(blog.post)).to.be.above(0);
    });

    it('should contain valid content', function(){
        expect(blog.page.about.en.src).to.equal('src/about.md');
    });
});

describe('blog.getAvailableLangs', function(){
 
    it('should be a function', function(){
        expect(blog.getAvailableLangs).to.be.a('function');
    });

    it('should returns languages', function(){
        expect(blog.getAvailableLangs()).to.eql(['en', 'fr']);
    });
});

describe('blog.getPostsByLang', function(){
 
    it('should be a function', function(){
        expect(blog.getPostsByLang).to.be.a('function');
    });

    it('should returns a list of posts', function(){
        var posts = blog.getPostsByLang('en');
        expect(posts).to.be.an('array');
        expect(posts.length).to.be.above(0);
    });
    
    it('should returns valid posts', function(){
        var posts = blog.getPostsByLang('en');
        var post = posts[0];
        expect(post).to.be.an('object');

        expect(post).to.contain.keys([
            'src', 
            'dest', 
            'url', 
            'fullUrl', 
            'blogName', 
            'lang', 
            'fileTitle', 
            'content', 
            'layout', 
            'author', 
            'date', 
            'comments', 
            'categories'
        ]);

        expect(post.layout).to.equal('post');
        expect(post.lang).to.equal('en');
        expect(post.content.length).to.be.above(0);
    });
});

describe('blog.getPagesByLang', function(){
 
    it('should be a function', function(){
        expect(blog.getPagesByLang).to.be.a('function');
    });

    it('should returns a list of pages', function(){
        var pages = blog.getPagesByLang('en');
        expect(pages).to.be.an('array');
        expect(pages.length).to.be.above(0);
    });
    
    it('should returns valid pages', function(){
        var pages = blog.getPagesByLang('en');
        var page = pages[1];
        expect(page).to.be.an('object');
        expect(page).to.contain.keys(['order', 'title', 'lang', 'url', 'dest', 'layout', 'date', 'content', 'comments', 'sharing', 'footer']);

        expect(page.layout).to.equal('page');
        expect(page.lang).to.equal('en');
        expect(page.content.length).to.be.above(0);
    });
});
