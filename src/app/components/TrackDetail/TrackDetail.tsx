"use client"

import styles from './trackdetail.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react'; // importez useState et useEffect

interface TrackDetailProps {
  title: string;
  imageUrl: string;
  artistName: string;
  artistId: string;
  releaseDate: string;
  duration: number;
  artistImageUrl: string;
  artistImageTitle: string;
}

const handleBackClick = () => {
  window.history.back();
};

const millisToMinutesAndSeconds = (millis: number) => {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds.length === 1) ? '0' : ''}${seconds}`;
}

const TrackDetail: React.FC<TrackDetailProps> = ({
  title,
  imageUrl,
  artistName,
  artistId,
  releaseDate,
  duration,
  artistImageUrl,
  artistImageTitle
}) => {
  // Initialisez un nouvel état pour le titre aimé
  const [liked, setLiked] = useState(false);

  // Utilisez useEffect pour charger le statut "liked" du localStorage une fois le composant monté
  useEffect(() => {
    const storedLikes = localStorage.getItem('likedTitles');
    const likedTitles = storedLikes ? JSON.parse(storedLikes) : [];
    setLiked(likedTitles.includes(title)); // Mettre à jour l'état 'liked'
  }, [title]);

  const handleLikeClick = () => {
    const storedLikes = localStorage.getItem('likedTitles');
    let likedTitles = storedLikes ? JSON.parse(storedLikes) : [];
    if (liked) {
      // Supprimer le titre de la liste des likes
      likedTitles = likedTitles.filter(likedTitle => likedTitle !== title);
    } else {
      // Ajouter le titre à la liste des likes
      likedTitles.push(title);
    }
    setLiked(!liked); // Mettre à jour l'état 'liked'
    localStorage.setItem('likedTitles', JSON.stringify(likedTitles));
  };

  return (
    <div className={styles.albumDetail}>
      <div className={styles.albumInfo}>

        <img src={imageUrl} alt={title} className={styles.albumImage} />
        <p>Date de sortie: {releaseDate}</p>
        <div className={styles.albumInformations}>
          <div className={styles.albumTitle}>
            <h2>{title}</h2>  
            <p>Durée:  {millisToMinutesAndSeconds(duration)}</p>
            <p>Artiste:</p>
            <div className={styles.redirectButtons}>
             <Link className={styles.artistButton} href={`/artist/${artistId}`}>
              {artistName}
             </Link>
             <Link href={`/artist/${artistId}`}>
              <img src={artistImageUrl} alt={artistImageTitle} className={styles.artistImage} />
             </Link>
</div>



             <button onClick={handleLikeClick} className={styles.like} style={{ color: liked ? 'red' : 'black' }}>
               {liked ? '❤️' : '🤍'}
             </button>
          </div>
        </div>

        <Link href="" onClick={handleBackClick} className={styles.button} />
      </div>
    </div>
  );
};

export default TrackDetail;

