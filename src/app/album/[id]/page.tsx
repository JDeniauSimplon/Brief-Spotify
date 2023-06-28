import styles from './page.module.scss';
import AlbumDetail from '../../components/AlbumDetail/AlbumDetail';
import fetchSpotifyApi from '../../spotifyAPI';

interface TrackItem {
  name: string;
  id: string;
}

const AlbumPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const albumId = params.id;
  const thisAlbum = await fetchSpotifyApi(`albums/${albumId}`);
  const thisArtist = await fetchSpotifyApi(`artists/${thisAlbum?.artists[0].id}`);
  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <div className={styles.cards}>
          <AlbumDetail
            title={thisAlbum?.name}
            imageUrl={thisAlbum?.images[0].url}
            artistName={thisAlbum?.artists[0].name}
            artistsId={thisAlbum?.artists[0].id}
            releaseDate={thisAlbum?.release_date}
            tracks={thisAlbum?.tracks.items.map((item: TrackItem) => ({name: item.name, id: item.id}))}
            artistImageUrl={thisArtist?.images[0].url}
            artistImageTitle={thisArtist?.name}
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
