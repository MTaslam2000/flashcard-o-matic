import React, { useCallback, useEffect, useState } from "react";
import { listDecks, readDeck } from "../utils/api/index.js";
import { Link } from "react-router-dom";
import { Deck } from "./Deck.js";

function Home() {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    listDecks().then((data) => setDecks(data));
  }, []);

  return (
    <div>
      <Link to="/decks/new">
        <button>Create Deck</button>
      </Link>
      <div>
        {decks?.map((d, i) => {
          return (
            <div key={`d-${i}`}>
              <Deck deck={d} deckId={i + 1} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
