/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL
 */
(function(xtag, aja){
    'use strict';

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
