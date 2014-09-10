/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL 
 */
(function(xtag, window, Promise, _){
    'use strict';


      //var disqus_shortname = 'krampstudio';
        //// var disqus_developer = 1;
        //var disqus_identifier = 'http://krampstudio.github.com/blog/2012/09/13/et-cest-parti-avec-octopress/';
        //var disqus_url = 'http://krampstudio.github.com/blog/2012/09/13/et-cest-parti-avec-octopress/';
        //var disqus_script = 'embed.js';
      
    //(function () {
      //var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      //dsq.src = 'http://' + disqus_shortname + '.disqus.com/' + disqus_script;
      //(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    //}());

    var scriptId = 'disqus-embed';

    /**
     * Loads a remote script
     * @private
     * @param {String} url - the script URL
     * @returns {Promise?} to chain sucess/error
     */
    function insertRemoteScript(id, url){
        return new Promise(function(done, err){
            var dsq = document.createElement('script'); 
            dsq.type = 'text/javascript'; 
            dsq.async = true;
            dsq.id = id;
            dsq.src = url;
            dsq.onload = done;
            dsq.onerror = err;
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        });
    }
   
    /**
     * Register the <x-disqus> component. 
     * @class xLoad
     * @example <x-disqus shortname="login" container="containerId" identifier="page_id" url="page_url" developer="false" />
     */
    xtag.register('x-disqus', 
    /** @lends xLoad */
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

                if(!document.getElementById(scriptId)){
                    insertRemoteScript(scriptId, 'http://' + this.shortname + '.disqus.com/embed.js');
                } else {
                    DISQUS.reset({
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

}(xtag, window, window.Promise, _));
