"use client"

import styles from './artistdetail.module.scss';
import Link from 'next/link';
import AlbumCard from '../AlbumCard/AlbumCard';

interface Album {
  name: string;
  id: string;
  imageUrl: string;
  artistName: string;
}

interface ArtistDetailProps {
  title: string;
  imageUrl: string;
  artistName: string;
  artistGenres: string[];
  similarArtists: { name: string; id: string }[];
  albums: Album[];
}

const handleBackClick = () => {
  window.history.back();
};

const ArtistDetail = ({ title, imageUrl, artistName, artistGenres, similarArtists, albums }: ArtistDetailProps) => (
  <div className={styles.albumDetail}>
    <img src={imageUrl} alt={title} className={styles.albumImage} />
    <div className={styles.albumInfo}>
      <h2>{artistName}</h2> 
      <p>Genres: {artistGenres.join(', ')}</p>
      <h3>Artistes similaires:</h3>
      <ul>
        {similarArtists.map(artist => (
          <li key={artist.id}>
            <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
          </li>
        ))}
      </ul>
      <h3>Albums:</h3>
      <div className={styles.albumCardList}>
        {albums.map(album => (
          <AlbumCard
            key={album.id}
            title={album.name}
            imageUrl={album.imageUrl}
            artistName={album.artistName}
            albumId={album.id} 
          />
        ))}
      </div>
      <Link href="" onClick={handleBackClick} className={styles.button} />
    </div>
  </div>
);

export default ArtistDetail;