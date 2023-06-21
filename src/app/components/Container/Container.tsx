import styles from './container.module.scss'
 
const Container = () => {
	const people = ["Alex", "Bailey", "Charlie", "Dakota", "Eli", "Finley", "Gabby", "Harper", "Indigo", "Jordan"];	
	return (
		<div className={styles.container}>
			<div className={styles.childcontainer}>
				<ul>
					{people.map((person, index) => (
						<li key={index + '_' + person}>{person}</li>
					))}
				</ul>
			</div>
		</div>
	)
}
 
export default Container;
