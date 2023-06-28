'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.scss';
import Link from 'next/link';

export default function Mylike() {
  const [likedTracks, setLikedTracks] = useState([]);

  useEffect(() => {
    // Récupérer les pistes likées du localStorage
    const tracks = JSON.parse(localStorage.getItem('likedTracks') || '[]');
    setLikedTracks(tracks);
  }, []);

  const handleRemoveClick = (trackId) => {
    // Supprimer la piste de la liste des likes
    const newLikedTracks = likedTracks.filter(track => track.id !== trackId);
    
    // Mettre à jour la liste des likes dans le state et dans le localStorage
    setLikedTracks(newLikedTracks);
    localStorage.setItem('likedTracks', JSON.stringify(newLikedTracks));
  };

  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <p>ICI LES TITRES LIKEES</p>
        <ul>
          {likedTracks.map((track, index) => (
            <li key={index}>
              {/* Utiliser track.name pour le texte et track.id pour le lien */}
              <Link href={`/track/${track.id}`}>{track.name}</Link><Link href='#'> {track.artist}</Link> <img src={track.artistImage} className={styles.artistImage} />
              {/* Ajouter un bouton pour supprimer la piste de la liste des likes */}
              <button onClick={() => handleRemoveClick(track.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
