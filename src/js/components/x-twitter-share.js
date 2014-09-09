/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license GPL3 
 */
(function(xtag, window, Promise, _){
    'use strict';

     var twitterTmpl = _.template('<a href="https://twitter.com/share" class="twitter-share-button" data-url="<%=url%>" data-text="<%=content%>" data-via="{{author}}">Tweet</a>');

    /**
     * Loads a remote script
     * @private
     * @param {String} url - the script URL
     * @returns {Promise?} to chain sucess/error
     */
    function insertRemoteScript(id, url){
        if(document.getElementById(id)){
            return new Promise(function(done) { 
                done(); 
            });
        }
        return new Promise(function(done, err){
            var dsq = document.createElement('script'); 
            dsq.type = 'text/javascript'; 
            dsq.async = true;
            dsq.id = id;
            dsq.src = url;
            dsq.onload = done;
            dsq.onerror = err;
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        });
    }

    /**
     */
    xtag.register('x-twitter-share', 
    {
        lifecycle : {

            created : function(){
                if(this.twitter){
                    this.innerHTML = twitterTmpl({
                        url     : this.url,
                        content : this.content
                    });
                    insertRemoteScript('twitter-wjs', 'http://platform.twitter.com/widgets.js');
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

}(xtag, window, window.Promise, _));
