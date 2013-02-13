---
layout: post
title: "L'effet Github"
date: 2013-02-13 22:33
comments: true
categories: git, web
---

J'ai créé mon [compte Github](https://github.com/krampstudio) le 5 novembre 2010. Ce que je cherchais seulement un hébergement pour mes dépôts GIT, voire une sorte de Sourforge. Après avoir été initié à GIT en 2008, je souhaitais juste pouvoir _backuper_ mes dépôts locaux et y accéder de partout. Je précise les dates, car à ce moment, je n'avais pas la moindre idée de ce qu'est vraiement Github et surtout de l'impact que ce service peut avoir sur le développement au quotidien.

Effectivement, c'est beaucoup plus tard que je me suis rendu compte du côté _social_ de Github: la facilité déconcertante avec laquelle on peut contribuer à un projet. Pas besoin de s'inscrire à une mailing list, de lire le manuel du contributeur pour soumettre un patch. Avec Github, le _fork_ et le _pull request_  encouragent grandement à la contribution. Un bug, une fonctionalité manquante à un projet, je fork et je modifie. Je souhaite reverser mes modifications à l'auteur je pull request. L'open source comme on l'avait rêvé. Il y a tout de même un question que je me pose fréquement: certains dépôts n'ont pas de licences, et dans ce cas, bien que le dépôt soit public, a-t-ont le droit de forker, de modifier et donc de redistribuer (je parle des dépôts publics) ? 

Aujourd'hui Github comme plusieurs millions d'utilisateurs et de dépôts! Le tout web utilise Github et bien plus. 

== Dé Re centralier

J'ai lu des postes de personnes se plaigant des récentes coupures du service. A priori, je me suis dit, quel est le problème? On peut travailler sur notre dépôt local et pousser dès le service est up à nouveau, au pire on ne peut pas mettre à jour ses issues. C'est le principe d'un outils décentralisé. Mais dernièrement, j'ai commencé à utiliser des services construits autout de Github: NPM pour les paquets node.js et Bower pour les dépendances Javascript clientes. NPM a son propre serveur de paquets, mais il est possible de faire pointer une dépendance directement sur un dépôt Github. Bower, lui, utilise Github comme source pour télécharger les dépendances, et là dès que Github est en maintenance, impossible d'installer la moindre dépendance. 
