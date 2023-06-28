import styles from '../../page.module.scss';
import fetchSpotifyApi from '../../spotifyAPI';
import AlbumCard from '../../components/AlbumCard/AlbumCard';

interface Album {
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
  id: string;
}

interface SearchResults {
  albums: {
    items: Album[];
  };
}

interface Params {
  id: string;
  filterType: string;
}

const SearchPage = async ({ params }: { params: Params }) => {
  const { id: searchQuery, filterType = 'album,playlist,track,artist' } = params;

  const thisSearch = await fetchSpotifyApi(`search?q=${searchQuery}&type=${filterType}&market=FR&limit=50&offset=0`) as SearchResults;

  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <div className={styles.cards}>
          {thisSearch?.albums.items.map((album: Album) => (
            <AlbumCard
              key={album.id}
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

export default SearchPage;

