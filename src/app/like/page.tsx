import styles from '../page.module.scss';

function PersonItem({nom, prénom, ville}) {
	return (
		<li>
			<p>{prénom} - {nom}</p>
			<p>{ville}</p>
		</li>
	)
}

const myLikes = () => {
  	const people = [
      { nom: "Doe", prénom: "John", ville: "New York" },
      { nom: "Smith", prénom: "Alice", ville: "Paris" },
      { nom: "Johnson", prénom: "David", ville: "Londres" },
      { nom: "Dubois", prénom: "Élise", ville: "Montréal" },
      { nom: "Lee", prénom: "Soo-Jin", ville: "Séoul" },
      { nom: "Doe", prénom: "John", ville: "New York" },
      { nom: "Smith", prénom: "Alice", ville: "Paris" },
      { nom: "Johnson", prénom: "David", ville: "Londres" },
    ];
  return (
    
<div className={styles.container}>
<div className={styles.childcontainer}>
    <ul>
    { people.map((person, index) => 
      <PersonItem key={index + '_' + person.nom} nom={person.nom} prénom={person.prénom} ville={person.ville} />
    )}
  </ul>
  
</div>
</div>
  )
}

export default myLikes;




