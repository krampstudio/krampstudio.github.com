---
layout: post
title: "Petite liste des outils JavaScript"
date: 2013-02-26 22:30
comments: true
categories: javascript, tools
---

Javascript est devenu un langage à la mode. Une profusion d'outils et de librairies fleurissent chaque jour. Lorsqu'on commence un nouveau dev, plusieurs possibilités s'offrent à nous pour composer notre stack côté client (et je ne parle pas du javascript côté serveur). Le but de ce post est de lister un certain nombre d'outils permettant de créer cette pile de librairies. 

Cette liste n'est pas exhaustive et sera mise à jour au fil de l'eau... N'hésitez pas à m'aider à la compléter.

<!-- more -->

## <a href="node"></a> node.js et npm

{% img right /images/tools/nodejs.png node.js %}

Node.js est une implémentation javascript côté serveur. node.js utilise v8, le moteur javascript de Chromium/Chrome, et fournit des API de développement réseau basé sur un modèle de programmation événementiel et des IO non bloquante. 

Npm (_Node Package Manager_) est le gestionnaire de paquets pour node.js. 

{% img right /images/tools/npm.png npm %}

Même dans le cadre de développement client, avoir node.js vous permettra d'avoir à disposition beaucoup d'outils facilement (build, qualité, instrumentation, optimisation, etc.). Grâce à npm, vous pourrez les installer et les mettre à jour très facilement. Par exemple, pour installer l'outils _uglify_ (qui permet notamment de minimifier les fichiers js), il suffira de faire un petit `npm install -g uglify`. 

> On ne peut s'en passer

Sites webs : [nodejs.org](http://nodejs.org) [npmjs.org](https://npmjs.org)

## jQuery

{% img right /images/tools/jquery.png jquery %}

Est-il encore besoin de présenter jQuery? Au cas où vous sortez d'une longue hibernation, jQuery est le framework Javascript permettant de s'affranchir des différences entre naviguateurs. Cette librairie de bas niveau permet notamment de récupérer des éléments du DOM en fonction de requêtes CSS (d'ailleurs cette seule fonctionnalité, extrêment puissante a été externalisé dans un moteur à part: Sizzle), de manipuler le DOM et ces événements, de faire des requêtes Ajax. JQuery fournit aussi tout un tas d'outils qui facilite la vie du développeur Javascript. 

> Cette librairie est légère et largement répandue. Le slogan du projet  _write less do more_ reflète bien ce qu'apporte ce framework. Ceux qui ont eu a manipuler le DOM sans ce genre de librairie peuvent évaluer jQuery à sa juste valeur.

Sites web : [jquery.com](http://jquery.com)

## Choisir son moteur de template Javascript

Ce [site](http://garann.github.com/template-chooser/) plutôt sympa permet de choisir son moteur de _gabaris_ en JavaScript.


## Grunt

{% img right /images/tools/grunt.png grunt %}

Grunt se définit comme un _task runner_, c'est donc un outils de _build_ au sens large qui vous permettra d'automatiser un certain nombre de tâches comme la minimification des fichiers, l'orchestration des tests ou la génération de la documentation. Chaque tâche se présente sous la forme d'un plugin et il est très facile de créer ces propres tâches bien qu'il en existe déjà un nombre important. Grunt est distribué sous la forme de packages [node.js](#node).

> Grunt est vraiement un beau projet, bien pensé, bien codé et facile à étendre. C'est l'outils de build que j'utilise sur mes projets. 

> &lt;pub&gt;De plus, le [plugin jsdoc](https://npmjs.org/package/grunt-jsdoc) est super (et a été assez facile à réaliser car les APIs sont complètes et bien documentées).&lt;/pub&gt;

Sites web : [gruntjs.com](http://gruntjs.com)

## Yeoman

{% img right /images/tools/yeoman.png yeoman %}

Yeoman est au Javascript ce que Maven est à Java: c'est une outils de gestion du cycle de vie de l'application. Il se compose de 3 outils différents et complémentaires:

 * *yo* un outils de _scaffolding_, il permet de générer des structures pour de nouvelles applications, de créer de composants pour de nombreux framework, etc.
 * *bower* pour la gestion des dépendances
 * *grunt* pour l'automatisation des tâches et le build



## Jake

## Bower

## JSLint

## JSHint

## QUnit

## Jasmine

## Phantom.js

## jQuery UI

## ExtJS

## Modernizr

## Underscore.js

{% img right /images/tools/underscore.png underscore.js %}

Underscore.js est un framework généraliste qui augmente le langage avec un certain nombre d'utilitaires fait pour vous faciliter la vie. Il est difficile de syntétiser son contenu car très hétéroclite, il permet autant de faire du map/reduce sur des collections que de la memoization de function. Underscore va simplement vous éviter de réécrire pas mal de functions qui ne sont pas incluses dans le langage. 

> Underscore est au _  ce que jQuery est au $

## Backbone

## Angular.js

## Require.js

## jsdoc

## uglify

## jsbeautifier

## Prototype.js

## Sizzler
