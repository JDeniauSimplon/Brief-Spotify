'use client'

import styles from './header.module.scss'
import Link from 'next/link' 
 
import { useState } from 'react'
const Header = () => {

    const [search, setSearch] = useState('')

    const handleSearchInput = (event) => {
        setSearch(event.target.value);
    }

    const handleSearchSubmit = () => {
        if (search.trim() === '') {
            alert("Veuillez entrer au moins un caractère avant de rechercher.");
            return;
        }
        window.location.href = `/search/${search}`;
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    }

    return (
        <div className={styles.header}>
            <Link className={styles.logo} href='/'/>
            <div className={styles.search}>
                <input onChange={handleSearchInput} onKeyDown={handleKeyDown} type="text"/>
                {/* Utilisez une balise <a> au lieu de <Link> */}
                <a role="button" onClick={handleSearchSubmit} className={styles.magnifyingGlass}></a>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link className={styles.like} href='/like'/> 
                    </li>
                </ul>
            </nav>
        </div>
    )
}
 
export default Header;


