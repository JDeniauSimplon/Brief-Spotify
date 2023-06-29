'use client'

import styles from './artist.module.scss';
import Link from 'next/link';

interface ArtistCardProps {
  imageUrl: string;
  artistName: string;
  artistId: string;
}

const ArtistCard = ({ imageUrl, artistName, artistId }: ArtistCardProps) => {
  return (
    <Link href={`/artist/${artistId}`} className={styles.albumCard}>
      <img src={imageUrl} className={styles.albumImage} />
      <div className={styles.albumInfo}>
        <p className={styles.albumArtist}>{artistName}</p>
        <p>Artiste</p>
      </div>
    </Link>
  );
};

export default ArtistCard;
