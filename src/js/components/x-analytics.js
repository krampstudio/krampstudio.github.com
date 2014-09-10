/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL 
 */
(function(xtag){
    'use strict';

   
    /**
     * Register the <x-analyyics> component. 
     * @class xLoad
     * @example <x-analytics code="UA-XXX" />
     */
    xtag.register('x-analytics', 
    /** @lends xLoad */
    {
        lifecycle : {
            created : function(){
                //google analytics mess
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    
                ga('create', this.code, this.domain || 'auto');
                ga('send', 'pageview');
            }
        }, 
        accessors : {
            code : {
                attribute : true 
            },
            domain : {
                attribute : true 
            }
        }
    });

}(xtag));
