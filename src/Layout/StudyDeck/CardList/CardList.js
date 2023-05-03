import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import { readDeck } from '../../../utils/api/index';

const CardList = () => {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({})
  const [cardIndex, setCardIndex] = useState(0);
  const [side, setSide] = useState(true)
  const cards = deck.cards || [];

  useEffect(() => {
    const fetchDeck = async () => {
      const data = await readDeck(deckId)
      setDeck(data)
    }
    fetchDeck();
  }, [deckId])

  const handleFlip = (e) => {
    setSide(!side)
  }

  const nextHandler = () => {
    setCardIndex((cardIndex) => cardIndex + 1);
    setSide(true);
    if (cardIndex === cards.length - 1) {
      return window.confirm(
        `Restart Cards?\n\n Click 'cancel' to return to the home page`
      ) ? setCardIndex(0) : history.pushState('/');
    }
  }

  if (cards.length && cards.length > 2) {
    return (
      <div key={deckId} className='card'>
        <div className='card-row-one'>
          <h5>Card {cardIndex + 1} of {cards.length} </h5>
        </div>
        <div className='card-row-two'>
          <p>
            { side ? cards[cardIndex].front : cards[cardIndex].back }
          </p>
        </div>
        <div className='card-row-three'>
          {
            <button onClick={handleFlip}>Flip</button>
          }
          {
            side ? null : (
              <button onClick={nextHandler}>
                Next
              </button>
            )
          }
        </div>
      </div>
    )
  } else {
    return (
      <div className='card'>
        <div className='card-row-one'>
          <h5>Not enough cards.</h5>
        </div>
        <div className='card-row-two'>
          <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
        </div>
        <div className='card-row-three'>
          <Link><button>Add Cards</button></Link>
        </div>
      </div>
    )
  }

}

export default CardList