import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import CardForm from "./CardForm.js";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => readDeck(deckId).then(setDeck), [deckId, cardId]);
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>Deck: {deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Editing
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <CardForm whenSubmitted="edit" />
    </>
  );
}

export default EditCard;
