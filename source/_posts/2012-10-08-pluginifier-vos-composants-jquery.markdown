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
│   ├── jquery
│   │   └── jquery.js
│   ├── jquery-loader.js
│   └── qunit
│       ├── qunit.css
│       └── qunit.js
├── LICENSE-GPL					//licenses
├── LICENSE-MIT
├── package.json				//meta données du projet
├── README.md					
├── removablearea.jquery.json	//meta données du plugin
├── src							//sources du plugin
│   └── removablearea.js
└── test						//tests unitaires
    ├── removablearea.html
    └── removablearea_test.js
</pre>

Nous allons modifier un peu cette structure, en y ajoutant un répertoire <span class="inline-code">sample</span> dans lequel nous allons créer des examples d'utilisation de notre plugin.

## Pluginification

Dans un premier temps, nous allons créer la structure (au sens du typage en programmation) de notre plugin jQuery, en se basant sur les bonnes pratiques détaillée dans la [documentation jQuery](http://docs.jquery.com/Plugins/Authoring "jQuery Plugin AUthoring") à ce propos. Nous allons donc utiliser la structure suivante, comme base de notre fichier <span class="inline-code">src/removablearea.js</span>:

{% gist 3886198 removablearea.js %}

Tout d'abord, on peut remarquer que le code est englobé dans une closure. Cette pratique s'appelle _Immediately-Invoked Function Expression_ (ou _LIFE_). Cette pratique permet d'éviter d'exécuter du code dans le scope global. Dans le cas de jQuery, cet usage permet d'utiliser le symbole dollar en étant sûr qu'il vient de jQuery et non d'un autre framework, le <span class="inline-code">$</span> est mappé à l'objet <span class="inline-code">jQuery</span> :

{% codeblock lang:javascript %}
(function( $ ) {
	//your code
})( jQuery );
{% endcodeblock %}

Un autre point que l'on peut souligner est ce string utilisé à la ligne 2:

{% codeblock lang:javascript %}
	"use strict";
{% endcodeblock %}

La présence de ce string permet de passer le moteur Javascript en mode _strict_, qui le rend moins tolérant à certaines pratiques du langage.

Ensuite la partie qui permet de créer le plugin jQuery peut se résumer à cette ligne:

{% codeblock lang:javascript %}
    $.fn.removableArea = function( method ) { }
{% endcodeblock %}

Littéralement, nous ajoutons à l'attribut <span class='inline-code'>fn</span> de l'objet <code class='inline'>jQuery</code> (ou <code class='inline'>$</code> pour les itimes), la function <code class='inline'>removableArea</code> qui prend en paramètre un nom de méthode. C'est grâce à cette ligne que nous pourrons appeler la fonction <code class='inline'>removableArea</code> sur un élément du DOM, comme <code class='inline'>$('.boo > #far').removableArea(options);</code>.

Ensuite le contnenue de cette fonction va tout simplement déléguer les appels à l'objet <code class='inline'>RemovableArea</code> définit au préalable, en fonction du contexte d'appel:


- <code class='inline'>removableArea</code> est appelé avec un objet en paramètre (les options) on délègue à <code class='inline'>RemovableArea.init(options)</code>.
- <code class='inline'>removableArea</code> est appelé avec un string en paramètre:
  - Ce string correspond à une méthode de <code class='inline'>RemovableArea</code>, alors on délègue, sauf si ce nom commence par un underscore (genre de méthode privée).
- <code class='inline'>removableArea</code> est appelé sans paramètre, on lève une erreur.

Grâce à ce mécanisme de paramètres, nous avons pouvons appeler des méthodes à partir du même plugin: 
{% codeblock lang:javascript %}
    var elt = $('#id').removableArea(options);
    elt.removableArea('destroy');
{% endcodeblock %}

## Refactoring

Maintenant, que nous avons la structure de notre plugin en place, nous allons y intégrer notre code. Pour cela, il faut se poser les questions suivantes:

- Quelles sont les options demander à l'utilisateur et quelles seront les valeurs par défaut ?
- Comment répartir notre code entre la méthode par défaut (<code class='inline'>RemovableArea.init(options)</code>) et d'autres méthodes.
- Quels événements déclencher pour aider à l'implémentation du plugin?

### Les options

Par convention, le paramétrage des plugins se fait en passant un objet contenant les options pour initialiser le plugin. Le code suivant va permettre dans notre exemple d'intialiser notre composant:

{% codeblock lang:javascript %}
$.removableArea({
	label 		: 'Supprimer',
	img 		: '/imgs/delete.png',
	warning 	: 'Voulez-vous supprimer cet élément?',
	hoverClass 	: 'half-opac'
});
{% endcodeblock %}

Pour notre plugin, nous avons donc définis un certain nombre de paramètres, comme l'image qui va servir de _bouton_ qui s'affichera pour supprimer la zone ou les différents labels. On permet aussi de définir la classe CSS qui s'appliquera sur ce _bouton_ au passage de la souris. 
 
### Les paramètres par défaut

Une fois le liste des options définies, il faut leur donner des valeurs par défaut. Cela permet d'éviter de redonner toutes les options à chaque utilisation, et permet surtout de mettre en place un comportement par défaut. L'idée est que le plugin fonctionne tout de suite, mais de laisser la possibilité de le modifier plus tard.

Pour faire cela, nous allons utiliser un méthode de jQuery qui est très utile: <code class='inline'>$.extend</code> qui permet de _merger_ les options passées en paramètres et les options par défaut.

Nous allons donc définir ces paramètres par défaut dans un attribut de notre objet <code class='inline'>RemovableArea</code>, puis les étendre avec les paramètres passés au plugin:

{% codeblock lang:javascript %}
	var RemovableArea = {
        _opts : {
            label : 'Supprimer',
            img : '/imgs/delete.png',
            warning : 'Voulez-vous supprimer cet élément?',
            hoverClass : 'half-opac'
        },
		_init: function(options){
			var opts = $.extend(true, {}, RemovableArea._opts, options);
			//...

		}
	};
{% endcodeblock %}

Grâce au résultat de la méthode <code class='inline'>$.extend</code> la variable <code class='inline'>opts</code> contient les options passées par l'utilisateur ou leur valeur par défaut s'ils ont été omis.

###Le code du plugin

Maintenant, que nous avons une structure à notre plugin, la gestion des paramètres et options, il va falloir répartir le code entre la méthode d'initialisation et d"autres méthodes que nous rajoutons en fonction du fonctionnement souhaité. L'approche que je met souvent en place est de tout faire dans un premier temps dans la méthode d'initialisation et je refactor au fur et à mesure (le problème est qu'il m'arrive de n'avoir jamais le temps de refactorer...). 

Pour notre exemple, nous allons créer les élements du DOM dans la méthode d'initialisation et une méthode <code class='inline'>destroy</code> pour supprime tout ce que le plugin a créé. 

{% gist 4114309 removablearea.js %}


Voilà donc notre plugin créé! On peut aussi noter l'ajout de deux événements : le premier étant déclenché à l'initialisation du plugin et le second lors de la suppression. Le nom des événements est suffixé par _removablearea_, qui est une manière de les grouper dans des [namespaces](http://docs.jquery.com/Namespaced_Events).

## Mise en oeuvre : créer une page d'exemple


