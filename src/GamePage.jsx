import React, { useState, useEffect } from "react";
import "./GamePage.css";
import axios from "axios";

function GamePage({ playerNames }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ playerOne: 0, playerTwo: 0 });
  const [loading, setLoading] = useState(true);
  const winner = calculateWinner(board);

  useEffect(() => {
    console.log("playerNames:", playerNames);
    async function fetchScores() {
      try {
        const responseOne = await axios.get(`http://127.0.0.1:8000/player_score/${playerNames.player_one}`);
        const responseTwo = await axios.get(`http://127.0.0.1:8000/player_score/${playerNames.player_two}`);
        console.log("Fetched Scores:", responseOne.data.score, responseTwo.data.score);
        setScores({ playerOne: responseOne.data.score, playerTwo: responseTwo.data.score });
      } catch (error) {
        console.error("Error fetching scores", error);
      } finally {
        setLoading(false);
      }
    }
    if (playerNames.player_one && playerNames.player_two) {
      fetchScores();
    } else {
      setLoading(false);
    }
  }, [playerNames]);

  function handleClick(index) {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  async function updateScore(winner) {
    const playerName = winner === 'X' ? playerNames.player_one : playerNames.player_two;
    const status = "WIN";

    try {
      console.log("Sending update request:", { name: playerName, status: status });
      const response = await axios.post("http://127.0.0.1:8000/update_score/", {
        name: playerName,
        status: status
      });
      console.log("Score updated successfully", response.data);
      setScores(prevScores => ({
        ...prevScores,
        [winner === 'X' ? 'playerOne' : 'playerTwo']: response.data.score
      }));
    } catch (error) {
      console.error("Failed to update score", error.response ? error.response.data : error);
    }
  }

  useEffect(() => {
    if (winner) {
      setTimeout(() => setBoard(Array(9).fill(null)), 3000);
      updateScore(winner);
    }
  }, [winner]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <div className="scores">
        <div>BLUE (X) {playerNames.player_one}: {scores.playerOne}</div>
        <div>RED (O) {playerNames.player_two}: {scores.playerTwo}</div>
      </div>
      <div className="board">
        {board.map((value, index) => (
          <button key={index} onClick={() => handleClick(index)} className={`square ${value}`}>
            {value}
          </button>
        ))}
      </div>
      {winner && <p className="game-over">{winner === 'X' ? 'BLUE wins!' : 'RED wins!'}</p>}
    </div>
  );
}

export default GamePage;
