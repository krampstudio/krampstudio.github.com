/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL 
 */
(function(xtag, History, Promise){
    'use strict';

    var scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    //restor initial state if needed
    restoreState(History.getState());

    //back & forward button, and push state
    History.Adapter.bind(window, 'statechange', function stateChange(){
        restoreState(History.getState());
    });
    
    /**
     * Restore a state from the history
     * @private
     * @param {History.State} state - the state to restore
     * @returns {Promise?} the load promise if a state is restored
     */
    function restoreState(state){
        if(state && state.data && state.data.selector){
			return load(state.data.state, state.data.selector);
        }
    }

    /**
     * Push a new state to the history
     * @private
     * @param {String} url - the new state URL
     * @param {String} selector - the DOM selector where the content will be set
     * @param {String} [title] - the page title
     */
    function pushState(url, selector, title){
        History.pushState({
                selector : selector,
                state    : url
            }, 
            title || '', 
            '?state=' + url
        );
    }
   
    /**
     * Loads content to the selector using
     * @private
     * @param {String} url - the content URL
     * @param {String} selector - the DOM selector where the content will be loaded
     * @returns {Promise?} to chain sucess/error
     */
    function load(url, selector){
        return new Promise(function(done, err){
            var target  = document.querySelector(selector);
            var request  = new XMLHttpRequest();

            var success  = function success(){
                update(request.responseText);
                done(request.responseText);
            };  
            var update   = function update(content){
                if(target){
                    target.innerHTML = content.replace(scriptRegex, '');
                }   
            }; 

            request.open('GET', url, true);
            update('loading...');
            request.onload = success;
            request.onerror = err;
            request.send();
        }); 
    }
    
    /**
     * Register the <x-load> component. 
     * It behaves like a <a> tag but loads content into the target using xhr.
     * @class xLoad
     * @example <x-load href="test.html" target="section .content" title="Test page">Show the test</x-load>
     */
    xtag.register('x-load', 
    /** @lends xLoad */
    {
        events : {
            'tap' : function(e){
               e.preventDefault();
               this.load();
            }
        },
        accessors : {
            href : {
                attribute : true 
            },
            target : {
                attribute : true
            },
            title : {
                attribute : true
            }
        },
        methods : {
            load : function(){
                //Delegate to the history
                pushState(this.href, this.target, this.title);
            }
        }
    });

}(xtag, window.History, window.Promise));
