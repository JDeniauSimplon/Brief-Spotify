# Plateforme de Musique - Projet MVP

## Contexte du Projet

Ce projet est un Minimum Viable Product (MVP) pour une plateforme de musique développée avec React et Next.js.

## Caractéristiques Principales

- Barre de navigation comprenant un champ de recherche.
- Page de recherche affichant des résultats pertinents avec pagination.
- Page de détails affichant des informations sur l'élément sélectionné (artiste, albums, morceaux, etc.).
- Système de favoris permettant à l'utilisateur de créer des playlists et d'ajouter/supprimer des morceaux (à noter que les données ne sont pas persistées et seront effacées à chaque rechargement de la page).

## Fonctionnalités Bonus

- Suggestions d'autres artistes sur la page de détails.
- Possibilité de trier les résultats de recherche par catégories.

## Utilisation de l'API Spotify

Ce projet utilise l'API de Spotify.

Lien vers la documentation de l'API : [Spotify Web API](https://developer.spotify.com/documentation/web-api)

## Spécifications Techniques

- Construire l'interface utilisateur avec des composants réutilisables afin de favoriser la maintenabilité et l'uniformité de l'application.
- Les données sensibles, telles que les clés API, ne doivent pas être versionnées avec Git.

## Développement

Pour exécuter le projet en mode développement sur Linux/Ubuntu, vous devez tout d'abord renseigner vos identifiants de l'API Spotify dans le fichier `.env.local` à la racine du projet (vous pouvez vous référer au fichier `.env.exemple` qui contient les instructions à suivre).

Ensuite, exécutez les commandes suivantes dans votre terminal à la racine du projet :

```bash
npm install

# puis

npm run dev
```

Ouvrez votre navigateur et accédez à http://localhost:3000 pour visualiser le projet.
N'oubliez pas de renseigner vos identifiants Spotify dans le fichier .env.local.