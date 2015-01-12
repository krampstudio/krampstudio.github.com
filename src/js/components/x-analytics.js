/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL
 */
(function(xtag, aja){
    'use strict';


    /**
     * Register the <x-analyyics> component.
     *
     * @class xAnalytics
     * @example <x-analytics code="UA-XXX" domain="foo.org" />
     */
    xtag.register('x-analytics',
    /** @lends xAnalytics */
    {
        lifecycle : {
            created : function(){
                var self = this;

                var runAnalytics = function runAnalytics(){
                    window.ga('create', self.code, self.domain || 'auto');
                    window.ga('send', 'pageview');
                };

                window.GoogleAnalyticsObject = 'ga';
                if(typeof window.ga === 'undefined'){
                    window.ga = {
                        l : new Date()*1
                    };
                    aja()
                        .url('http://www.google-analytics.com/analytics.js')
                        .type('script')
                        .on('success', function(){
                            runAnalytics();
                        })
                        .go();
                } else {
                    runAnalytics();
                }
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

}(xtag, window.aja));
