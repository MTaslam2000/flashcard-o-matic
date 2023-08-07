import React, { useEffect, useState } from "react";
import { deleteDeck, listDecks } from "../utils/api/index.js";
import { Link } from "react-router-dom";

function Home({ decks, setDecks, loadDecks }) {
  // const [decks, setDecks] = useState([]);

  // const loadDecks = () => {
  //   listDecks().then(setDecks);
  // };

  useEffect(loadDecks, []);

  const deckDeleteHandler = (deckToDelete) => {
    const result = window.confirm("Are you sure you want to delete this deck");
    if (result) {
      deleteDeck(deckToDelete).then(loadDecks);
    }
  };

  return (
    <div>
      <Link to="/decks/new">
        <button>Create Deck</button>
      </Link>
      <div>
        {decks?.map((deck, i) => {
          return (
            <div key={`deck index: ${i}`}>
              <h1>
                {deck.name}{" "}
                <span className="float-right">{deck.cards.length} cards</span>
              </h1>
              <p>{deck.description}</p>
              <Link to={`/decks/${deck.id}`}>
                <button>View</button>
              </Link>
              <Link to={`/decks/${deck.id}/study`}>
                <button>Study</button>
              </Link>
              <button onClick={() => deckDeleteHandler(deck.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
