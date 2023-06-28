# 🎵 Plateforme de Musique - Projet MVP (Produit Minimum Viable) 🎧

## 🌟 Introduction

Ce projet est un MVP (Produit Minimum Viable) d'une plateforme de musique en ligne. Il a été développé en utilisant React et Next.js. L'objectif est de présenter une version simplifiée de la plateforme avec des fonctionnalités de base, pour évaluer son potentiel et recueillir des retours. 🚀

## 📑 Fonctionnalités Principales

- **🔍 Barre de Navigation**: Inclut un champ de recherche pour trouver des artistes, albums, morceaux, etc.
- **📄 Page de Recherche**: Affiche des résultats de recherche avec pagination pour faciliter la navigation.
- **ℹ️ Page de Détails**: Présente des informations détaillées sur l'élément sélectionné (e.g., artiste, album, morceau).
- **❤️ Favoris**: Permet aux utilisateurs de créer des playlists et d'ajouter/supprimer des morceaux. Notez que ce système n'est pas persistant; les données seront perdues au rechargement de la page.

## 🎁 Fonctionnalités Supplémentaires

- **💡 Suggestions**: Sur la page de détails d'un artiste, des suggestions d'autres artistes sont affichées.
- **🔢 Triage des Résultats**: Possibilité de trier les résultats de recherche par différentes catégories.

## 🎵 Intégration de l'API Spotify

Ce projet intègre l'API de Spotify pour récupérer des données sur la musique.

- 📚 Lien vers la documentation de l'API: [Spotify Web API](https://developer.spotify.com/documentation/web-api)

## 🔧 Spécifications Techniques

- **♻️ Composants Réutilisables**: L'interface utilisateur est construite à l'aide de composants réutilisables pour faciliter la maintenance et assurer la cohérence de l'application.
- **🔐 Sécurité des Données**: Les données sensibles, comme les clés de l'API, ne sont pas versionnées avec Git et doivent être stockées de manière sécurisée.

## 🛠️ Instructions pour le Développement

Pour exécuter le projet en mode développement sur Linux/Ubuntu, suivez les étapes ci-dessous:

1. 📂 Clonez le dépôt git sur votre machine locale.
2. 📝 Créez un fichier `.env.local` à la racine du projet et renseignez vos identifiants de l'API Spotify (reportez-vous au fichier `.env.exemple` pour les instructions).
3. 🖥️ Ouvrez un terminal à la racine du projet et exécutez les commandes suivantes:

```bash
npm install

# puis

npm run dev
```

1. 🌐 Ouvrez votre navigateur web et accédez à http://localhost:3000 pour visualiser l'application en mode développement.
2. ✅ Assurez-vous que vos identifiants Spotify sont correctement renseignés dans le fichier .env.local.