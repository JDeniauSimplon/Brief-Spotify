
import styles from '../../page.module.scss';
import fetchSpotifyApi from '../../spotifyAPI';
import AlbumCard from '../../components/AlbumCard/AlbumCard';



export default async function SearchPage({
  params,
}: {
  params: { id: string; filterType: string };
}) {
  const searchQuery = params.id;
  const filterType = params.filterType || 'album,playlist,track,artist'; // type par défaut si aucun filtre n'est fourni

  // Utilisez searchQuery et filterType pour faire votre appel API
  const thisSearch = await fetchSpotifyApi(`search?q=${searchQuery}&type=${filterType}&market=FR&limit=50&offset=0`);
  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <div className={styles.cards}>
          {thisSearch?.albums.items.map((album: any) => (
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


