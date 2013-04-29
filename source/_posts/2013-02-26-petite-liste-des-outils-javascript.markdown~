---
layout: post
title: "Petite liste des outils JavaScript"
date: 2013-02-26 22:30
comments: true
categories: javascript, tools
---

Javascript est devenu un langage à la mode. Une profusion d'outils et de librairies fleurissent chaque jour. Lorsqu'on commence un nouveau dev, plusieurs possibilités s'offrent à nous pour composer notre stack côté client (et je ne parle pas du javascript côté serveur). Le but de ce post est de lister un certain nombre d'outils permettant de créer cette pile de librairies. 

Cette liste n'est pas exhaustive, car elle se base tout d'abord sur les outils que j'utilise, ai utilisé ou envie d'utiliser. Bien que Le nombre de librairies JavaScript de bonne qualité croit de jour en jour et qu'il est difficile de suivre cette frénésie, j'essairai de mettre à jour cette liste au fil de l'eau... N'hésitez pas à m'aider à la compléter.

<!-- more -->

## <a name="node"></a>node.js et npm

{% img right /images/tools/nodejs.png node.js %}

Node.js est une implémentation javascript côté serveur. node.js utilise v8, le moteur javascript de Chromium/Chrome, et fournit des API de développement réseau basé sur un modèle de programmation événementiel et des IO non bloquante. 

Npm (_Node Package Manager_) est le gestionnaire de paquets pour node.js. 

{% img right /images/tools/npm.png npm %}

Même dans le cadre de développement client, avoir node.js vous permettra d'avoir à disposition beaucoup d'outils facilement (build, qualité, instrumentation, optimisation, etc.). Grâce à npm, vous pourrez les installer et les mettre à jour très facilement. Par exemple, pour installer l'outils _uglify_ (qui permet notamment de minimifier les fichiers js), il suffira de faire un petit `npm install -g uglify`. 

> On ne peut s'en passer

