'use client'

import styles from './albumcard.module.scss';
import Link from 'next/link';

interface AlbumCardProps {
  title: string;
  imageUrl: string;
  artistName: string;
  albumId: string;
}

const AlbumCard = ({ title, imageUrl, artistName, albumId }: AlbumCardProps) => {
  return (
    <Link href={`/album/${albumId}`} className={styles.albumCard}>
      <img src={imageUrl} alt={title} className={styles.albumImage} />
      <div className={styles.albumInfo}>
        <p className={styles.albumTitle}>{title}</p>
        <p className={styles.albumArtist}>{artistName}</p>
        <p>album</p>
      </div>
    </Link>
  );
};

export default AlbumCard;
