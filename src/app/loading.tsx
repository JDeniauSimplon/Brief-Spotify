import styles from './page.module.scss';

export default function Loading() {
  return (
    <div className={styles.container}>
    
        <div className={styles.ldsRoller}>
          <div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div>
        </div>
    
    </div>
  )
}
