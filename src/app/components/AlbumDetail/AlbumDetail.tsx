"use client"

import styles from './albumdetail.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface AlbumDetailProps {
  title: string;
  imageUrl: string;
  artistName: string;
  releaseDate: string;
  artistsId: string;
  tracks: Array<{ name: never, id: string }>;
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

  const handleLikeClick = (trackName: never) => {
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
          <p>Date de sortie: {releaseDate}</p>
          <p className={styles.albumTracks}>Titres:</p>
          <ul>
            {tracks.map((track, index) => (
              <li key={index}>
                <Link className={styles.titleButton} href={`/track/${track.id}`}> {track.name} </Link>
                <button className={styles.like} onClick={() => handleLikeClick(track.name)}>
                  {likedTitles.includes(track.name) ? '❤️' : '🤍'}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Link href="" onClick={handleBackClick} className={styles.button}></Link>
      </div>
    </div>
  );
};

export default AlbumDetail;
