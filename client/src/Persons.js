import React from 'react'

function Persons({filteredPersons, deletePerson}) {
  const handleDelete = (name, id) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deletePerson(id);
    }
  }
  
  return (
    <div>
        {filteredPersons.map((person) => (
          <p key={person.name}>
            {person.name}: {person.number} <button onClick={() => handleDelete(person.name, person.id)}>delete</button>
          </p>
        ))}
    </div>
  )
}

export default Persons