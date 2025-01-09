import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

function DXBallGame() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;
    const ball = { x: 240, y: 160, radius: 10, dx: 2, dy: -2 }; // Slower ball movement
    const paddle = { width: 75, height: 10, x: (canvas.width - 75) / 2, y: canvas.height - 10 };
    let bricks = [];
    let brickRowCount = 3;
    let brickColumnCount = 5;
    let brickWidth = 75;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;

    // Initialize bricks
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    const keyDownHandler = (e) => {
      if (e.key === "Right" || e.key === "ArrowRight") {
        if (paddle.x < canvas.width - paddle.width) {
          paddle.x += 7;
        }
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        if (paddle.x > 0) {
          paddle.x -= 7;
        }
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    const drawBricks = () => {
      bricks.forEach((column, c) => {
        column.forEach((brick, r) => {
          if (brick.status === 1) {
            let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            brick.x = brickX;
            brick.y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
          }
        });
      });
    };

    const updateGameArea = () => {
      if (!isPaused && !gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        collisionDetection();

        // Update ball position
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Boundary collision logic
        if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
          ball.dx = -ball.dx;
        }
        if (ball.y + ball.dy < ball.radius) {
          ball.dy = -ball.dy;
        } else if (ball.y + ball.dy > canvas.height - ball.radius) {
          if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
          } else {
            setGameOver(true); // Set game over state
          }
        }
      }
      if (!gameOver) {
        frameId = requestAnimationFrame(updateGameArea);
      }
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    };

    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    };

    const collisionDetection = () => {
      bricks.forEach((column, c) => {
        column.forEach((brick, r) => {
          if (brick.status === 1) {
            if (ball.x > brick.x && ball.x < brick.x + brickWidth && ball.y > brick.y && ball.y < brick.y + brickHeight) {
              ball.dy = -ball.dy;
              brick.status = 0;
              setScore((prevScore) => prevScore + 10);
            }
          }
        });
      });
    };

    frameId = requestAnimationFrame(updateGameArea);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [isPaused, gameOver]);

  return (
    <>
      <canvas ref={canvasRef} width={480} height={320} />
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={() => setIsPaused(!isPaused)} disabled={gameOver}>
        {isPaused ? "Resume" : "Pause"}
      </button>
      {gameOver && (
        <div>
          <h2>Game Over</h2>
          <button onClick={() => window.location.reload(false)}>Restart</button>
        </div>
      )}
      <div>Score: {score}</div>
    </>
  );
}

export default DXBallGame;
