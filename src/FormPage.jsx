import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './FormPage.css';

function FormPage({ onStartGame }) {
  const [nameOne, setNameOne] = useState("");
  const [nameTwo, setNameTwo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const players = { player_one: nameOne, player_two: nameTwo };
    onStartGame(players);
    await fetch('http://localhost:8000/players/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(players)
    });
    navigate('/game'); 
  };
  
  return (
    <div className="form-page">
      <h1>Tic-Tac-Toe</h1>
      <p>Fill the Form</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={nameOne}
            onChange={(e) => setNameOne(e.target.value)}
            placeholder="Enter player one name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={nameTwo}
            onChange={(e) => setNameTwo(e.target.value)}
            placeholder="Enter player two name"
            required
          />
        </div>
        
        <div>
          <button type="submit" className="start-game-button">Start Game</button>
        </div>
      </form>
      <footer>Provided by your Elham</footer>
    </div>
  );
}

export default FormPage;
