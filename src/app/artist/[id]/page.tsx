import styles from './page.module.scss';
import ArtistDetail from '../../components/ArtistDetail/ArtistDetail';
import fetchSpotifyApi from '../../spotifyAPI';

const Artist = async ({
  params,
}: {
  params: { id: string };
}) => {
  const artistId = params.id;
  const thisArtist = await fetchSpotifyApi(`artists/${artistId}`);

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

export default Artist;
