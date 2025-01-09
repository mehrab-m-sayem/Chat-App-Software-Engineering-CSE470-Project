import React, { useEffect, useState, useRef } from "react";

function RacingGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(100); // Speed in Km/h
  const [gameOver, setGameOver] = useState(false);
  const [playerCar, setPlayerCar] = useState({ x: 200, y: 500 });
  const [obstacles, setObstacles] = useState([]);
  const [trees, setTrees] = useState([]);
  const [points, setPoints] = useState([]);
  const obstacleSpeed = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const roadWidth = 400;
    const roadHeight = 600;
    let animationFrameId;

    const drawRoad = () => {
      ctx.fillStyle = "#9b7653"; // Road color
      ctx.fillRect(0, 0, roadWidth, roadHeight);

      // Middle line
      ctx.setLineDash([20, 20]);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(roadWidth / 2, 0);
      ctx.lineTo(roadWidth / 2, roadHeight);
      ctx.stroke();
    };

    const drawTrees = () => {
      trees.forEach((tree, index) => {
        tree.y += obstacleSpeed; // Move tree downward
        ctx.fillStyle = "#228B22"; // Tree green
        ctx.beginPath();
        ctx.arc(tree.x, tree.y, 15, 0, Math.PI * 2); // Circular tree top
        ctx.fill();

        ctx.fillStyle = "#8B4513"; // Tree trunk
        ctx.fillRect(tree.x - 5, tree.y + 15, 10, 20); // Rectangular trunk

        // Remove trees that are off-screen
        if (tree.y > roadHeight) {
          setTrees((prev) => prev.filter((_, i) => i !== index));
        }
      });
    };

    const drawPlayerCar = () => {
      ctx.fillStyle = "blue";
      ctx.fillRect(playerCar.x, playerCar.y, 40, 80);

      ctx.fillStyle = "white";
      ctx.font = "18px Arial";
      ctx.fillText("🚗", playerCar.x + 10, playerCar.y + 40);
    };

    const drawObstacles = () => {
      obstacles.forEach((obstacle, index) => {
        obstacle.y += obstacleSpeed;
        ctx.fillStyle = "red";
        ctx.fillRect(obstacle.x, obstacle.y, 40, 80);

        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.fillText("🚘", obstacle.x + 10, obstacle.y + 40);

        // Check if obstacle is off-screen
        if (obstacle.y > roadHeight) {
          setObstacles((prev) => prev.filter((_, i) => i !== index));
          setScore((prev) => prev + 1); // Increase score when an obstacle goes off-screen
        }

        // Collision detection
        if (
          obstacle.y + 80 >= playerCar.y &&
          obstacle.y <= playerCar.y + 80 &&
          obstacle.x + 40 >= playerCar.x &&
          obstacle.x <= playerCar.x + 40
        ) {
          setGameOver(true);
        }
      });
    };

    const drawPoints = () => {
      points.forEach((point, index) => {
        point.y += obstacleSpeed; // Move point downward
        ctx.fillStyle = "gold"; // Gold color for points
        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2); // Circular point
        ctx.fill();

        // Check if player collects the point
        if (
          point.y + 10 >= playerCar.y &&
          point.y <= playerCar.y + 80 &&
          point.x + 10 >= playerCar.x &&
          point.x <= playerCar.x + 40
        ) {
          setPoints((prev) => prev.filter((_, i) => i !== index)); // Remove collected point
          setScore((prev) => prev + 5); // Add 5 points to the score
        }

        // Remove points that are off-screen
        if (point.y > roadHeight) {
          setPoints((prev) => prev.filter((_, i) => i !== index));
        }
      });
    };

    const drawUI = () => {
      // Score
      ctx.fillStyle = "black";
      ctx.fillRect(10, 10, 140, 40);
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${score}`, 20, 35);

      // Speed
      ctx.fillStyle = "black";
      ctx.fillRect(250, 10, 140, 40);
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText(`${speed} Km/h`, 260, 35);
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, roadWidth, roadHeight);
      drawRoad();
      drawTrees();
      drawPlayerCar();
      drawObstacles();
      drawPoints();
      drawUI();

      if (!gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
      } else {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 100, 300);
        cancelAnimationFrame(animationFrameId);
      }
    };

    gameLoop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [playerCar, obstacles, trees, points, score, speed, gameOver]);

  useEffect(() => {
    const obstacleInterval = setInterval(() => {
      if (!gameOver) {
        const x = Math.random() * (360 - 40) + 20; // Random x position
        setObstacles((prev) => [...prev, { x, y: -80 }]); // Add a new obstacle
      }
    }, 2000);

    const treeInterval = setInterval(() => {
      if (!gameOver) {
        const leftTreeX = Math.random() * 40 + 10; // Left side tree position
        const rightTreeX = Math.random() * 40 + 350; // Right side tree position
        setTrees((prev) => [
          ...prev,
          { x: leftTreeX, y: -80 },
          { x: rightTreeX, y: -80 },
        ]); // Add trees
      }
    }, 1000);

    const pointsInterval = setInterval(() => {
      if (!gameOver) {
        const x = Math.random() * (360 - 40) + 20; // Random x position
        setPoints((prev) => [...prev, { x, y: -80 }]); // Add a new point
      }
    }, 3000);

    return () => {
      clearInterval(obstacleInterval);
      clearInterval(treeInterval);
      clearInterval(pointsInterval);
    };
  }, [gameOver]);

  const handleKeyDown = (e) => {
    if (gameOver) return;

    setPlayerCar((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      if (e.key === "ArrowLeft" && prev.x > 20) newX -= 20; // Move left
      if (e.key === "ArrowRight" && prev.x < 340) newX += 20; // Move right
      if (e.key === "ArrowUp" && prev.y > 0) {
        newY -= 20; // Move up
        setSpeed((prevSpeed) => prevSpeed + 1); // Increase speed
      }
      if (e.key === "ArrowDown" && prev.y < 520) {
        newY += 20; // Move down
        setSpeed((prevSpeed) => (prevSpeed > 0 ? prevSpeed - 1 : 0)); // Decrease speed
      }

      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

  const restartGame = () => {
    setScore(0);
    setSpeed(100);
    setGameOver(false);
    setPlayerCar({ x: 200, y: 500 });
    setObstacles([]);
    setTrees([]);
    setPoints([]);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Car Racing Game</h1>
      <canvas
        ref={canvasRef}
        width={400}
        height={600}
        style={{
          border: "2px solid black",
          marginTop: "20px",
        }}
      ></canvas>
      <div style={{ marginTop: "20px" }}>
        {gameOver && (
          <button
            onClick={restartGame}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "white",
              backgroundColor: "red",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Restart
          </button>
        )}
      </div>
    </div>
  );
}

export default RacingGame;
