import styles from './page.module.scss';

export default function Loading() {
  return (
    // Or a custom loading skeleton component
    <div className={styles.container}>
    <div className={styles.childcontainer}>
    <p>'Loading...'</p>
    </div>
		</div>)
  }


			
		