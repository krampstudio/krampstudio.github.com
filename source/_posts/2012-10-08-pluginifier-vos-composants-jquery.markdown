---
layout: post
title: "Pluginifier vos composants jQuery"
date: 2012-10-08 13:47
comments: true
categories: javascript,jquery 
---

C'est en développant l'interface d'un de mes projets perso, que je me suis dit: _"Ces composants graphiques que tu fait là, pourquoi ne pas en faire de vrai plugin jQuery, et tout et tout!"_. C'est alors que tout s'enchaine: création d'un dépôt sur Github, recherche des outils, j'ai fait un, puis deux, je présente ça devant mes collègues au travail, et pour finir un petit post en _&quot;bonnet de forme&quot;_...

Le principe est simple: j'utilise HTML, CSS et la librarie jQuery ainsi que son accolite jQuery-UI pour développer les interfaces graphiques de mes webapps. Au fur et à mesure des développements, je suis passé de tout faire dans le même script (tout imbriqué) à commencer à utiliser les plugins jQuery dans l'application, puis à en faire des projets autonomes.

Dans ce post, je vais essayer de _pluginifier_ pas à pas, un petit composant utilisé pour supprimer graphiquement un élément de l'interface.

## Environnement

En premier lieu, les requis:

* Un système d'exploitation avec un shell de type Bash (Dash, Ksh, Zsh devraient faire l'affaire) pour les autres, il faudra trouver une alternative de type cygwin ou équivalent.
* Disposer des droits root/admin sur ce systèmre
* Git installé (optionnel) mais ca vous permettra d'aller chercher les exemples sur GitHub
* Un éditeur de texte

Pour réaliser ce post, j'ai utilisé Ubuntu 12.04, Precise Pangolin.

### Node.js & NPM

>Mais c'est quoi le rapport entre jQuery et Node.js? Là je ne comprend plus rien!

En fait, on va en besoin de [Node.js](http://nodejs.org), pour installer notre système de build. Il y a pas mal de librairies JavaScript en CLI qui utilisent node.js. De plus le système de paquet de node, [npm](http://npmjs.org)  étant plutôt pas mal, va faciliter l'installation des ces librairies. Par ailleurs, quand on développe en JavaScript même pour du dévelopement client, c'est une bonne chose d'avoir node.js d'installé, car on peut profiter de tout un tas d'outils sympa.

Pour installer node.js et npm sous ubuntu:

``` bash
$> sudo aptitude install nodejs npm
```

Pour les autres, vous pouvez vous reporter au site de [node.js](http://nodejs.org/download/)

### Grunt

{% img right images/grunt.png Grunt %}
Une fois la commande npm disponible, il va falloir installer [Grunt](http://gruntjs.com), l'outils que nous utiliserons pour automatiser les tâches de build de notre plugin. Nous allons donc l'installer avec npm, en mode _global_ (donc accessible pour tous les utilisateurs), d'où le commutateur <code class='inline'>g</code>. C'est pourquoi il faut l'installer avec les droits root.

``` bash
$> sudo npm install -g grunt
```

### Phantom.js

{% img right images/phantomjs.png Phantom.js %}
Le dernier outils a installer sur votre système est [Phantom.js](http://phantomjs.org), qui va nous servir pour simuler un browser durant nos tests. Il est aussi disponible depuis le gestionnaire de paquet sur les distributions récentes:

``` bash
$> sudo aptitude install phantomjs
```

ou en le téléchargeant depuis le [site web](http://phantomjs.org/download.html), dans ce cas, ne pas oublier de le rajouter dans le <code class='inline'>PATH</code>.

## Les choses sérieuses

Voici un exemple de code intégré à un script d'une application:

{% gist 3854836 dynamic-removable-list.js %}
