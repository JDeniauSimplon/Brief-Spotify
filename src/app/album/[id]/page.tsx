// Cette route pourrait être utilisée pour afficher les détails d'un album spécifique. Par exemple, /album/67890 afficherait les détails de l'album avec l'ID 67890.

import styles from '../../page.module.scss';
import AlbumDetail from '../../components/AlbumDetail/AlbumDetail';
import fetchSpotifyApi from '../../spotifyAPI';



// ajouter async a la function si besoin d'un await
const Album = async () => {
  const thisAlbum = await fetchSpotifyApi('albums/0MdN6wfUWZtMFXV0ESjYuf')
return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <div className={styles.cards}>
          <AlbumDetail
            title={thisAlbum?.name}
            imageUrl={thisAlbum?.images[0].url}
            artistName={thisAlbum?.artists[0].name}
            albumId={thisAlbum?.id}
          />
        </div>
      </div>
    </div>
);
};



export default Album;