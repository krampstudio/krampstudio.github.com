/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL
 */
(function(xtag, _, moment){
    'use strict';

    xtag.register('x-post-list', {
        lifecycle : {
            created : function(){
                this.posts = xtag.queryChildren(this, 'x-post');
                this.show();
            }
        },
        events : {
            'tap:delegate(li)' : function(e){
                e.preventDefault();
                this.classList.toggle('open');
            }
        },
        methods : {
           show : function(){

             //TODO use documentFragment instead of String

             var archives = {};
                _(this.posts)
                    .groupBy(function(post){
                        return moment(post.date).year();
                    }).forEach(function(yearPosts, year){
                        archives[year] = _.groupBy(yearPosts, function(post){
                            return moment(post.date).format('MMMM');
                        });
                    });

             var list = '<ul>';
             var first = true;
             _.forEach(archives, function(yearPosts, year){
                if(first){
                    list += '<li class="open">';
                } else {
                    list += '<li>' ;
                }
                list +=  year;
                list += '<ul>';
                _.forEach(yearPosts, function(monthPosts, month){
                    if(first){
                        list += '<li class="open">';
                    } else {
                        list += '<li>' ;
                    }
                    list += month;
                    list += '<ul>';
                    _.forEach(monthPosts, function(post){
                        list += '<li>' + post.innerHTML + '</li>';
                    });
                    list += '</ul>';
                    list += '</li>';
                });
                list += '</ul>';
                list += '</li>';
                if(first){
                    first = false;
                }
             });

            this.innerHTML = list;
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

}(window.xtag, window._, window.moment));
