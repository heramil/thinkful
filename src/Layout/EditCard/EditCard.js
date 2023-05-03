import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';

import { readDeck, readCard, updateCard } from '../../utils/api/index';

const EditCard = () => {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [updatedCard, setUpdatedCard] = useState({});

  useEffect(() => {
    const fetchDeck = async () => {
      const data = await readDeck(deckId);
      setDeck(data);
    }
    fetchDeck()
  }, [deckId])

  useEffect(() => {
    const fetchCard = async () => {
      const data = await readCard(cardId);
      setUpdatedCard(data);
    }
    fetchCard()
  }, [cardId])

  const handleUpdateFrontCard = (e) => {
    setUpdatedCard({...updatedCard, front: e.target.value})
  }

  const handleUpdateBackCard = (e) => {
    setUpdatedCard({...updatedCard, back: e.target.value})
  }

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    const data = await updateCard(updatedCard);
    history.push(`/decks/${deckId}`)
  }


  return (
    <>
      <nav className='breadcrumb'>
        <ul>
          <Link to='/'><li>{'Home'}</li></Link>
          <li>/</li>
          <Link to={`/decks/${deckId}`}><li>Deck {deck.name}</li></Link>
          <li>/</li>
          <li>Edit Card {cardId}</li>
        </ul>
      </nav>
      <h2>Edit Card</h2>
      <form name='edit'>
        <div className='front-edit'>
          <label>Front</label>
          <textarea placeholder={updatedCard.front} onChange={handleUpdateFrontCard}></textarea>
        </div>
        <div className='back-edit'>
          <label>Back</label>
          <textarea placeholder={updatedCard.back} onChange={handleUpdateBackCard}></textarea>
        </div>
        <div className='edit-buttons'>
          <button>Cancel</button>
          <button onClick={handleSubmitButton}>Submit</button>
        </div>
      </form>
    </>
  )
}

export default EditCard 