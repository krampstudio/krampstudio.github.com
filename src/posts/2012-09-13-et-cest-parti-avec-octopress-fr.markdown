---
layout: post
title: "Et c'est parti avec octopress"
date: 2012-09-13 22:13
comments: true
categories: [Octopress, Github]
---

Voilà c'est fait, cela faisait un petit moment que j'avais cette idée en tête, et deux jours d'arrêt maladie (obligé de rester à la maison parce que contagieux) m'ont permis de prendre quelques heures pour configurer et mettre en ligne ce blog, avec le moteur de génération de blog [Octopress](http://octopress.org).
Quand je dis quelques heures, c'est vraiement le cas. Octopress cible un public de _hackers_ (le slogan étant _A blogging framework for hackers_), c'est à dire :

* sachant manipuler git et [github](http://github.com)
* sachant lancer des commandes de build (rake en l'occurence)
* et sachant éditer feuilles de style CSS, fichiers de configuration YAML et bien entendu des fichiers textes au micro-format Markdown

<!--more-->

Bon, je tiens à vous le dire tout de suite, mieux vaut avoir un système d'exploitation adapté muni d'un Shell de type Bash, Zsh ou autre, sinon il va falloir bidouiller. En effet, Octopress nécessite une version particulière de Ruby qu'il faut gérer grâce à [rbenv](https://github.com/sstephenson/rbenv) (qui permet de créer des environnements Ruby cloisonnés) qui n'est simplement pas fait pour tourner sur un OS comme Windows (ca fonctionne peut être avec cygwin). Dans mon cas ça tombe plutôt bien car je suis sous Linux, mais lorsque j'ai voulu faire un essai au boulot (durant ma pause déjeuné bien sûr), j'ai vite abandonné.

### Pourquoi Octopress?

Mon choix c'est vite porté sur Octopress car la philosophie de l'outils me plaisait bien, notamment pour:

* La bonne intégration avec GitHub et _github-pages_ qui permet de publier des ressources statiques sur Github, et ca tombe bien car Octopress est un générateur de site. Donc pas besoin d'héberger le blog, d'installer de serveur web, etc. tout est dans un dépôt de code GitHub. Bien entendu, comme le contenu n'est pas dynamique, il peut être facilement hébergé par n'importe quel serveur web.
* Le fait d'éditer ses posts au format Markdown. Encore une fois, à force d'écrire des README, de la doc dans mes projets GitHub dans ce micro-format, et bien je m'y suis fait. Et franchement, même s'il est un peu limitatif, je n'ai pas besoin de plus.
* Le théme de base est sympa. Il se customize simplement en éditant les feuilles de style. D'ailleurs, les CSS sont générés grâce depuis le framework [SASS](http://sass-lang.com) qui offre des fonctionnalités qui manquent cruellement aux CSS: variables, mixins, héritage, etc. (ceux qui connaissent [Less](http://lesscss.org/) ne seront pas dépaysés). Octopress utilise aussi [Compass](http://compass-style.org/) qu'il faut plus voir comme une librairie d'utilitaire à SASS qu'une surcouche à la surcouche. Encore une fois je suis en terrain connu, car j'utilise ces deux framework pour un de mes projet perso. 
* Pour enrichir le blog, on peut avoir recours à des plugins. Il y en a déjà quelque-uns très sympa, et comme Octopress se base sur [Jekyll](http://jekyllrb.com/) (le moteur de génération) on peut bénéficier de ses plugins. Sinon, quelques bribes de HTML/CSS/Javascript devraient suffir dans la plupart des cas.
* Pour finir, le tout est codé en Ruby (Ocotpress, Jekyll, SASS, Compass), langage que je n'ai jamais abordé (j'ai juste passé quelques minutes sur [RubyMonk](http://rubymonk.com/), le super sexy online tutoriel) et ça peut être l'occasion de s'y mettre!
* Le code est versionné de base, avec GIT. Les posts étant des fichiers Markdown avec header, la configuration dans des fichiers YAML, il n'y a pas de base de données, donc l'intégralité du blog: la structure et le contenu sont versionnés avec notre gestionnaire de version préféré ;). 

Donc voilà, je pense que dans quelques posts et tunning, je pourrais vous en dire plus, notamment sur les avantages/inconvénients, encore une fois en toute subjectivité.

 

