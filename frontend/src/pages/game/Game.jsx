import React from 'react';
import { useNavigate } from 'react-router-dom';
import chessImage from '../game/chess.jpeg';
import ballImage from '../game/ball.jpg';
import raceImage from '../game/race.jpeg';


function Game() {
  const navigate = useNavigate();

  const games = [
    { name: 'Chess', path: '/chess', img: chessImage },
    { name: 'DX Ball', path: '/dxball', img: ballImage },
    { name: 'Racing Game', path: '/racing', img: raceImage }
  ];
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px' }}>
      {games.map(game => (
        <div key={game.name} onClick={() => navigate(game.path)} style={{ cursor: 'pointer', width: '200px' }}>
          <img src={game.img} alt={game.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
          <h3 style={{ textAlign: 'center' }}>{game.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Game;
