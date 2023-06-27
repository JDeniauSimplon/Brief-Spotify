'use client'

import { useState, useEffect } from 'react';
import styles from '../page.module.scss';

export default function Mylike() {
  const [likedTitles, setLikedTitles] = useState([]);

  useEffect(() => {
    // Récupérer les titres likés du localStorage
    const titles = JSON.parse(localStorage.getItem('likedTitles') || '[]');
    setLikedTitles(titles);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <p>ICI LES TITRES LIKEES</p>
        <ul>
          {likedTitles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

