import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";

export function Deck({ deck, deckId }) {
  const [cards, setCards] = useState([]);

  // example card:
  // back:"Virtual DOM updates are faster but do not directly update the HTML"
  // deckId: 1
  // front: "Differentiate between Real DOM and Virtual DOM."
  // id: 1

  useEffect(() => {
    readDeck(deckId).then((data) => setCards(data.cards));
  }, []);
  return (
    <div>
      <h1>{deck.name}</h1> <span>{cards.length}</span>
      <p>{deck.description}</p>
      <Link to={`/decks/${deck.id}`}>
        <button>View</button>
      </Link>
      <Link to={`/decks/${deck.id}/study`}>
        <button>Study</button>
      </Link>
      <button>Trash</button>
    </div>
  );
}
