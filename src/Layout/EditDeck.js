import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index.js";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    console.log(target.value);
  };

  const loadDeck = () => {
    readDeck(deckId).then(setDeck);
  };
  useEffect(loadDeck, [deckId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedDeck = {
      id: deckId,
      name: formData.name,
      description: formData.description,
    };
    updateDeck(editedDeck).then(() => history.push(`/decks/${deckId}`));
  };

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
            Editing
          </li>
        </ol>
      </nav>
      <h1>Editing Deck</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder={deck.name}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="3"
            name="description"
            className="form-control"
            onChange={handleChange}
            value={formData.description}
            placeholder={deck.description}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </>
  );
}

export default EditDeck;
