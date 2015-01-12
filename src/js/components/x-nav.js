/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL
 */
(function(xtag){
    'use strict';

    xtag.register('x-nav', {
        events : {
            'tap:delegate(li)' : function(e){

                //activatate an item
                xtag.query(e.currentTarget, 'li').forEach(function(elt){
                    elt.classList.remove('active');
                });
                this.classList.add('active');

                //delegate the click to the x-load tag if not targeted
                if(e.target.nodeName.toLowerCase() !== 'x-load'){
                    xtag.query(e.target, 'x-load').forEach(function(elt){
                        elt.load();
                    });
                }
            }
        },
    });

}(xtag));
