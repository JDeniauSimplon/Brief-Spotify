"use client"
import styles from './albumdetail.module.scss';
import Link from 'next/link';

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
            <li key={index}>{track.name}</li>
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

         