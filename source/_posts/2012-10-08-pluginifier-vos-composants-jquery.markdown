---
layout: post
title: "Pluginifier vos composants jQuery"
date: 2012-10-08 13:47
comments: true
categories: javascript,jquery 
---

C'est en développant l'interface d'un de mes projets perso, que je me suis dit: _"Ces composants graphiques que tu fait là, pourquoi ne pas en faire de vrai plugin jQuery, et tout et tout!"_. C'est alors que tout s'enchaîne: création d'un dépôt sur Github, recherche des outils, j'ai fait un, puis deux, je présente ça devant mes collègues au travail, et pour finir un petit post en _&quot;bonnet de forme&quot;_...

Le principe est simple: j'utilise HTML, CSS et la librairie jQuery ainsi que son acolyte jQuery-UI pour développer les interfaces graphiques de mes webapps. Au fur et à mesure	 des développements, je suis passé de tout faire dans le même script (tout imbriqué) à commencer à utiliser les plugins jQuery dans l'application, puis à en faire des projets autonomes.

Dans ce post, je vais essayer de _pluginifier_ pas à pas, un petit composant utilisé pour supprimer graphiquement un élément de l'interface.

<!-- more -->

## Environnement

En premier lieu, les requis:

* Un système d'exploitation avec un shell de type Bash (Dash, Ksh, Zsh devraient faire l'affaire) pour les autres, il faudra trouver une alternative de type cygwin ou équivalent.
* Disposer des droits root/admin sur ce système
* Git installé (optionnel) mais ca vous permettra d'aller chercher les exemples sur GitHub
* Un éditeur de texte

Pour réaliser ce post, j'ai utilisé Ubuntu 12.04, Precise Pangolin.

### Node.js & NPM

>Mais c'est quoi le rapport entre jQuery et Node.js? Là je ne comprend plus rien!

En fait, on va en besoin de [Node.js](http://nodejs.org), pour installer notre système de build. Il y a pas mal de librairies JavaScript en CLI qui utilisent node.js. De plus le système de paquet de node, [npm](http://npmjs.org)  étant plutôt pas mal, va faciliter l'installation des ces librairies. Par ailleurs, quand on développe en JavaScript même pour du développement client, c'est une bonne chose d'avoir node.js d'installé, car on peut profiter de tout un tas d'outils sympa.

Pour installer node.js et npm sous ubuntu:

``` bash
$> sudo aptitude install nodejs npm
```

Pour les autres, vous pouvez vous reporter au site de [node.js](http://nodejs.org/download/)

### Grunt

{% img right /images/grunt.png Grunt %}
Une fois la commande npm disponible, il va falloir installer [Grunt](http://gruntjs.com), l'outils que nous utiliserons pour automatiser les tâches de build de notre plugin. Nous allons donc l'installer avec npm, en mode _global_ (donc accessible pour tous les utilisateurs), d'où le commutateur <code class='inline'>g</code>. C'est pourquoi il faut l'installer avec les droits root.

``` bash
$> sudo npm install -g grunt
```

### Phantom.js

{% img right /images/phantomjs.png Phantom.js %}
Le dernier outils a installer sur votre système est [Phantom.js](http://phantomjs.org), qui va nous servir pour simuler un browser durant nos tests. Il est aussi disponible depuis le gestionnaire de paquet sur les distributions récentes:

``` bash
$> sudo aptitude install phantomjs
```

ou en le téléchargeant depuis le [site web](http://phantomjs.org/download.html), dans ce cas, ne pas oublier de le rajouter dans le <code class='inline'>PATH</code>.

## Les choses sérieuses

Voici un exemple de code intégré à un script d'une application:

{% gist 3854836 dynamic-removable-list.js %}

Cet exemple est utilisé pour créer une liste HTML en fonction du résultat d'une requête ajax. Chaque item de la liste doit pouvoir être supprimé par la suite. C'est ce point qui nous intéresse, car nous voulons pouvoir appliquer ce composant de suppression à d'autres parties de notre interface graphique. 

Nous allons procéder en suivant ces étapes:

1. Trouver un nom au plugin
2. Générer une structure, un archétype pour notre plugin
3. Refactorer notre code au sein d'un plugin
4. Créer une page d'exemple dédié
5. Créer un test unitaire
6. Définir notre séquence de build
7. Le déployer sur GitHub et sur le site des plugin jQuery

## Trouver un nom qui déchire

Alors, voici pour moi ma bête noire de la programmation: trouver des noms aux variables, classes, projets! Je n'ai pas ce côté inventif qui va permettre de trouver le nom super cool, donc je reste très terre à terre. Notre plugin
s'appelera *RemoveableArea*! super... :-(. Si quelqu'un à une meilleure idée, je suis preneur.

> Ca c'est fait.

## Générer la structure du projet

L'avantage d'utiliser des outils tels que Grunt c'est qu'ils font une part de notre travail, donc quand on est fainéant, on ne peut plus s'en passer. 
Grunt dispose d'une tâche _init_ qui permet de générer une structure de projet type en partant d'un template. Et ça tombe bien, il y en a un pour jQuery.

Dans l'ordre, on va:
1. Créer un répertoire pour notre plugin.
2. Le versionner avec GIT.
3. Générer la structure de base.

{% codeblock lang:bash %}
$ mkdir removablearea
$ cd removablearea
$ git init
Initialized empty Git repository in /home/bertrand/dev/workspace/removablearea/.git/
$ grunt init:jquery
#answer the questions about the plugin
#...
Initialized from template "jquery".
Done, without errors.
$ git add -A
$ git commit -m "Create base plugin"
{% endcodeblock %}

Voilà, maintenant, notre stucture est générée, le projet est versionné avec GIT, et si vous avez renseigné soigneusement les questions demandées par Grunt, alors un certain nombre de sections sont déjà préremplies.

Normalement, vous devriez avoir l'arborescence suivante:
<pre>
.
├── grunt.js					//fichier de build
├── libs						//librairies externes
│   ├── jquery
│   │   └── jquery.js
│   ├── jquery-loader.js
│   └── qunit
│       ├── qunit.css
│       └── qunit.js
├── LICENSE-GPL					//licenses
├── LICENSE-MIT
├── package.json				//meta données du projet
├── README.md					
├── removablearea.jquery.json	//meta données du plugin
├── src							//sources du plugin
│   └── removablearea.js
└── test						//tests unitaires
    ├── removablearea.html
    └── removablearea_test.js
</pre>

Nous allons modifier un peu cette structure, en y ajoutant un répertoire <span class="inline-code">sample</span> dans lequel nous allons créer des examples d'utilisation de notre plugin.

## Pluginification


