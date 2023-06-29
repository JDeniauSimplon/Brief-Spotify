'use client'

import styles from './header.module.scss';
import Link from 'next/link';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

const Header = () => {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('album,artist');

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFilterType(event.target.value);
    };

    const handleSearchSubmit = () => {
        if (search.trim() === '') {
            alert("Veuillez entrer au moins un caractère avant de rechercher.");
            return;
        }
        window.location.href = `/search/${search}?filterType=${filterType}`;
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
            <select onChange={handleFilterChange}>
                <option value="album,artist">Tout</option>
                <option value="album">Albums</option>
                <option value="artist">Artistes</option>
            </select>
            <nav>
                <ul>
                    <li>
                        <Link className={styles.like} href='/like' />
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
