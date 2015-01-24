/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL
 */
(function(xtag, moment){
    'use strict';

    /**
     * Register the <x-time> component.
     * @class xTime
     * @example <x-time datetime="2014-07-27 11:38" />
     */
    xtag.register('x-time',
    /** @lends xTime */
    {
        lifecycle : {
            created : function(){
                if(this.datetime){
                    this.textContent = moment(this.datetime).format(this.format || 'LLLL');
                }
            }
        } ,
        accessors : {
            datetime : {
                attribute : true
            },
            format : {
                attribute : true
            }
        }
    });

}(window.xtag, window.moment));
