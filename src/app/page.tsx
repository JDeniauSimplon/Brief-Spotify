import styles from './page.module.scss'
import Container from './components/Container/Container'

const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      <Container />
      </div>
    </main>
  )
}

export default Home;