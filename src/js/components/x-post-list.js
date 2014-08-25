/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL 
 */
(function(xtag, _){
    'use strict';
 
    xtag.register('x-post-list', {
        lifecycle : {
            created : function(){
                xtag.queryChildren(this, 'x-post').forEach(function(post){
                                        
                });
            }
        },
        events : {
            'tap:delegate(ul.filter > li)' : function(e){
                e.preventDefault();
        
                console.log(this, e.currentTarget);
                        
            }
        },
        methods : {
           show : function(sort, limit){
               _.sortBy(this.posts, sort).slice(0, limit || this.posts.length);
               
           } 
        }
    });

    xtag.register('x-post', {
        lifecycle : {
            created : function(){

                this.style.display = 'none';
            }
        },
        accessors : {
            href : {
                attribute : true
            },
            categories: {
                attribute : true
            },
            date : {
                attribute : true
            }
        }
    });

}(xtag, _));
