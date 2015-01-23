---
layout: post
title: "JavaScript le mot clé this"
author: "@kramp"
date: 2013-08-12 18:36
comments: true
sharing: true
categories: [javascript]
---

![JS Logo](../img/posts/images/js-badge.png "js.this")

Si comme moi vous aviez plutôt l'habitude des langages de programmation orientés objets *classiques*, vous avez sans doute aussi été surpris (entre autre) de l'utilisation du mot clé `this` en JavaScript. Il y a quelques temps déjà, l'envie de comprendre cette particularité m'a permis d'appréhender les concepts fondateurs du langage. Au final, en essayant de comprendre l'utilisation de `this`, ma vision du langage a complètement changé et depuis c'est avec plaisir que je code en JS.
Je vais donc essayer de retracer ce cheminement, en expliquant quelques principes simples mais tellement important. Ça devrait éviter quelques prises de têtes.

En fait le mot clé `this` n'est pas du tout ce que l'on croit. Ce n'est pas une référence vers une instance d'un objet, mais le contexte de la fonction. Pour comprendre cela, il y a quelques concepts du langage qu'il faut explorer :

 - le type `Function` est un objet de première classe ([First-class function](http://en.wikipedia.org/wiki/First-class_function)),
 - le portée des variables locales est hissée au niveau de la fonction,
 - le mot clé `new` n'est seulement qu'un alias

<!-- more -->

*Tous les exemples présentés ont été testés avec [node.js](http://nodejs.org/) version 0.10.15. Vous pouvez les reproduire et aller plus en vous amusant avec [REPL](http://nodejs.org/api/repl.html) (la console node).*

## La fonction, citoyenne de 1ère classe
<a name='function-first-class-object'></a>

On dit du type `Function` que c'est un objet de première classe car ce type permet de faire tout ce qu'un objet peut faire dans le langage. En gros l'instance d'une fonction se comporte comme un objet. Voici quelques caractéristiques qui illustre ce principe:

 - Chaque fonction est une instance du type `Object`. Bien que `typeof aFunction` renvoie `function`, `insanteof` nous permet de vérifier l'affiliation de la fonction au type `Object`.

``` javascript
function test() {
    //do stuffs
};
console.log(test instanceof Object);
//stdout: true

console.log(require('util').inspect(test, true));
//stdout: { [Function: test]
//stdout:   [length]: 0,
//stdout:   [name]: 'test',
//stdout:   [arguments]: null,
//stdout:   [caller]: null,
//stdout:   [prototype]: { [constructor]: [Circular] } }
```

 - Une fonction peut être assignée à une variable, comme un objet ou n'importe quel type.

``` javascript
var getOs = function get_os() {
	return 'windows';
}
console.log( typeof getOs );
//stdout: 'function'
```
 - une fonction peut être passée en paramètre d'une fonction, permettant ainsi d'utiliser (en autre) le pattern du `callback`, très utile pour la programmation événementielle et les traitements asynchrones.

``` javascript
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
```
 -  Une fonction étant une instance, c'est une structure de données. Elle contient des propriétés intrinsèques (`name`, `arguments`, etc.), mais on peut aussi lui assigner de nouvelles propriétés.

``` javascript
get_os.arch='x86';

console.log(require('util').inspect(get_os, true));
//stdout: { [Function: get_os]
//stdout:   [length]: 0,
//stdout:   [name]: 'get_os',
//stdout:   [arguments]: null,
//stdout:   [caller]: null,
//stdout:   [prototype]: { [constructor]: [Circular] },
//stdout:   arch: 'x86' }
```

Maintenant, nous savons que la fonction est un des concepts central du langage JavaScript, vous me direz, pas étonnant pour un langage fonctionnel, un peu plus pour un langage orienté objet (même sans classe, mais ça c'est une autre histoire).

## Scope

Encore une fois, le langage se distingue de beaucoup de ses confrères sur le point du scope. La portée des variables en JavaScript se propage au niveau de la fonction et non du bloc. Bien entendu les variables globales sont accessibles partout (de tout façon personne n'utilise jamais de variables globales, n'est-ce pas?), par contre les variables *locales* sont locales à la fonction dans la laquelle elles ont été déclarées.

Quand on tente d'accéder à une variable non définie, on a une jolie erreur:

``` javascript
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
```

Dans un langage où la portée des variables est le bloc, on pourrait s'attendre à la même chose, mais:

``` javascript
function get_arch(){
    if(false){
        var arch = 'windows';
    }
    console.log(arch);
}

get_arch();
//stdout: undefined
```

La variable `arch` est donc **accessible** à toute la fonction, même si elle n'a pas encore été définie (d'où le `undefined`). Ce code est équivalent à:



``` javascript
function get_arch(){
    var arch;
    if(false){
        arch = 'windows';
    }
    console.log(arch);
}

get_arch();
//stdout: undefined
```

JavaScript intègre le principe du _hoisting_, c'est-à-dire que toutes les variables locales à une fonction sont accessibles dès le début de celle-ci. Une des bonnes pratiques veut que toutes les variables utilisées soient déclarées en début de fonction.

Ce type de comportement peut nous paraître limitant. Ce serait la cas si JS n'avais pas un mécanisme de _closure_. La closure est un principe tout simple mais très puissant, qui donne accès aux variables des scopes englobant dans le scope englobé. Comme la portée du scope est la fonction, alors on peut dire que si une fonction en contient une autre, alors la fonction contenue a accès aux variables de la fonction contenante. Comme souvent en informatique (et avec ma prose) un principe peut être simple mais compliqué à expliquer, alors un bon exemple devrait éclaircir ce point:


``` javascript
function desc_os(){
    var os = 'GNU/Linux';
    var version = '3.5.0-37-generic';
    var arch = 'x86_64';
    var distrib = 'Ubuntu';

    function format(){
        return os + ' ' + version + ' ' + arch + ' ' + distrib;
    }

    return format();
}

console.log(desc_os());
//stdout: GNU/Linux 3.5.0-37-generic x86_64 Ubuntu
```

Dans l'exemple ci-dessus, la fonction `format` _capture_ les valeurs des variables de la fonction `desc_os` au moment de son appel.

## Le contexte de la fonction: `this`

![This](../img/posts/images/this.png "Source theburnsider dot com slash stop this")

Comme nous l'avons vus dans la [première section](#function-first-class-object) chaque fonction est aussi un objet. De plus, chaque fonction _hérite_ de plusieurs membres de manière systématiques.

Les propriétés suivantes sont accessible à partir de chaque fonction  :

 - `name` : le nom de la fonction.
 - `length` : le nombre d'arguments déclarés.
 - `arguments` : un objet qui contient la liste des arguments passés (attention, ce n'est pas un `Array` mais un objet qui se comporte comme tel).
 - `caller` : contient une référence à la fonction appelante.


``` javascript
function showFileSystem(mountPoint){
    console.log(showFileSystem.name);
    console.log(showFileSystem.length);
    console.log(showFileSystem.arguments[0]); //also available as the `arguments` variable
    console.log(showFileSystem.caller.name);
}
function discCheck(){
    showFileSystem('/dev/sda');
}

discCheck();

//stdout: showFileSystem
//stdout: 1
//stdout: /dev/sda
//stdout: discCheck
```

Il existe d'autre propriétés qui peuvent changer entre les implémentions ou dont l'usage sort du scope de ce post (à moins d'une closure... bon, d'accord c'est nul ;).

Parmi les méthodes accessibles, les suivantes nous intéressent particulièrement:

 - `call` : permet d'exécuter la fonction
 - `apply` : permet aussi d'exécuter la fonction
 - `bind` : créé une nouvelle fonction associée à un nouveau contexte

`call` et `apply` ont la même finalité, seul la manière dont les paramètres sont passés changent. On pourrait penser que ces fonctions sont peu utiles, comme dans l'exemple suivant:


``` javascript
function kill(pid, signal){
    if(!signal){
        signal = '9';
    }
    console.log('Running: kill -'+ signal  +  ' ' + pid);
}

//usual way to invoke function
kill(1234, 'TERM');

//invoke the function using it's own method call
kill.call(null, 1234);

//invoke the function using it's own method apply
kill.apply(null, [1234, 'PIPE']);

//stdout: Running: kill -TERM 1234
//stdout: Running: kill -9 1234
//stdout: Running: kill -PIPE 1234

```

Dans ce cas, il n'y a effectivement pas un très grand intérêt, les méthodes `call` et `apply` semblent identiques. La méthode `apply` a pour particularité d'utiliser un tableau pour les paramètres ce qui facilite les exécutions dynamiques de fonction, par exemple :


``` javascript
var fs = require('fs');

//returns an array of files name for a service
function get_logs(service){
    var logDir = '/var/log/' + service + '/';
    var logFiles = fs.readdirSync(logDir);
    if(logFiles && logFiles instanceof Array){
        return logFiles;
    }
    return [];
}

//merge the content of the array of files
function merge(files){
    var merged = '';
    for(var i in files){
        merged += fs.readSync(files[i]);
    }
    console.log(files.length +' files merged');
}

//backup each of the files
function backup(files){
    for(var i in files){
        fs.createReadStream(files[i]).pipe(fs.createWriteStream(files[i] + '.backup'));
    }
    console.log(files.length +' files backed up');
}

//do actions on logs of a service
function doOnLogs(service, action){
    //action is a callback, on which we apply arguments dynamically
    if(typeof action === 'function'){
        action.apply(null, get_logs(service));
    }
}

console.log(get_logs('redis'));

//stdout: ['redis-server.log', redis-server.1.log']


doOnLogs('redis', merge);
doOnLogs('redis', backup);

//stdout: 2 files merged
//stdout: 2 files backed up
```

C'est bon, j'arrête de vous tenir en haleine, maintenant je vais vous parlez du premier paramètre de ces méthodes, car vous vous demandez quel est donc ce paramètre qui a la valeur `null`? Et bien ce paramètre c'est *le contexte de la fonction*, il permet de définir la valeur du mot clé `this` au sein de la fonction.



``` javascript
var cpu = {
    cores : 2,
    vendor : 'Intel',
    ghz : 2.13,
    model : 'Intel(R) Core(TM)2 Duo CPU P7450 @ 2.13GHz',

    isMultiCore : function(){
        return this.cores > 1;
    }
};

console.log(cpu.isMulticore());
//stdout: true

var old_cpu = {
    cores : 1
};

cpu.isMulticore.call(old_cpu);
//stdout: false
```

Dans l'exemple ci-dessus, nous avons modifié le contexte de la fonction. Lors d'un appel de méthode avec l'opérateur `.` classique, le contexte de fonction est celui de l'objet, donc dans `cpu.isMultiCore()`, `this` se rapporte à l'objet `cpu`. Dans le 2nd appel, nous utilisons la méthode `call` pour changer le contexte de la fonction: `this` fera référence à `old_cpu`.

Jusqu'ici tout va bien. On a tous compris (enfin j'espère) que `this` ne se rapporte pas à une instance comme dans d'autres langages mais bien au contexte. Corsons un peu les choses, avec le code suivant:


``` javascript
var cpu = {
    temperature : 65,

    monitorTemperature : function(){
        var monitor = setInterval(function(){
            var temp = this.temperatue;
            if(temp > 180){
                console.log("Fire, fire, please help");
            } else {
                console.log("Temperature at "+ temp + "° is ok");
            }
        }, 1000);

        setTimeout(function(){
            clearInterval(monitor);
        }, 5000);
    }
}
cpu.monitorTemperature();
//stdout: Temperature at undefined° is ok
//stdout: Temperature at undefined° is ok
//stdout: Temperature at undefined° is ok
//stdout: Temperature at undefined° is ok
```

Oh!(Ndt: traduction de  _WTF!_) C'est quoi ce vieux `undefined`? Et bien oui, si vous avez suivis, chaque fonction a un contexte et ce contexte est accessible via le mot clé `this`. De plus, comme le scope porte sur la fonction et que nous déclarons une fonction anonyme comme _callback_ de `setInterval` et bien `this` ne se rapporte plus au contexte de `monitorTemperature` mais à celui de la fonction anonyme.

Mais comment on va s'en sortir? C'est là que les _closures_ vont venir à notre secours. Nous allons garder une référence vers le contexte de la fonction :



``` javascript
var cpu = {
    temperature : 65,

    monitorTemperature : function(){
        var self = this;
        var monitor = setInterval(function(){
            var temp = self.temperatue;
            if(temp > 180){
                console.log("Fire, fire, please help");
            } else {
                console.log("Temperature at "+ temp + "° is ok");
            }
        }, 1000);

        setTimeout(function(){
            clearInterval(monitor);
        }, 5000);
    }
}
cpu.monitorTemperature();
//stdout: Temperature at 65° is ok
//stdout: Temperature at 65° is ok
//stdout: Temperature at 65° is ok
//stdout: Temperature at 65° is ok
```

Et voilà !

Ce même exemple avec une _pseudo classe_, donne cela:


``` javascript
function Cpu(){
    this.cores = 2;
    this.vendor = 'Intel';
    this.ghz = 2.13;
    this.modelName = 'Intel(R) Core(TM)2 Duo CPU P7450 @ 2.13GHz';

    this.isMultiCore = function(){
        return this.cores > 0;
    }
}
var cpu = new Cpu();
console.log(cpu.isMultiCore());
//stdout: true
```

Le mot clé `new` peut être compris comme une sorte d'alias à la méthode `call`. En gros `new Cpu()` revient à faire `Cpu.call({})`, c'est-à-dire à créer un nouvel objet (le `{}`) et à le passer en tant que contexte de fonction.

Une erreur fréquente est d'utiliser `this` au sein d'une fonction en vue de l'utiliser comme une pseudo classe et de l'appeler sans le mot clé `new`. Et là, c'est le drame: `this` va se référer au contexte dans lequel il a été appelé. Prenons l'exemple:


``` javascript
function UnixProcess(){
    this.pid = process.pid;
    console.log(this);
}

var unixProcess = new UnixProcess();
console.log(unixProcess);
//stdout: { pid: 6565 }
```

Si vous exécutez ce code dans la console node.js et qu'ensuite vous lancer `UnixProcess()` (sans le `new`), vous allez retrouvez toutes les variables globales, et oui... de même que si vous lancez `console.log(this)` à l'extérieur d'une fonction.

## Dans la vrai vie

Voici un template d'un plugin jQuery, on se penchant dessus on voit bien l'usage du mot clé `this` qui permet d'accéder au contexte de l'élément jQuery (toujours un tableau d'où les `this.each`) ou de l'objet `Plugin`:


``` javascript
/*
* $('#target').pluginName(options); calls Plugin.init(options)
* $('#target').pluginName('aMethod'); calls public method Plugin.aMethod();
*/
(function( $ ){
    "use strict";

    //default options
    var defaults = {

    };

    var Plugin = {

        //initialisation code
        init: function(options){
            var self = this;
            this.options = $.extend(true, {}, defaults, options);
            return this.each(function() {
                var $elt = $(this);
                $elt.data('pluginName', self.options);

            });
        },

        //a plublic method
        aMethod : function(){
            this.each(function() {
                var $elt = $(this);

            });
        },

        //a private method
        _anotherMethod : function(){

        },

        //destroy code
        destroy : function(){
            this.each(function() {
             var $elt = $(this);

            });
        }
    };

    $.fn.pluginName = function( method ) {
        if ( Plugin[method] ) {
            if(/^_/.test(method)){
                $.error( 'Trying to call a private method ' + method + ' on jQuery.pluginName' );
            } else {
                return Plugin[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
            }
        } else if ( typeof method === 'object' || ! method) {
            return Plugin.init.apply( this, arguments );
        } else {
           $.error( 'Method ' + method + ' does not exist on jQuery.pluginName' );
        }
    };

})( jQuery );
```

## Pour aller plus loin

Je vous conseil de lire ces deux ouvrages écrits par les gourous du JavaScript :

 - [JavaScript The Good Parts](http://www.amazon.fr/JavaScript-The-Good-Parts-ebook/dp/B0026OR2ZY/ref=sr_1_1?ie=UTF8&qid=1378985428&sr=8-1&keywords=javascript+the+good+parts) de Douglas Crockford
 - [Secrets of the JavaScript Ninja](http://www.amazon.fr/Secrets-JavaScript-Ninja-John-Resig/dp/193398869X/ref=sr_1_1?ie=UTF8&qid=1378985699&sr=8-1&keywords=secret+of+the+javascript+ninjas) de John Resig




