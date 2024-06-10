import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ScoresPage.css';

function ScoresPage() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/scores/")
            .then(response => {
                console.log("Scores fetched successfully:", response.data);
                setScores(response.data.slice(0, 10));
            })
            .catch(error => {
                console.error("Error fetching scores:", error);
                console.log(error.response);
            });
    }, []);

    return (
        <div className="scores-page">
            <h1>Tic Tac Toe</h1>
            <h2>Score Table (Top 10)</h2>
            <table className="score-table">
                <thead>
                    <tr>
                        <th className="score-cell">Row</th>
                        <th className="score-cell">Name</th>
                        <th className="score-cell">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={index} className="score-row">
                            <td className="score-cell">{index + 1}</td>
                            <td className="score-cell">{score.name}</td>
                            <td className="score-cell">{score.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ScoresPage;
