"use client"
import styles from './albumdetail.module.scss';

interface AlbumDetailProps {
  title: string;
  imageUrl: string;
  artistName: string;
  albumId: string;
}

const AlbumDetail: React.FC<AlbumDetailProps> = ({ title, imageUrl, artistName, albumId }) => {
  return (
    <div className={styles.albumDetail}>
      <img src={imageUrl} alt={title} className={styles.albumImage} />
      <div className={styles.albumInfo}>
        <p className={styles.albumTitle}>{title}</p>
        <p className={styles.albumArtist}>{artistName}</p>
      </div>
    </div>
  );
};

export default AlbumDetail;
