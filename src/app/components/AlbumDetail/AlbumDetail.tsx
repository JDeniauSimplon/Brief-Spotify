"use client"

import styles from './albumdetail.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react'; // Ajouter useEffect ici

interface AlbumDetailProps {
  title: string;
  imageUrl: string;
  artistName: string;
  releaseDate: string;
  artistsId: string;
  tracks: Array<{ name: string }>;
  artistImageUrl: string;
  artistImageTitle: string;
}

const handleBackClick = () => {
  window.history.back();
};

const AlbumDetail: React.FC<AlbumDetailProps> = ({
  title,
  imageUrl,
  artistName,
  releaseDate,
  tracks,
  artistsId,
  artistImageUrl,
  artistImageTitle
}) => {

  // Initialisez likedTitles avec un tableau vide
  const [likedTitles, setLikedTitles] = useState([]);

  // Utilisez useEffect pour charger les titres likés du localStorage une fois le composant monté
  useEffect(() => {
    const storedLikes = localStorage.getItem('likedTitles');
    setLikedTitles(storedLikes ? JSON.parse(storedLikes) : []);
  }, []);

  const handleLikeClick = (trackName: string) => {
    if (likedTitles.includes(trackName)) {
      // Supprimer le titre de la liste des likes
      const newLikedTitles = likedTitles.filter(title => title !== trackName);
      setLikedTitles(newLikedTitles);
      localStorage.setItem('likedTitles', JSON.stringify(newLikedTitles));
    } else {
      // Ajouter le titre à la liste des likes
      const newLikedTitles = [...likedTitles, trackName];
      setLikedTitles(newLikedTitles);
      localStorage.setItem('likedTitles', JSON.stringify(newLikedTitles));
    }
  };

  return (
    <div className={styles.albumDetail}>
      <img src={imageUrl} alt={title} className={styles.albumImage} />
      <div className={styles.albumInfo}>
        <div className={styles.albumInformations}>
          <h2 className={styles.albumTitle}>{title}</h2>
          <Link href={`/artist/${artistsId}`} className={styles.albumArtist}>{artistName}</Link>
          <Link href={`/artist/${artistsId}`}><img src={artistImageUrl} alt={artistImageTitle} className={styles.artistImage} /></Link>
        </div>
        <div className={styles.albumTitles}>
          <p className={styles.albumTracks}>Titres:</p>
          <ul>
            {tracks.map((track, index) => (
              <li key={index}>
                {track.name} 
                <button
                  className={styles.like}
                  style={{ color: likedTitles.includes(track.name) ? 'red' : 'black' }}
                  onClick={() => handleLikeClick(track.name)}
                >
                  {likedTitles.includes(track.name) ? '❤️' : '🤍'}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p>Date de sortie: {releaseDate}</p>
        <Link href="" onClick={handleBackClick} className={styles.button}></Link>
      </div>
    </div>
  );
};

export default AlbumDetail;
         