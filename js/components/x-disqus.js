/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL
 */
(function(xtag, window, _, aja){
    'use strict';

    /**
     * Register the <x-disqus> component.
     * @class xDisqus
     * @example <x-disqus shortname="login" container="containerId" identifier="page_id" url="page_url" developer="false" />
     */
    xtag.register('x-disqus',
    /** @lends xDisqus */
    {
        lifecycle : {

            created : function(){
                var self = this;
                //we need to register globally some parameters for disqus, this is the way their API works.
                var globals = {
                    'disqus_developer'      : this.developer ? 1 : 0,
                    'disqus_identifier'     : this.identifier,
                    'disqus_url'            : this.url,
                    'disqus_config'         : function () {
                        if(self.lang){
                            this.language = self.lang;
                        }
                    }
                };
                //inside the component
                var elt = document.createElement('div');
                elt.id  = 'disqus_thread';
                this.appendChild(elt);

                _.assign(window, globals);

                if(typeof window.DISQUS === 'undefined'){
                    aja()
                        .url('http://' + this.shortname + '.disqus.com/embed.js')
                        .type('script')
                        .go();
                } else {
                    window.DISQUS.reset({
                        reload: true,
                        config: function () {
                            this.page.identifier    = self.identifier;
                            this.page.url           = self.url;
                            this.page.title         = self.title;
                            this.page.developer     = self.developer ? 1 : 0;
                            this.language           = self.lang;
                        }
                    });
                }
            }
        },
        accessors : {
            shortname : {
                attribute : true
            },
            identifier : {
                attribute : true
            },
            url : {
                attribute : true
            },
            developer : {
                attribute : true
            }
        }
    });

}(xtag, window, window._, window.aja));
