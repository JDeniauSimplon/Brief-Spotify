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
      <Link href="" onClick={handleBackClick} className={styles.button}></Link>
      </div>
  );
};

export default ArtistDetail;
