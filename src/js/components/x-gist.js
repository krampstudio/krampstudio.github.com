/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL
 */
(function(xtag, aja){
    'use strict';

    //function jsonp(url){
        //return new Promise(function(done, err){
            //var container = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
            //var script = document.createElement('script');

            //var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
            //window[callbackName] = function(data) {
                //delete window[callbackName];
                //container.removeChild(script);
                //done(data);
            //};

            //script.type = 'text/javascript';
            //script.async = true;
            //script.src = url;
            //script.onerror = err;
            //container.appendChild(script);
        //});
    //}

    //<div><script src='https://gist.github.com/3854836.js?file=dynamic-removable-list.js'></script>

    xtag.register('x-gist',
    {
        lifecycle : {
            created : function(){
                var self   = this;
                var gistId = this.getAttribute('gist-id');
                var url    = 'https://gist.github.com/';
                if(gistId){
                    url += gistId + '.json';
                    if(this.file){
                        url += '?file=' + this.file;
                    }
                    aja()
                        .url(url)
                        .type('jsonp')
                        .on('success', function(data){
                            var html = '<link rel="stylesheet" href="' + data.stylesheet + '"></link>';
                            html += data.div;
                            self.innerHTML = html;
                        })
                        .go();
                }
            }
        } ,
        accessors : {
            'gist-id' : {
                attribute : true
            },
            file : {
                attribute : true
            }
        }
    });

}(xtag, window.aja));
