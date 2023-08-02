import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index.js";
import { Link, useParams, useHistory } from "react-router-dom";

function StudyDeck() {
  const [deck, setDeck] = useState({ cards: [] });
  const [cards, setCards] = useState([]);
  const [flipFront, setFlipFront] = useState(true);
  const { deckId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current card index
  const [isFinished, setIsFinished] = useState(false); // Track if all cards have been shown

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

  const restartHandler = () => {
    // Reset the current index and the card flip state to start over
    setCurrentIndex(0);
    setFlipFront(true);
    setIsFinished(false);
  };

  if (cards.length <= 2) {
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
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>{deck.name}: Study</h1>
        <h2>Not Enough Cards</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <Link
          to={`/decks/${deck.id}/cards/new`}
          className="btn btn-primary mr-2"
        >
          <span className="oi oi-pencil"></span>
          Add more
        </Link>
      </>
    );
  }

  return (
    <div>
      <h1>{deck.name}: Study</h1>
      <div>
        {flipFront ? (
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title">
                    Card {currentIndex + 1} of {cards.length}
                  </h5>
                  <div>{cards[currentIndex].front}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title">
                    Card {currentIndex + 1} of {cards.length}
                  </h5>
                  <div>{cards[currentIndex].back}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={flipCardHandler}
        >
          Flip
        </button>
        {currentIndex < cards.length - 1 && !flipFront && (
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={nextCardHandler}
          >
            Next
          </button>
        )}
        {currentIndex === cards.length - 1 && !flipFront && (
          <div>
            <p>Congratulations! You have finished studying all the cards.</p>
            <button
              type="button"
              className="btn btn-success"
              onClick={restartHandler}
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudyDeck;
