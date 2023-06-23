'use client'

import styles from './header.module.scss'
import Link from 'next/link' 
 
import { useState } from 'react'

const Header = () => {

    const [search, setSearch] = useState('')

    const handleSearchInput = (event : any) => {
        setSearch(event.target.value); // Mettre à jour l'état search avec la valeur entrée
    }

    const handleSearchSubmit = () => {
        console.log(search); // Afficher la valeur de recherche dans la console
    }

    return (
        <div className={styles.header}>
            <Link className={styles.logo} href='/'/>
            <div className={styles.search}>
                <input onChange={handleSearchInput} type="text"/>
                <Link type="submit" onClick={handleSearchSubmit} href={`/search/${search}`} className={styles.magnifyingGlass}></Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link className={styles.like} href='/like'/> {/*bouton vers les titres likés*/}
                    </li>
                </ul>
            </nav>
        </div>
    )
}
 
export default Header;



// 'use client'

// import styles from './albumcard.module.scss';
// import Link from 'next/link';

// interface AlbumCardProps {
//   title: string;
//   imageUrl: string;
//   artistName: string;
//   albumId: string;
// }

// const AlbumCard: React.FC<AlbumCardProps> = ({ title, imageUrl, artistName, albumId }) => {

//   return (
//     <Link href={`/album/${albumId}`} className={styles.albumCard}>
//       <img src={imageUrl} alt={title} className={styles.albumImage} />
//       <div className={styles.albumInfo}>
//         <p className={styles.albumTitle}>{title}</p>
//         <p className={styles.albumArtist}>{artistName}</p>
//       </div>
//     </Link>
//   );
// };

// export default AlbumCard;