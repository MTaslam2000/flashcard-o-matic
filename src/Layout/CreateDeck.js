import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const history = useHistory();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const brandNewDeck = {
      name: formData.name,
      description: formData.description,
    };
    createDeck(brandNewDeck).then((newDeck) =>
      history.push(`/decks/${newDeck.id}`)
    );
  };

  const handleCancelBtn = () => history.push("/");

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>create a deck</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="new deck name"
          />
        </div>
        <div>
          <label htmlFor="description">description</label>
          <textarea
            className="form-control"
            type="description"
            name="description"
            id="description"
            rows="3"
            onChange={handleChange}
            value={formData.description}
            placeholder="description of the deck"
          />
        </div>
        <Link to="/">
          <button type="button" onClick={() => handleCancelBtn}>
            Cancel
          </button>
        </Link>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateDeck;
