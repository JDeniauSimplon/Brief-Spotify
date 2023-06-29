import styles from './page.module.scss';
import AlbumCard from './components/AlbumCard/AlbumCard';
import fetchSpotifyApi from './spotifyAPI';

interface Album {
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
  id: string;
}

const Home = async () => {
  const newReleases = await fetchSpotifyApi('browse/new-releases?country=FR&limit=50');

  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
      <h2 className={styles.sectionTitle}>Nouveautés</h2>
        <div className={styles.cards}>
          {newReleases?.albums.items.map((album: Album) => (
            <AlbumCard
              title={album.name}
              imageUrl={album.images[0].url}
              artistName={album.artists[0].name}
              albumId={album.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
