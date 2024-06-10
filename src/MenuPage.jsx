import React from "react";
import { useNavigate } from 'react-router-dom';
import './MenuPage.css'; 

function MenuPage() {
  let navigate = useNavigate();

  function handleStartClick() {
    navigate('/form');
  }

  function handleScoresClick() {
    navigate('/scores');
  }


  return (
    <div className="menu"> 
      <h1>Tic-Tac-Toe</h1>
      <button className="start-button" onClick={handleStartClick}>START</button>
      <button className="scores-button" onClick={handleScoresClick}>SCORES</button>
      <footer>Provided by Elham</footer>
    </div>
  );
}

export default MenuPage;
