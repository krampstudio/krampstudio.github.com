---
layout: post
title: "Pluginifier vos composants jQuery"
date: 2012-10-08 13:47
comments: true
categories:javascript,jquery 
---

Pluginifier vos composants jQuery
=================================

C'est en développant l'interface d'un de mes projets perso, que je me suis dit: _"Ces composants graphiques que tu fait là, pourquoi ne pas en faire de vrai plugin jQuery, et tout et tout!"_. C'est alors que tout s'enchaine: création d'un dépôt sur Github, recherche des outils, j'ai fait un, puis deux, je présente ça devant mes collègues au travail, et pour finir un petit post en _bonnet du forme_...

Le principe est simple: j'utilise HTML, CSS et la librarie jQuery ainsi que son accolite jQuery-UI pour développer les interfaces graphiques de mes webapps. Au fur et à mesure des développements, je suis passé de tout faire dans le même script (tout imbriqué) à commencer à utiliser les plugins jQuery dans l'application, puis à en faire des projets autonomes.

Dans ce post, je vais essayer de _pluginifier_ pas à pas, un petit composant utilisé pour supprimer graphiquement un élément de l'interface.

## Environnement

En premier lieu, les requis:

* Un système d'exploitation avec un shell de type Bash (Dash, Ksh, Zsh devraient faire l'affaire) pour les autres, il faudra trouver une alternative de type cygwin ou équivalent.
* Git installé (optionnel) mais ca vous permettra d'aller chercher les exemples sur GitHub
* Un éditeur de texte

### Node.js & NPM

>Mais c'est quoi le rapport entre jQuery en Node.js, là je ne comprend plus rien!
En fait, on va en besoin de node.js, pour installer notre système de build. Il y a pas mal de librairies JavaScript en CLI qui utilisent node.js. De plus le système de paquet de node (NPM) étant plutôt pas mal, va faciliter l'installation des ces librairies.
