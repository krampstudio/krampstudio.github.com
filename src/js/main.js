(function(xtag){
    'use strict';

    xtag.register('x-load', {
        lifecycle : {
            created : function(){
                this.request = new XMLHttpRequest();
                    
                console.log('source has initial value of  ' + this.src);
            }
        },
        accessors : {
            src : {
                attribute : true,                 
                set : function(value){
                    this._src = value;
                }
            }
        },
        method : {
            load : function(){
                console.log('send request to ' + this.src);
            }
        }
    });
}(xtag));
