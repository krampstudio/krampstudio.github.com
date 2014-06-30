(function(xtag, History, Promise){
    'use strict';

    //window.onpopstate = function pop(e){
        //console.log('pop', e); 
        //if(e.state && e.state.selector){
            ////load(e.state.targetSelector, e.target.location);
        //}
    //};
    var State = History.getState(); // Note: We are using History.getState() instead of event.state
	console.log('initial:', State.data, State.title, State.url);

    History.Adapter.bind(window, 'statechange', function stateChanged(){
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
	    console.log('changed:', State.data, State.title, State.url);

    });

    function pushState(url, selector, title){
        History.pushState({selector : selector}, title || '', url);
    }
    
    function load(url, selector, title){
        return new Promise(function(done, err){
            var target  = document.querySelector(selector);
            var request  = new XMLHttpRequest();

            var success  = function success(){
                update(request.responseText);
                pushState(url, selector, title);
                done(request.responseText);
            };  
            var update   = function update(content){
                if(target){
                    target.innerHTML = content;
                }   
            }; 

            request.open('GET', url, true);
            update('loading...');
            request.onload = success;
            request.onerror = err;
            request.send();
        }); 
    }

    //function load(targetSelector, url, title){
        //var target  = document.querySelector(targetSelector);
        //var request  = new XMLHttpRequest();
        //var success  = function success(){
            //window.history.pushState({targetSelector : targetSelector}, title || '', url);
            //update(request.responseText);
        //};  
        //var error    = function error(){
            //console.error('error', arguments, request);
        //}; 
        //var update   = function update(content){
            //if(target){
                //target.innerHTML = content;
            //}   
        //}; 
        //request.open('GET', url, true);
        //update('loading...');
        //request.onload = success;
        //request.onerror = error;
        //request.send();
    //}

    xtag.register('x-load', {
        events : {
            //'tap:delegate(a)' : function(e){
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
                //Delegate to the load function
                load(this.href, this.target, this.title);
            }
        }
    });

}(xtag, window.History, window.Promise));
