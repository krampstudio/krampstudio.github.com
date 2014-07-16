/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL 
 */
(function(xtag){
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
     * @example <x-disqus shortname="login" identifier="page_id" url="page_url" developer="false" />
     */
    xtag.register('x-disqus', 
    /** @lends xLoad */
    {
        lifecycle : {

            created : function(){
                //we need to register globally some parameters for disqus
                window.disqus_developer     = this.developer ? 1 : 0;
                window.disqus_identifier    = this.identifier;
                window.disqus_url           = this.url;
                
                if(!document.getElementById(scriptId)){
                    insertRemoteScript(scriptId, 'http://' + this.shortname + '.disqus.com/embed.js');
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

}(xtag));
