---
layout: post
title: "JavaScript le mot clé this"
date: 2013-08-12 18:36
comments: true
categories: JavaScript
---

Si comme moi vous aviez plutôt l'habitude des langages de programmation orientés objets *classiques*, vous avez sans doute aussi été surpris de l'utilisation du mot clé `this` en JavaScript. Il y a quelques temps déjà, l'envie de comprendre cette particularité m'a permis d'appréhender les concepts fondateurs du langage. Au final, en essyant de comprendre l'utilisation de `this`, ma vision du langage a complètement changé et depuis c'est avec plaisir que je code en JS.
Je vais donc essayer de retracer ce cheminement, en expliquant quelques principes simples mais tellement important. Ca devrait éviter quelques prises de têtes.

En fait le mot clé `this` est tout à fait cohérent dans le contexte d'un langage où le type `Function` est un objet de première classe ([First-class citizen](http://en.wikipedia.org/wiki/First-class_function)), où le scope des variable est propagé par fonction et non par block, et où le mot clé `new` n'est seulement qu'un alias.

<!-- more -->

*Tous les exemples sont testés avec Node.js version 0.10.15*. 

## La fonction, citoyenne de 1ère classe

La structure `function` permet de faire pas mal de choses, dont:

 - Chaque fonction est une instance du type `Object`
{% codeblock lang:javascript %}
function test() {
    //do stuffs
};
test.length;     //test est une instance, on accède à ses propriétés avec l'opérateur "."

console.log(require('util').inspect(test, true));
//stdout: { [Function: test]
//stdout:   [length]: 0,
//stdout:   [name]: 'test',
//stdout:   [arguments]: null,
//stdout:   [caller]: null,
//stdout:   [prototype]: { [constructor]: [Circular] } }

{% endcodeblock %}
 - Une fonction peut être assignée à une variable
{% codeblock lang:javascript %}
var getOs = function get_os() {
	return 'windows';
}
console.log( typeof getOs ); 
//stdout: 'function'

{% endcodeblock %}
 - une fonction peut être passé en argument d'une fonction
{% codeblock lang:javascript %}
function os_scanner( getOs ) {
    
    console.log( typeof arguments[0] );
	
    if( getOs() == 'windows' ){
        console.log( 'Oh crap' );
    } else {
        console.log( "I know that, it's a Unix" );
    }
}

os_scanner(getOs);
//stdout: 'function'
//stdout: 'Oh Crap'
{% endcodeblock %}
 -  Une fonction étant une instance, c'est une structure de données. Elle contient des propriétés instrinsèques (name, arguments, etc.), mais on peut aussi lui assigner de nouvelles propriétés.
{% codeblock lang:javascript %}
get_os.arch='x86';

console.log(require('util').inspect(get_os, true));
//stdout: { [Function: get_os]
//stdout:   [length]: 0,
//stdout:   [name]: 'get_os',
//stdout:   [arguments]: null,
//stdout:   [caller]: null,
//stdout:   [prototype]: { [constructor]: [Circular] },
//stdout:   arch: 'x86' }
{% endcodeblock %}

## Scope

Encore une fois, le langage se distingue de ses confrères sur ce point. La portée des variables en JavaScript se propage au niveau de la fonction et non du bloque. Bien entendu les variables globales sont accessibles globalement, mais les variables *locales* sont locales à la fonction dans la laquelle elles sont déclarées.

Quand on tente d'accéder à une variable non définie, on a une jolie erreur:
{% codeblock lang:javascript %}
function get_os(){
    var arch = 'x86';
}

function get_arch(){
    console.log(arch);
}

get_arch();
//stdout: ReferenceError: arch is not defined
//stdout:    at get_arch (repl:1:34)
//stdout:    at [...]
{% endcodeblock %}

Dans un langage où la portée des variables est le block, on pourrait s'attendre à la même chose, mais:
{% codeblock lang:javascript %}
function get_arch(){
    if(false){
        var arch = 'windows';
    }
    console.log(arch);
}

get_arch();
//stdout: undefined 
{% endcodeblock %}

La variable `arch` est donc accessible à toute la fonction, même si elle n'a pas encore de valeur. Ce code est équivalent à:

{% codeblock lang:javascript %}
function get_arch(){
    var arch;
    if(false){
        arch = 'windows';
    }
    console.log(arch);
}

get_arch();
//stdout: undefined
{% endcodeblock %}

JavaScript intègre le principe du _hoisting_, c'est-à-dire que toutes les variables locales à une fonction sont accessibles dès le début de celle-ci. Une des bonne pratique veut que toutes les variables utilisées soient donc déclarées en début de fonction.


Ce type de comportement peut nous parraître limitant. Ce serait la cas si nous n'avions pas les mécanismes de _closure_. 
