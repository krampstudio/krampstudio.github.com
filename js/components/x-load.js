/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL
 */
(function(xtag, History, aja){
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
            aja()
                .url(state.data.state)
                .into(state.data.selector)
                .go();
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
     * Register the <x-load> component.
     * It behaves like a <a> tag but loads content into the target using xhr and use the history API.
     *
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

}(xtag, window.History, window.aja));
