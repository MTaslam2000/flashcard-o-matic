import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api/index.js";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./Home.js";
import CreateDeck from "./CreateDeck.js";
import StudyDeck from "./StudyDeck.js";
import ViewDeck from "./ViewDeck.js";
import EditDeck from "./EditDeck.js";
import AddCard from "./AddCard.js";
import EditCard from "./EditCard.js";

function Layout() {
  const [decks, setDecks] = useState([]);

  const loadDecks = () => {
    listDecks().then(setDecks);
  };

  // const loadDecks = () => {
  //   listDecks().then(setDecks);
  // };
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home decks={decks} setDecks={setDecks} loadDecks={loadDecks} />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
