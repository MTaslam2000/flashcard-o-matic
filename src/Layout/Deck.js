import React from "react";

function Deck({ deck }) {
  return (
    <div>
      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
      <button>View</button>
      <button>Study</button>
      <button>Trash</button>
    </div>
  );
}

export default Deck;