Sites webs : [nodejs.org](http://nodejs.org) [npmjs.org](https://npmjs.org)

Licence : MIT

## <a name="jquery"></a>jQuery

{% img right /images/tools/jquery.png jquery %}

Est-il encore besoin de présenter jQuery? Au cas où vous sortez d'une longue hibernation, jQuery est le framework Javascript permettant de s'affranchir des différences entre naviguateurs. Cette librairie de bas niveau permet notamment de récupérer des éléments du DOM en fonction de requêtes CSS (d'ailleurs cette seule fonctionnalité, extrêment puissante a été externalisé dans un moteur à part: Sizzle), de manipuler le DOM et ces événements, de faire des requêtes Ajax. JQuery fournit aussi tout un tas d'outils qui facilite la vie du développeur Javascript. 

> Cette librairie est légère et largement répandue. Le slogan du projet  "_write less do more_" reflète bien ce qu'apporte ce framework. Ceux qui ont eu a manipuler le DOM sans ce genre de librairie peuvent évaluer jQuery à sa juste valeur.

Sites web : [jquery.com](http://jquery.com)

Licence : MIT

## <a name="sizzle"></a> Sizzle

{% img right /images/tools/sizzle.png Sizzle %}

Sizzle est un projet qui a pour but de permettre de sélectionner un noeud du DOM en utilisant les sélecteurs CSS3. Sizzle est le moteur utilisé au sein de jQuery pour la partie sélection. 

> Sizzle est très utile dès lors que l'on souhaite faire des manipulations complexes (on peut facilement créer ses propres sélecteurs) ainsi que dans le cas où vous n'utilisez que la partie sélection de jQuery, cela vous permettra de n'inclure que l'essentiel notamment dans le cadre d'une librairie.

Site web : [sizzlejs.com](http://sizzlejs.com)

Licence : MIT

## <a name="jqueryui"></a>jQuery UI

{% img right /images/tools/jquery-ui.png jQuery UI %}

jQuery UI est, comme son nom l'indique, une surcouche à jQuery dédiée aux composants graphiques. Cette librairie offre quelques composants prêt à l'emploi comme les sliders, les tabulations, date-pickers, etc. ainsi que des éléments plus basique pouvant servir à créer ses propres composantes comme les effets, le drag n'drop, la gestion des positions, etc. 
jQuery UI utilise des thèmes pour son composants, facilement customisables grâce à son édtieur de thème en ligne: le _theme roller_.

> jQuery UI est une librairie de très bonne qualité et dont il faut embrasser la philosophie: utiliser ses composants comme des briques de bases pour votre UI, elle n'a pas vocation a proposer une pléthore de composants de haut niveau comme le fait exemple ExtJS.

Site web : [jqueryui.com](http://jqueryui.com)

Licence : MIT

## <a name="qunit"></a>QUnit

{% img right /images/tools/qunit.png QUnit %}

QUnit est un framework de tests unitaires JavaScript orienté client. Bien que développé initialement pour tester les différents projets de jQuery, c'est un framework de test généraliste facile à utiliser et qui s'adapte bien eux tests de code client. Il propose les fonctionnalités de bases comme les assertions, le regroupement des tests anisi que des fonctionnalités plus avancées comme les tests asynchrones ou les fixtures (une sorte de mock HTML qui permet de réaliser le test avec des éléments externes du DOM dont il dépend).

> QUnit est simple, efficace et rapide à mettre en oeuvre. 

Site web : [qunitjs.com](http://qunitjs.com)

Licence : MIT

## <a name="jquerymobile"></a>jQuery Mobile

{% img right /images/tools/jquery-mobile.png jQuery Mobile %}

jQuery Mobile est un framework d'interface graphique orienté mobile. Il propose une solution complète de création d'une interface web adaptée aux appareils mobiles (smartphones et tablettes). Cette librairie ne nécessite que peu de code JavaScript et utilise plutôt une sémantique HTML5 qui permettra de définir les éléments d'interface. 

> jQuery Mobile est une des solutions mobile pour le web les plus facile à mettre en place. A noter tout de même des difficultés dès lors que l'on souhaite sortir du cadre définit.

Site web : [jquerymobile.com](http://jquerymobile.com)

Licence : MIT

## Choisir son moteur de template Javascript

Ce [site](http://garann.github.com/template-chooser/) plutôt sympa permet de choisir son moteur de _gabaris_ en JavaScript.


## <a name="grunt"></a>Grunt

{% img right /images/tools/grunt.png grunt %}

Grunt se définit comme un _task runner_, c'est donc un outils de _build_ au sens large qui vous permettra d'automatiser un certain nombre de tâches comme la minimification des fichiers, l'orchestration des tests ou la génération de la documentation. Chaque tâche se présente sous la forme d'un plugin et il est très facile de créer ces propres tâches bien qu'il en existe déjà un nombre important. Grunt est distribué sous la forme de packages [node.js](#node).

> Grunt est vraiement un beau projet, bien pensé, bien codé et facile à étendre. C'est l'outils de build que j'utilise sur mes projets. 

> &lt;pub&gt;De plus, le [plugin jsdoc](https://npmjs.org/package/grunt-jsdoc) est super (et a été assez facile à réaliser car les APIs sont complètes et bien documentées).&lt;/pub&gt;

Site web : [gruntjs.com](http://gruntjs.com)

Licence : MIT

## <a name="yeoman"></a>Yeoman

{% img right /images/tools/yeoman.png yeoman %}

Yeoman est au Javascript ce que Maven est à Java: c'est une outils de gestion du cycle de vie de l'application. Il se compose de 3 outils différents et complémentaires:

 * *yo* un outils de _scaffolding_, il permet de générer des structures pour de nouvelles applications, de créer de composants pour de nombreux framework, etc.
 * [bower](#bower) qu'il utilise en interne pour la gestion des dépendances
 * [grunt](#grunt) qu'il intègre aussi pour l'automatisation des tâches et le build
 
Site web : [yeoman.io](http://yeoman.io)

Licence : BSD

## Jake

Make, Rake et ... Jake c'est l'autre outils de build, d'automatisation de tâches. Il est axé sur la customisation des tâches pour votre projet, d'ailleur il faudra mettre la main à la patte et programmer vos tâches. Cet outils se présente sous la forme d'un module [node.js](#node) et s'utilise autant pour un projet node qu'un projet browser.

Site web: [mde/jake](https://github.com/mde/jake)

Licence : Apache version 2.0

## <a name="bower"></a> Bower

{% img right /images/tools/bower.png bower %}

Bower est un outils de gestion de composants et de dépendances orienté navigateur. Les packages sont ni plus ni moins que des projets Github, car Bower se base uniquement sur Github comme dépôt de packages. Cela offre tous les avantages de la plateforme : fork, clone, etc. et aussi les inconvénients : la qualité de service dépend directement de la disponibilité de Github . Les paquets ou composants ne se limitent pas à Javascript mais peuvent contenir n'importe quel type de resource web: html, css, etc.

L'outils est simple à utiliser et résoud les problématiques de gestion des librairies browser. Plus d'excuse pour ne pas mettre à jour une librairie et ses plugins...

> A mon sens, Bower manque encore un peu de maturité. Néanmoins, le projet est promis à un bel avenir, à utiliser sans modération! 

Site web: [bower.io](http://bower.io)

Licence : MIT

## <a name="jslint"></a> JSLint

{% img right /images/tools/jslint.png jslint %}

JSLint est un analyseur de code statique, c'est un outils qui permet de vérifier la qualité du code source Javascript. JSLint va vérifier la conformité des sources avec des conventions de codes basée sur des bonnes pratiques de programmation, comme l'obligation de mettre des points virgules à la fin des lignes, l'utilisation de l'opérateur de vérité, la vérification des scopes, des variables globales, etc.
JSLint est déjà très répandu et il y a surement un plugin pour votre éditeur/IDE JavaScript favori ou votre système de build/qualité.

> Parfois considéré comme trop strict, JSLint est néanmoins un outils esstentiel car il permet de développer en évitant pièges du JavaScript, et de n'utiliser que _the good parts_^(\*)

__\*__ _<u>JavaScript, The Good Parts, Douglas Crockford, O'Reilly, 2008</u>_ est un ouvrage de référence du language JavaScript, son auteur est aussi le développeur dérrière JSLint. La lecture de ce livre vous permettra souvent de mieux comprendre l'utilisation de certaines règles JSLint.

Site web : [jslint.com](http://jslint.com)

Licence : MIT?_

## <a name="jshint"></a>JSHint

{% img right /images/tools/jshint.png jshint %}

JSHint est un fork de JSLint avec pour but de rendre ce dernier plus configurable. Il permet d'autoriser certaines pratiques ou d'autres styles de programmation que celui défini par JSLint. 
Une des fonctionnalité intéressante de JSHint sont les profiles, qui adaptent la vérification en fonction du contexte ou du framework utilisé (browser, jQuery, node, etc.)

> JSHint est un bon compromis sur un code JavaScript existant et n'ayant pas été développé avec les bonnes pratiques telles que définies par Douglas CrockFord.

Site web : [jshint.com](http://jshint.com)

Licence : MIT

## <a name="jasmine"></a>Jasmine

{% img right /images/tools/jasmine.png Jasmine %}

Jasmine est une librairie de tests intégrant les principes du _BDD_ (_Behavior Driven Developement_), elle ne dépend d'aucune autre librairies et peut être utilisé aussi bien pour tester un contexte client que serveur (node) et s'intègre avec de nombreuses plateformes.

> Jasmine est un des framework de test de référence en JavaScript.

Site web : [pivotal.github.io/jasmine](http://pivotal.github.io/jasmine/)

Licence : MIT

## Phantom.js

{% img right /images/tools/phantomjs.png Phantom.js %}

Phantom.js est un des outils qu'il est nécessaire d'installer sur sa machine. Cette librarie est un naviguateur WebKit sans interface grapĥique. Phantom.js permet notamment de faire tourner des tests JavaScript clients depuis un terminal, sur un serveur et surtout de lancer des suites de tests sans dépendre d'un navigueteur classique. Phantom.js expose une API et est donc scriptable.

> Incontournable si vous utilisez un outils de build.

Site web : [phantomjs.org](http://phantomjs.org/)

Licence : BSD

## <a name="modernizr"></a>Modernizr

{% img right /images/tools/modernizr.png Modernizr %}

Modernizr est une librairie de détection de fonctionnalités HTML5 et CSS3. Elle permet donc de connaître pour le navigauteur courant si une des fonctionnalité est présente ou non, car comme nous le savons tous, la détection par type de naviguateur est à proscrire. 

> Cet outils doit être utilisé dès que l'on souhaite faire du HTML5 et/ou CSS3. 

Site web : [modernizr.com](http://modernizr.com/)

Licence : MIT

## <a name="underscore"></a>Underscore.js

{% img right /images/tools/underscore.png underscore.js %}

Underscore.js est un framework généraliste qui augmente le langage avec un certain nombre d'utilitaires fait pour vous faciliter la vie. Il est difficile de syntétiser son contenu car très hétéroclite, il permet autant de faire du map/reduce sur des collections que de la memoization de function. Underscore va simplement vous éviter de réécrire pas mal de functions qui ne sont pas incluses dans le langage. 

> Underscore est au \_  ce que jQuery est au $

Site web: [underscorejs.org](http://underscorejs.org/)

Licence : MIT

## <a name="requirejs"></a>Require.js

{% img right /images/tools/require-js.png require.js %}

Require.js est une librairie qui permet de pallier à une lacune du langage JavaScript: la gestion des librairies, des dépendances et des imports. Pour cela, Require.js implémente la spécification [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) (Asynchronous Module Definition) et est aussi compatible [CommonJs](http://www.commonjs.org/). Grâce à Require.js, vous pouvez définir des _modules_ et importer ces modules depuis d'autres modules. La notion de dépendance entre module est gérée et le chargement peut se faire ne mode synchrone ou asynchrone (le module est chargé au moment où il est importé). 

> Require.js vous offre un système aussi puissant que ceux présents dans d'autres languages. Il est optimisable, et s'intègre facilement avec de nombreuses librairies.

Site web: [requirejs.org](http://requirejs.org/)

Licence : BSD

## jsdoc

## uglify

## jsbeautifier

## Prototype.js

## Testacular

## Chart.js

## Raphael.js




