import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'

import { readDeck } from '../../utils/api/index';

import './ViewDeck.css'

const ViewDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({})
  const cards = deck.cards || [];

  useEffect(() => {
    const fetchDeck = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    fetchDeck()
  }, [deckId])

  return (
    <>
      <nav className='breadcrumb'>
        <ul>
          <Link to='/'><li>{'Home'}</li></Link>
          <li>/</li>
          <Link to={`/decks/${deckId}`}><li>{deck.name}</li></Link>
        </ul>
      </nav>
      <div className='deck'>
        <div className='deck-row-one'>
          <h3>{deck.name}</h3>
        </div>
        <div className='deck-row-two'>
          <p>{deck.description}</p>
        </div>
        <div className='deck-row-three'>
          <div className='edit&study&addCards'>
            <Link to={`/decks/${deckId}/edit`}><button>Edit</button></Link>
            <Link to={`/decks/${deckId}/study`}><button>Study</button></Link>
            
            <Link to={`/decks/${deckId}/cards/new`} deckId={deckId}><button >Add Cards</button></Link>
          </div>
          <div className='delete'>
            <button>Delete</button>
          </div>
        </div>
      </div>
      <h1>Cards</h1>
      {
        cards.map((card, index) => (
          <div key={card.id} className='cards'>
            <div className='card'>
              <div className='card-front'>
                <h6>Question</h6>
                <p>{card.front}</p>
              </div>
              <div className='card-back'>
                <h6>Answer</h6>
                <p>{card.back}</p>
              </div>
            </div>
            <div className='edit-delete'>
              <Link to={`/decks/${deckId}/cards/${card.id}/edit`}><button>Edit</button></Link>
              <button>Delete</button>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default ViewDeck