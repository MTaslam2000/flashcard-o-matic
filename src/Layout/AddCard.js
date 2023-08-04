import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import CardForm from "./CardForm.js";

function AddCard() {
  const location = useLocation();
  // const { deck } = location.state; This is another way to pass props i dont know why its not passing the test
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  return (
    <div>
      <div className="breacrumbs">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <span className="oi oi-home"></span> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>
      </div>
      <h1>{deck.name}: Add a Card</h1>
      <CardForm whenSubmitted="add" />
    </div>
  );
}

export default AddCard;
