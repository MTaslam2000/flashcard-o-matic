import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index.js";
import { Link, useParams, useHistory } from "react-router-dom";

function StudyDeck() {
  const [deck, setDeck] = useState({ cards: [] });
  const [cards, setCards] = useState([]);
  const [flipFront, setFlipFront] = useState(true);
  const { deckId } = useParams();

  const flipCardHandler = () => setFlipFront(!flipFront);

  const loadDeck = () => {
    readDeck(deckId).then((deck) => {
      setDeck(deck);
      setCards(deck.cards);
    });
  };
  useEffect(() => loadDeck(), [deckId]);

  return (
    <div>
      You are studying this deck
      <div>
        {cards.map((c, i) =>
          flipFront ? (
            <div onClick={flipCardHandler} key={`card front index ${i}`}>
              {c.front}
            </div>
          ) : (
            <div onClick={flipCardHandler} key={`card back index ${i}`}>
              {c.back}
            </div>
          )
        )}
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={flipCardHandler}
        >
          Flip
        </button>
      </div>
    </div>
  );
}

export default StudyDeck;
