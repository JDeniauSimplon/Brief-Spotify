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
        window.location.href = `/search/${search}`;

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


