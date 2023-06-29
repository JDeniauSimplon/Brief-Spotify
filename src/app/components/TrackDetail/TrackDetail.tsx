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

interface LikedTrack {
  name: string;
  artist: string;
  id: string;
  artistImage: string;
  artistsId: string;
}

const handleBackClick = () => {
  window.history.back();
};

const millisToMinutesAndSeconds = (millis: number) => {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds.length === 1) ? '0' : ''}${seconds}`;
};

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
  const [likedTracks, setLikedTracks] = useState<LikedTrack[]>([]);

  useEffect(() => {
    const storedLikes = localStorage.getItem('likedTracks');
    const parsedLikes: LikedTrack[] = storedLikes ? JSON.parse(storedLikes) : [];
    setLikedTracks(parsedLikes);
  }, []);

  const handleLikeClick = () => {
    const isLiked = likedTracks.some(likedTrack => likedTrack.id === trackId);

    let newLikedTracks: LikedTrack[];
    if (isLiked) {
      newLikedTracks = likedTracks.filter(likedTrack => likedTrack.id !== trackId);
    } else {
      newLikedTracks = [...likedTracks, { name: title, artist: artistName, id: trackId, artistImage: artistImageUrl , artistsId: artistId}];
    }

    setLikedTracks(newLikedTracks);
    localStorage.setItem('likedTracks', JSON.stringify(newLikedTracks));
  };

  const isLiked = likedTracks.some(likedTrack => likedTrack.id === trackId);

  return (
    <div className={styles.trackDetail}>
      <div className={styles.trackInfo}>
        <img src={imageUrl} alt={title} className={styles.trackImage} />
        <p>Date de sortie: {releaseDate}</p>
          <div className={styles.trackTitle}>
            <div className={styles.trackLogo}></div>
            <h2>{title}</h2>
            <p>Durée: {millisToMinutesAndSeconds(duration)}</p>
            <div className={styles.artistLink}>
            <Link className={styles.redirectButtons} href={`/artist/${artistId}`}>
              <p className={styles.artistButton}>{artistName}</p>
            </Link>
            <Link className={styles.redirectButtons} href={`/artist/${artistId}`}>
              <img src={artistImageUrl} alt={artistImageTitle} className={styles.artistImage} />
            </Link>
            </div>
            <button onClick={handleLikeClick} className={styles.like} style={{ color: isLiked ? 'red' : 'black' }}>
              {isLiked ? '❤️' : '🤍'}
            </button>
          </div>
        <Link href="" onClick={handleBackClick} className={styles.button} />
      </div>
    </div>
  );
};

export default TrackDetail;
