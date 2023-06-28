"use client"

import styles from './trackdetail.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface TrackDetailProps {
  title: string;
  imageUrl: string;
  artistName: string;
  artistId: string;
  releaseDate: string;
  duration: number;
  artistImageUrl: string;
  artistImageTitle: string;
  trackId: string;
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
  artistImageTitle,
  trackId
}) => {
  const [likedTracks, setLikedTracks] = useState([]);

  useEffect(() => {
    const storedLikes = localStorage.getItem('likedTracks');
    const likedTracks = storedLikes ? JSON.parse(storedLikes) : [];
    setLikedTracks(likedTracks);
  }, []);

  const handleLikeClick = () => {
    const isLiked = likedTracks.some(likedTrack => likedTrack.id === trackId);

    let newLikedTracks;
    if (isLiked) {
      // Supprimer la piste de la liste des likes
      newLikedTracks = likedTracks.filter(likedTrack => likedTrack.id !== trackId);
    } else {
      // Ajouter la piste à la liste des likes
      newLikedTracks = [...likedTracks, { name: title, artist: artistName, id: trackId }];
    }

    setLikedTracks(newLikedTracks);
    localStorage.setItem('likedTracks', JSON.stringify(newLikedTracks));
  };

  const isLiked = likedTracks.some(likedTrack => likedTrack.id === trackId);

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
            <Link className={styles.redirectButtons} href={`/artist/${artistId}`}>
              <p className={styles.artistButton}>{artistName}</p>
              <img src={artistImageUrl} alt={artistImageTitle} className={styles.artistImage} />
            </Link>
            <button onClick={handleLikeClick} className={styles.like} style={{ color: isLiked ? 'red' : 'black' }}>
              {isLiked ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
        <Link href="" onClick={handleBackClick} className={styles.button} />
      </div>
    </div>
  );
};

export default TrackDetail;
