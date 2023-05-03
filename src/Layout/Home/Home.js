import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { listDecks, deleteDeck } from '../../utils/api/index';

const Home = () => {
  const history = useHistory();

  const [decks, setDecks] = useState([])

  useEffect(() => {
    async function fetchDecks() {
      try {
        const data = await listDecks();
        setDecks(data)
      } catch(error) {
        console.log(error)
      }
    }
    fetchDecks();
  }, []);

  function handleClickCreateDeck(e) {
    e.preventDefault();
    history.push('/decks/new')
  }

  function handleDeleteDeck(deckId) {
    if (!window.confirm('Delete this deck? You will not be able to recover it.')) {
      return
    }
    deleteDeck(deckId)
    history.push('/');
    window.location.reload(false);
  }

  const handleViewDeck = (deckId) => {
    history.push(`/decks/${deckId}`)
  }

  const handleStudyDeck = (deckId) => {
    history.push(`/decks/${deckId}/study`)
  }

  return (
    <>
    <button onClick={handleClickCreateDeck}>+ Create Deck</button>
    {
      decks.map((deck, index) => (
        <div className='deck' key={index}>
          <div className='deck-row-one'>
            <h3>{deck.name}</h3>
            <p>{deck.cards.length} cards</p>
          </div>
          <div className='deck-row-two'>
            <p>{deck.description}</p>
          </div>
          <div className='deck-row-three'>
            <div className='view&study'>
              <button onClick={() => handleViewDeck(deck.id)}>View</button>
              <button onClick={() => handleStudyDeck(deck.id)}>Study</button>
            </div>
            <div classname='delete'>
              <button onClick={() => handleDeleteDeck(deck.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))
    }
    </>
  )
}

export default Home;