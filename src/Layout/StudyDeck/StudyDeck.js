import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'

import { readDeck } from '../../utils/api/index';

import CardList from './CardList/CardList';

const StudyDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const fetchDeck = async () => {
      const data = await readDeck(deckId);
      setDeck(data);
    }

    fetchDeck();
  }, [deckId])

  return (
    <>
      <nav className='breadcrumb'>
        <ul>
          <Link to='/'><li>{'Home'}</li></Link>
          <li>/</li>
          <Link to={`/decks/${deckId}`}><li>{deck.name}</li></Link>
          <li>/</li>
          <Link to={`/decks/${deckId}/study`}><li>Study</li></Link>
        </ul>
      </nav>
      <h1>Study: {deck.name}</h1>
      <CardList />
    </>
  )
}

export default StudyDeck;