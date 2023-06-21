import styles from './header.module.scss'
import Link from 'next/link' 
 
const Header = () => {
	return (
	  <div className={styles.header}>
		<Link className={styles.logo} href='/'/>
		<div className={styles.search}>
		  <input type="text"/>
		  <button type="submit" className={styles.magnifyingGlass}></button>
		</div>
		<nav>
		  <ul>
			<li>
				<Link className={styles.like} href='/like'/> {/*bouton vers les titres likés*/}
			</li>
		  </ul>
		</nav>
	  </div>
	)
}
 
  export default Header;