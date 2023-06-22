import styles from '../page.module.scss';
import fetchSpotifyApi from '../spotifyAPI';


export default async function Mylike() {
  const newReleases = await fetchSpotifyApi('browse/new-releases?country=FR&limit=8')
  console.log(newReleases); // Ajoutez cette ligne


  return ( <div>

    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <ul>
          {newReleases?.albums.items.map((album: any) => (
            <li>
              <p>{album.name}</p>
            </li>))}
        </ul>
       
      </div>
    </div>
    </div>
  )
}

