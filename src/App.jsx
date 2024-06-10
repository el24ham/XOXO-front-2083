import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './MenuPage';
import FormPage from './FormPage';
import ScoresPage from './ScoresPage';
import GamePage from './GamePage';
import './App.css'; 


function App() {
  const [playerNames, setPlayerNames] = useState({ playerOne: '', playerTwo: '' });

  function handleStartGame(names) {
    setPlayerNames(names);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/form" element={<FormPage onStartGame={handleStartGame} />} />
          <Route path="/game" element={<GamePage playerNames={playerNames} />} />
          <Route path="/scores" element={<ScoresPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
