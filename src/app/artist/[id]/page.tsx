import styles from './page.module.scss';
import ArtistDetail from '../../components/ArtistDetail/ArtistDetail';
import fetchSpotifyApi from '../../spotifyAPI';

export default async function Artist({
  params,
}: {
  params: { id: string };
}) {
  const artisId = params.id; // Accéder à l'ID de l'artiste via la clé 'id'
  
  const thisArtist = await fetchSpotifyApi(`artists/${artisId}`);

  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <div className={styles.cards}>
          <ArtistDetail
            title={thisArtist?.name}
            imageUrl={thisArtist?.images[0].url}
          />
        </div>
      </div>
    </div>
  );
};