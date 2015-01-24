/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL
 */
(function(xtag){
    'use strict';

    /**
     * Register the <x-time> component.
     * @class xTime
     * @example <x-time datetime="2014-07-27 11:38" />
     */
    xtag.register('x-lang-switcher',
    /** @lends xTime */
    {
        lifecycle : {
            created : function(){
                var matches;
                if(!this.current){
                    //infer the value of the current lang from the URL, ie. /langCode/index.html
                    matches = document.location.pathname.match(/^\/([a-z]{2})\//);
                    if(matches.length >= 2){
                        this.current = matches[1];

                        //then set the x-lang element with the found lang as selected
                        xtag.queryChildren(this, 'x-lang[value="' + this.current + '"]').forEach(function(elt){
                            elt.setAttribute('selected', true);
                        });
                    }
                }
            }
        },
        events : {
            'tap:delegate(x-lang)' : function(e){
                e.preventDefault();
                document.location = document.location.toString().replace('/' + e.currentTarget.current + '/', '/' + this.value + '/');
            }
        },
        accessors : {
            current: {
                get: function(){
                    return this._current;
                },
                set: function(value){
                    if(value){
                        this._current = (value + '').toLowerCase();
                    }
                }
            }
        },
        methods : {
            addLang : function(lang){
                this.langs = this.langs || [];
                this.langs.push(lang);
            }
        }
    });

    /**
     * Register the <x-time> component.
     * @class xTime
     * @example <x-time datetime="2014-07-27 11:38" />
     */
    xtag.register('x-lang',
    /** @lends xTime */
    {
        lifecycle : {
            created : function(){
                var lang = this.value;
                var switcher = this.parentNode;
                if(switcher.nodeName.toLowerCase() === 'x-lang-switcher'){
                    switcher.addLang(lang);
                    if(this.hasAttribute('selected')){
                        switcher.current = lang;
                    }
                }
            }
        },
        accessors : {
            value : {
                attribute : true
            },
            selected : {
                attribute : true
            }
        }
    });

}(xtag));
