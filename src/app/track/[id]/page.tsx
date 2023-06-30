import styles from './page.module.scss';
import TrackDetail from '../../components/TrackDetail/TrackDetail';
import fetchSpotifyApi from '../../spotifyAPI';

interface Track {
  name: string;
  album: {
    images: { url: string }[];
    release_date: string;
  };
  artists: { id: string }[];
  duration_ms: number;
  id: string;
}

interface Artist {
  name: string;
  id: string;
  images: { url: string }[];
}

interface Params {
  id: string;
}

const TrackPage = async ({ params }: { params: Params }) => {
  const { id: trackId } = params;

  const thisTrack = (await fetchSpotifyApi(`tracks/${trackId}?market=FR`)) as Track;
  const thisArtist = (await fetchSpotifyApi(`artists/${thisTrack?.artists[0].id}`)) as Artist;

  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <TrackDetail
          title={thisTrack?.name}
          imageUrl={thisTrack?.album.images[0]?.url || '/assets/cover.png'}
          artistName={thisArtist?.name || 'Unknown artist'}
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

export default TrackPage;
