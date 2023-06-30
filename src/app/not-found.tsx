import Link from 'next/link'
import styles from './page.module.scss'

export default function NotFound() {
  return (<div className={styles.container}>
    <div className={styles.childcontainer}>
      <div>
        <h2>Aucun Résultats</h2>
        <p>
          View <Link href="/">Retour à la page principale</Link>
        </p>
      </div>
    </div>
  </div>
  )
}