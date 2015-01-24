/**
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license AGPL
 */
(function(xtag){
    'use strict';

    /**
     * Register the <x-author> component.
     * @class xAuthor
     * @example <x-author />
     */
    xtag.register('x-author',
    /** @lends xAuthor */
    {
        lifecycle : {
            created : function(){
                var content = this.innerHTML.trim();
                if(this.url){
                    //manual URL
                    this.innerHTML = '<a href="' + this.url + '" target="_blank">' + content  + '</a>';

                } else if(/^@/.test(content)){
                    //twitter
                    this.innerHTML = '<a href="http://twitter.com/' + content.replace('@', '') + '" target="_blank">' + content + '</a>';

                } else {
                    this.textContent = this.author;
                }
            }
        } ,
        accessors : {
            url : {
                attribute : true
            }
        }
    });

}(xtag));
