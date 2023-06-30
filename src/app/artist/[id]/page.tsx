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
  const artistGenres = thisArtist.genres; 
  const artistName = thisArtist.name; 
  
  const similarArtists = (await fetchSpotifyApi(`artists/${artistId}/related-artists`)).artists;
  
  // on récupère les albums de l'artiste
  const artistAlbums = (await fetchSpotifyApi(`artists/${artistId}/albums`)).items.map(album => ({
    id: album.id,
    name: album.name,
    imageUrl: album.images[0]?.url, 
    artistName: album.artists[0]?.name, 
  }));

  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
          <ArtistDetail
            title={thisArtist?.name}
            imageUrl={thisArtist?.images[0].url}
            artistName={artistName} 
            artistGenres={artistGenres} 
            similarArtists={similarArtists}
            albums={artistAlbums} 
          />
        </div>
      </div>
  );
};

export default Artist;