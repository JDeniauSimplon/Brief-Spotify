"use client"
import styles from './artistdetail.module.scss';
import Link from 'next/link';

interface ArtistDetailProps {
  title: string;
  imageUrl: string;
}

const handleBackClick = () => {
  window.history.back();
};

const ArtistDetail: React.FC<ArtistDetailProps> = ({
  title,
  imageUrl,
}) => {
  return (
    
    <div className={styles.albumDetail}>
      <img src={imageUrl} alt={title} className={styles.albumImage} />
      <div className={styles.albumInfo}>
      <Link href="" onClick={handleBackClick} className={styles.button} />
        </div>
      </div>
     
       
  );
};

export default ArtistDetail;
