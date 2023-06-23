// Cette route pourrait être utilisée pour afficher les détails d'un album spécifique. Par exemple, /album/67890 afficherait les détails de l'album avec l'ID 67890.


import styles from '../../page.module.scss';
import fetchSpotifyApi from '../../spotifyAPI';
import AlbumCard from '../../components/AlbumCard/AlbumCard';



// ${searchId}
// ajouter async a la function si besoin d'un await
const Search = async () => {
  const thisSearch = await fetchSpotifyApi(`search?q=Damso&type=album%2Cplaylist%2Ctrack%2Cartist&market=FR&limit=50&offset=0`)
console.log(thisSearch)
return (
    
    <div className={styles.container}>
      <div className={styles.childcontainer}>
      <div className={styles.cards}>
          {thisSearch?.albums.items.map((album: any) => (
            <AlbumCard
              title={album.name}
              imageUrl={album.images[0].url}
              artistName={album.artists[0].name}
              albumId={album.id} // Utiliser album.id au lieu de albumId
            />
          ))}
        </div>
      </div>
    </div>
);

};


export default Search;