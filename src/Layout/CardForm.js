import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import {
  createCard,
  readCard,
  readDeck,
  updateCard,
} from "../utils/api/index.js";

function CardForm({ whenSubmitted }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState({});
  const initialFormState = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    console.log(target.value);
  };

  useEffect(() => {
    readDeck(deckId);
    if (whenSubmitted === "edit") {
      readCard(cardId).then((card) => {
        setCard(card);
        setFormData({
          front: card.front,
          back: card.back,
        });
      });
    }
  }, [deckId, cardId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (whenSubmitted === "edit") {
      const editedCard = {
        id: cardId,
        front: formData.front,
        back: formData.back,
        deckId: Number(deckId),
      };

      updateCard(editedCard).then(() => history.push(`/decks/${deckId}`));
    }

    if (whenSubmitted === "add") {
      e.preventDefault();
      const newCard = {
        front: formData.front,
        back: formData.back,
        deckId: deckId,
      };
      createCard(deckId, newCard).then(() => history.push(`/decks/${deckId}`));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          id="front"
          type="text"
          name="front"
          rows="3"
          onChange={handleChange}
          defaultValue={card.front}
          value={formData.front}
        />
      </div>
      <div>
        <label htmlFor="back">Back</label>
        <textarea
          className="form-control"
          id="back"
          type="text"
          name="back"
          rows="3"
          onChange={handleChange}
          defaultValue={card.back}
          value={formData.back}
        />
      </div>
      <Link to={`/decks/${deckId}`}>
        <button type="button">Cancel</button>
      </Link>
      <button type="submit">
        {whenSubmitted === "edit" ? "Save Changes" : "Submit"}
      </button>
    </form>
  );
}

export default CardForm;
