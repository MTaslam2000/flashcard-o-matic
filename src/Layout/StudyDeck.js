import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index.js";
import { Link, useParams, useHistory } from "react-router-dom";

function StudyDeck() {
  const [deck, setDeck] = useState({ cards: [] });
  const [cards, setCards] = useState([]);
  const [flipFront, setFlipFront] = useState(true);
  const { deckId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current card index

  const flipCardHandler = () => setFlipFront(!flipFront);

  const loadDeck = () => {
    readDeck(deckId).then((deck) => {
      setDeck(deck);
      setCards(deck.cards);
    });
  };
  useEffect(() => loadDeck(), [deckId]);

  const nextCardHandler = () => {
    // Increment the current index, and reset to 0 if it reaches the end of the cards
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < cards.length ? prevIndex + 1 : 0
    );
    // Reset the card to show the front when moving to the next card
    setFlipFront(true);
  };

  if (cards.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      You are studying this deck
      <div>
        {flipFront ? (
          <div>{cards[currentIndex].front}</div>
        ) : (
          <div>{cards[currentIndex].back}</div>
        )}
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={flipCardHandler}
        >
          Flip
        </button>
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={nextCardHandler}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudyDeck;
