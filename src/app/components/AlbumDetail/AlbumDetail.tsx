"use client"
import styles from './albumdetail.module.scss';

interface AlbumDetailProps {
  title: string;
  imageUrl: string;
  artistName: string;
  albumId: string;
  releaseDate: string;
  tracks: Array<{ name: string }>;
}


const AlbumDetail: React.FC<AlbumDetailProps> = ({
  title,
  imageUrl,
  artistName,
  albumId,
  releaseDate,
  tracks
}) => {
  return (
    <div className={styles.albumDetail}>
      <img src={imageUrl} alt={title} className={styles.albumImage} />
      <div className={styles.albumInfo}>
        <div className={styles.albumInformations}>
        <h2 className={styles.albumTitle}>{title}</h2>
        <p className={styles.albumArtist}>Artiste : {artistName}</p>
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
      </div>
    </div>
  );
};

export default AlbumDetail;
