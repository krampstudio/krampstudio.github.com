/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license GPL3
 */
(function(xtag, _, aja){
    'use strict';

     var twitterTmpl = _.template('<a href="https://twitter.com/share" class="twitter-share-button" data-url="<%=url%>" data-text="<%=content%>" data-via="{{author}}">Tweet</a>');

    xtag.register('x-twitter-share',
    {
        lifecycle : {

            created : function(){
                var loadTwitterWidgets = function loadTwitterWidgets(){
                    window.twttr.widgets.load();
                };
                this.innerHTML = twitterTmpl({
                    url     : this.url,
                    content : this.content
                });
                if(typeof window.twttr === 'undefined'){
                    aja()
                        .url('http://platform.twitter.com/widgets.js')
                        .type('script')
                        .on('success', loadTwitterWidgets)
                        .go();
                } else {
                    loadTwitterWidgets();
                }
            }
        },
        accessors : {
            url : {
                attribute : true
            },
            content : {
                attribute : true
            },
            author : {
                attribute : true
            }
        }
    });

}(xtag, window._, window.aja));
