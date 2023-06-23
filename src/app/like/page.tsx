import styles from '../page.module.scss';
// import fetchSpotifyApi from '../spotifyAPI';

// ajouter async a la function si besoin d'un await
export default function Mylike() {
  // const newReleases = await fetchSpotifyApi('browse/new-releases?country=FR&limit=50')
  // console.log(newReleases); // Ajoutez cette ligne


  return ( <div>

    <div className={styles.container}>
      <div className={styles.childcontainer}>
       
      <p>ICI LES TITRES LIKEES</p>
      </div>
    </div>
    </div>
  )
}

