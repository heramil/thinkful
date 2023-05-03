import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { createDeck } from '../../utils/api/index';

import './CreateDeck.css'

const CreateDeck = () => {
  const history = useHistory();

  const [newDeck, setNewDeck] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createDeck(newDeck);
    history.push(`/decks/${data.id}`)
  }

  const handleNameValue = (e) => {
    setNewDeck({...newDeck, name: e.target.value })
  }

  const handleDescriptionValue = (e) => {
    setNewDeck({...newDeck, description: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault();
    history.push('/')
  }

  return (
    <>
      <nav className='breadcrumb'>
        <ul>
          <Link to='/'><li>{'Home'}</li></Link>
          <li>/</li>
          <Link to='/decks/new'><li>Create Deck</li></Link>
        </ul>
      </nav>
      <main>
        <h1>Create Deck</h1>
        <form className='create' name='create'>
          <div className='name'>
            <label>Name</label>
            <input type='text' placeholder='Deck Name' onChange={handleNameValue}></input>
          </div>
          <div className='description'>
            <label>Description</label>
            <textarea placeholder='Brief description of the deck' onChange={handleDescriptionValue}></textarea>
          </div>
          <div className='cancel-submit'>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </main>
    </>
  )
}

export default CreateDeck;