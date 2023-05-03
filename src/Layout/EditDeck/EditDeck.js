import { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'

import { readDeck, updateDeck } from '../../utils/api/index'

const EditDeck = () => {
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    const fetchDeck = async () => {
      const edit = await readDeck(deckId)
      setDeck(edit);
    }
    fetchDeck();
  }, [deckId])
  
  const handleSubmitButton = async (e) => {
    e.preventDefault()
    await updateDeck(deck);
    history.push(`/decks/${deck.id}`)
  }

  const handleUpdateName = (e) => {
    setDeck({...deck, name: e.target.value})
  }

  const handleUpdateDescription = (e) => {
    setDeck({...deck, description: e.target.value})
  }

  const handleCancelButton = () => {
    history.push(`/decks/${deckId}`)
  }

  return (
    <>
      <nav className='breadcrumb'>
        <ul>
          <Link to='/'><li>{'Home'}</li></Link>
          <li>/</li>
          <Link to={`/decks/${deckId}`}><li>{deck.name}</li></Link>
          <li>/</li>
          <li>Edit Deck</li>
        </ul>
      </nav>
      <h1>Edit Deck</h1>
      <form className='edit' name='edit'>
        <div className='name'>
          <label>Name</label>
          <input type='text' placeholder={deck.name} onChange={handleUpdateName}></input>
        </div>
        <div className='description'>
          <label>Description</label>
          <textarea type='text' placeholder={deck.description} onChange={handleUpdateDescription}></textarea>
        </div>
        <div className='cancel-submit'>
          <button onClick={handleCancelButton}>Cancel</button>
          <button onClick={handleSubmitButton}>Submit</button>
        </div>
      </form>
    </>
  )
}

export default EditDeck