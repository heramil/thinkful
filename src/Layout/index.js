import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AddCard from './AddCard/AddCard';
import CreateDeck from './CreateDeck/CreateDeck';
import EditCard from './EditCard/EditCard';
import EditDeck from './EditDeck/EditDeck'
import Header from "./Header";
import Home from './Home/Home'
import NotFound from "./NotFound";
import ViewDeck from './ViewDeck/ViewDeck';
import StudyDeck from './StudyDeck/StudyDeck';

import './Home/Home.css';

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/decks/new'>
              <CreateDeck />
            </Route>
            <Route exact path='/decks/:deckId/edit'>
              <EditDeck />
            </Route>
            <Route exact path='/decks/:deckId/study'>
              <StudyDeck />
            </Route>
            <Route exact path='/decks/:deckId'>
              <ViewDeck />
            </Route>
            <Route path='/decks/:deckId/cards/new'>
              <AddCard />
            </Route>
            <Route exact path='/decks/:deckId/cards/:cardId/edit'>
              <EditCard />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default Layout;
