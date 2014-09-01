/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL 
 */
(function(xtag){
    'use strict';
 
    xtag.register('x-nav', {
        events : {
            'tap:delegate(li)' : function(e){
                xtag.query(e.currentTarget, 'li').forEach(function(elt){
                    elt.classList.remove('active');
                });
                this.classList.add('active');
            }
        },
    });

}(xtag));
