import styles from './page.module.scss';
import TrackDetail from '../../components/TrackDetail/TrackDetail';
import fetchSpotifyApi from '../../spotifyAPI';

export default async function TrackPage({
  params,
}: {
  params: { id: string };
}) {
  const trackId = params.id;

  const thisTrack = await fetchSpotifyApi(`tracks/${trackId}?market=FR`);
  const thisArtist = await fetchSpotifyApi(`artists/${thisTrack?.artists[0].id}`);
  // console.log(thisTrack);
  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <TrackDetail 
          title={thisTrack?.name}
          imageUrl={thisTrack?.album.images[0].url}
          artistName={thisArtist?.name}
          artistId={thisArtist?.id}
          releaseDate={thisTrack?.album.release_date}
          duration={thisTrack?.duration_ms}
          artistImageUrl={thisArtist?.images[0].url}
          artistImageTitle={thisArtist?.name}
          trackId={thisTrack?.id}
        />
      </div>
    </div>
  );
};
