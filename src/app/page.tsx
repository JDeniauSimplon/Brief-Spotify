
import styles from './page.module.scss';
import AlbumCard from './components/AlbumCard/AlbumCard';
import fetchSpotifyApi from './spotifyAPI';


const Home = async () => {
  const newReleases = await fetchSpotifyApi('browse/new-releases?country=FR&limit=50');


  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <div className={styles.cards}>
          {newReleases?.albums.items.map((album: any) => (
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
