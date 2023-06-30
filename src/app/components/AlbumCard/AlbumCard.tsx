'use client'

import { useState, useEffect, useRef } from 'react';
import styles from './albumcard.module.scss';
import Link from 'next/link';

interface AlbumCardProps {
  title: string;
  imageUrl: string;
  artistName: string;
  albumId: string;
}

const AlbumCard = ({ title, imageUrl, artistName, albumId }: AlbumCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const [isLongTitle, setIsLongTitle] = useState(false);

  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
      setIsLongTitle(titleElement.offsetWidth < titleElement.scrollWidth);
    }
  }, [title]);

  return (
    <Link
      href={`/album/${albumId}`}
      className={`${styles.albumCard} ${isLongTitle && isHovered ? styles.longTitle : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageUrl} alt={title} className={styles.albumImage} />
      <div className={styles.albumInfo}>
        <div className={styles.titleContainer}>
          <p className={`${styles.albumTitle} ${isHovered ? styles.hovered : ''}`} ref={titleRef}>
            {title}
          </p>
        </div>
        <p className={styles.albumArtist}>{artistName}</p>
        <p>album</p>
      </div>
    </Link>
  );
};

export default AlbumCard;
