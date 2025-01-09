// src/components/ChessGame.jsx
import React, { useState } from 'react';
import { Chess } from 'chess.js'; // chess.js for chess logic
import { Chessboard } from 'react-chessboard'; // react-chessboard for the visual chessboard

function ChessGame() {
  const [game, setGame] = useState(new Chess()); // Initializes the chess game logic
  const [fen, setFen] = useState(game.fen()); // Tracks the current board position in FEN notation

  // Handles moves made on the chessboard
  const handleMove = (move) => {
    let moveObj = { from: move.sourceSquare, to: move.targetSquare, promotion: 'q' }; // Assume promotion to queen for simplicity
    let result = game.move(moveObj);

    if (result) { // If the move is legal
      setFen(game.fen()); // Update the FEN to the new position
    } else {
      console.error('Invalid move'); // Log an error if the move is illegal
    }
    return result !== null; // Return true if the move was made, false otherwise
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>  // Adjusted maxWidth to 400px for medium size
        <Chessboard
          position={fen} // Sets the current position of the board
          onPieceDrop={(sourceSquare, targetSquare) =>
            handleMove({ sourceSquare, targetSquare })
          }
          boardWidth={700} // Set boardWidth to 400px for a medium-sized board
        />
      </div>
    </div>
  );
}

export default ChessGame;
