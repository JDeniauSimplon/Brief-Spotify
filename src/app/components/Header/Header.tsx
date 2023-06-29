'use client'

import styles from './header.module.scss';
import Link from 'next/link';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

const Header = () => {
    const [search, setSearch] = useState('');
 

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };


    const handleSearchSubmit = () => {
        if (search.trim() === '') {
            alert("Veuillez entrer au moins un caractère avant de rechercher.");
            return;
        }
        window.location.href = `/search/${search}`;
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
        <div className={styles.header}>
            <Link className={styles.logo} href='/' />
            <div className={styles.search}>
                <input onChange={handleSearchInput} onKeyDown={handleKeyDown} type="text" />
                <button role="button" onClick={handleSearchSubmit} className={styles.magnifyingGlass}></button>
            </div>
            <nav>
              
                        <Link className={styles.like} href='/like' />
                   
                
            </nav>
        </div>
    );
};

export default Header;
