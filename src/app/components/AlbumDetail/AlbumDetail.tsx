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
  tracks: Array<{ name: string, id: string }>;
  artistImageUrl: string;
  artistImageTitle: string;
}

// Définir un type pour les pistes aimées
type LikedTrack = {
  name: string;
  id: string;
  artist: string;
  artistImage: string;
};

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

  // Initialisez likedTracks avec un tableau vide
  const [likedTracks, setLikedTracks] = useState<LikedTrack[]>([]);

  // Utilisez useEffect pour charger les pistes likées du localStorage une fois le composant monté
  useEffect(() => {
    const storedLikes = localStorage.getItem('likedTracks');
    setLikedTracks(storedLikes ? JSON.parse(storedLikes) : []);
  }, []);

  const handleLikeClick = (trackName: string, trackId: string, artistName: string, artistImageUrl: string) => {
    const track: LikedTrack = { name: trackName, id: trackId, artist: artistName, artistImage: artistImageUrl };
    const isLiked = likedTracks.some(likedTrack => likedTrack.id === trackId);

    if (isLiked) {
      // Supprimer la piste de la liste des likes
      const newLikedTracks = likedTracks.filter(likedTrack => likedTrack.id !== trackId);
      setLikedTracks(newLikedTracks);
      localStorage.setItem('likedTracks', JSON.stringify(newLikedTracks));
    } else {
      // Ajouter la piste à la liste des likes
      const newLikedTracks = [...likedTracks, track];
      setLikedTracks(newLikedTracks);
      localStorage.setItem('likedTracks', JSON.stringify(newLikedTracks));
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
                <div className={styles.trackSlot}>
                  <div className={styles.trackLogo}></div>
                  <div className={styles.trackNumber}>{index + 1}</div>
                </div>
                <Link className={styles.titleButton} href={`/track/${track.id}`}>{track.name}</Link>
                <div className={styles.trackSlot}>
                  <p>➕</p>
                  <button className={styles.like} onClick={() => handleLikeClick(track.name, track.id, artistName, artistImageUrl)}>
                    {likedTracks.some(likedTrack => likedTrack.id === track.id) ? '❤️' : '🤍'}
                  </button>
                </div>
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

