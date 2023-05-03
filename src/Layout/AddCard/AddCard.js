import { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom'

import { readDeck, createCard } from '../../utils/api/index'

const AddCard = () => {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [newCard, setNewCard] = useState({})

  useEffect(() => {
    const fetchDeck = async () => {
      const data = await readDeck(deckId);
      setDeck(data)
    }
    fetchDeck();
  }, [deckId])

  const handleAddFrontCard = (e) => {
    setNewCard({...newCard, front: e.target.value});
  }

  const handleAddBackCard = (e) => {
    setNewCard({...newCard, back: e.target.value});
  }

  const handleDoneButton = () => {
    history.push(`/decks/${deckId}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await createCard(newCard);
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
          <li>Add Card</li>
        </ul>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <form name='card'>
        <div className='front-card'>
          <label>Front</label>
          <textarea type='text' placeholder='Front side of card' onChange={handleAddFrontCard}></textarea>
        </div>
        <div className='back-card'>
          <label>Back</label>
          <textarea type='text' placeholder='Back side of card' onChange={handleAddBackCard}></textarea>
        </div>
        <div className='card-buttons'>
          <button onClick={handleDoneButton}>Done</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </form>
    </>
  )
}

export default AddCard