import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../utils/api/index.js";

function ViewDeck() {
  const history = useHistory();
  const [deck, setDeck] = useState({ cards: [] });
  const { deckId } = useParams();
  const loadDeck = () => readDeck(deckId).then(setDeck);
  useEffect(() => {
    let isLoaded = true;
    loadDeck();
    return () => {
      // cancel the subscription
      isLoaded = false;
    };
  }, [deck]);
  const deleteThisDeckHandler = useCallback(
    (deckId) => {
      const result = window.confirm(
        "Delete this deck? You will not be able to recover it."
      );
      if (result) {
        deleteDeck(deckId).then(history.push("/"));
      }
    },
    [deck]
  );

  const deleteThisCardHandler = useCallback(
    (cardId) => {
      const result = window.confirm(
        "Delete this card? You will not be able to recover it."
      );
      if (result) {
        deleteCard(cardId);
        readDeck(deckId).then(setDeck);
      }
    },
    [deck]
  );

  return (
    <>
      <div>
        <nav className="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <span className="oi oi-home"></span> Home
              </Link>
            </li>
            <li className="breadcrumb-item active">{deck.name}</li>
          </ol>
        </nav>
      </div>
      <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mr-2">
          <span className="oi oi-book"></span>
          Edit
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-secondary mr-2">
          <span className="oi oi-book"></span>
          Study
        </Link>
        <Link
          to={{
            pathname: `/decks/${deck.id}/cards/new`,
            state: { deck: deck },
          }}
          className="btn btn-primary mr-2"
        >
          <span className="oi oi-pencil"></span>
          Add more
        </Link>
        <button
          type="button"
          className="btn btn-danger float-right"
          onClick={() => deleteThisDeckHandler(deck.id)}
        >
          <span className="oi oi-trash"></span>
        </button>
      </div>
      <h1>Cards</h1>
      {deck.cards.map((card, i) => (
        <div key={`card index ${i}`} className="card mb-3">
          <div className="card-body">
            <div className="row">
              <p className="card-text col">{card.front}</p>
              <p className="card-text col">{card.back}</p>
            </div>
            <button
              type="button"
              className="btn btn-danger float-right"
              onClick={() => deleteThisCardHandler(card.id)}
            >
              <span className="oi oi-trash"></span>
            </button>
            <Link
              to={`/decks/${deck.id}/cards/${card.id}/edit`}
              className="btn btn-secondary mr-2 float-right"
            >
              <span className="oi oi-pencil"></span> Edit
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default ViewDeck;
