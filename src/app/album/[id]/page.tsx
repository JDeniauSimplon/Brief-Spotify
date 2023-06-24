// Cette route pourrait être utilisée pour afficher les détails d'un album spécifique. Par exemple, /album/67890 afficherait les détails de l'album avec l'ID 67890.

import styles from '../../page.module.scss';
import AlbumDetail from '../../components/AlbumDetail/AlbumDetail';
import fetchSpotifyApi from '../../spotifyAPI';

export default async function AlbumPage({
  params,
}: {
  params: { id: string };
}) {
  const albumId = params.id; // Accéder à l'ID de l'album via la clé 'id'
  
  // Utilisez albumId pour faire votre appel API
  const thisAlbum = await fetchSpotifyApi(`albums/${albumId}`);

  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <div className={styles.cards}>
          <AlbumDetail
            title={thisAlbum?.name}
            imageUrl={thisAlbum?.images[0].url}
            artistName={thisAlbum?.artists[0].name}
            albumId={thisAlbum?.id}
            releaseDate={thisAlbum?.release_date}
            tracks={thisAlbum?.tracks.items}
          />
        </div>
      </div>
    </div>
  );
};