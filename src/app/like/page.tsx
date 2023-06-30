'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.scss';
import Link from 'next/link';

interface Track {
  id: string;
  name: string;
  artist: string;
  artistImage: string;
  artistsId: string;
}

const Mylike = () => {
  const [likedTracks, setLikedTracks] = useState<Track[]>([]);

  useEffect(() => {
    // Récupérer les pistes likées du localStorage
    const tracks = JSON.parse(localStorage.getItem('likedTracks') || '[]');
    setLikedTracks(tracks);
  }, []);

  const handleRemoveClick = (trackId: string) => {
    // Supprimer la piste de la liste des likes
    const newLikedTracks = likedTracks.filter((track: Track) => track.id !== trackId);

    // Mettre à jour la liste des likes dans le state et dans le localStorage
    setLikedTracks(newLikedTracks);
    localStorage.setItem('likedTracks', JSON.stringify(newLikedTracks));
  };

  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <span className={styles.fav}>Mes favoris :</span>
        <ul>
        {likedTracks.map((track: Track) => (
  <li key={track.id}>
    <div className={styles.trackLogo}></div>
    <Link className={styles.titleButton} href={`/track/${track.id}`}>{`${track.name}`}</Link>
    <Link className={styles.titleButton} href={`/artist/${track.artistsId}`}>{`${track.artist}`}<img src={track.artistImage} className={styles.artistImage} />
    </Link>
    <button onClick={() => handleRemoveClick(track.id)}>❌</button>
  </li>
))}

        </ul>
      </div>
    </div>
  );
};

export default Mylike;
