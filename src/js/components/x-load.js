(function(xtag){
    'use strict';

    xtag.register('x-load', {
        events : {
            tap : function(){
               if(!this._loading){
                    this.load();
                } 
            }
        },
        accessors : {
            href : {
                attribute : true 
            },
            target : {
                attribute : true
            }
        },
        methods : {
            load : function(){
                var self     = this;
                var target   = document.querySelectorAll(this.target);
                var location = this.href;
                var request  = new XMLHttpRequest();
                var success  = function success(){
                    update(request.responseText);
                    self._loading = false;
                };  
                var error    = function error(){
                    console.error('error', arguments, request);
                    self._loading = false;
                }; 
                var update   = function update(content){
                    if(target.length){
                        target.array().forEach(function(elt){
                            elt.innerHTML = content;
                        });
                    }   
                }; 
        
                this._loading = true;
 
                request.open('GET', location, true);
                update('loading');
                request.onload = success;
                request.onerror = error;
                request.send();
            }
        }
    });
}(xtag));
