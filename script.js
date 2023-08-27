const player1 = {
    id: "player1",
    score: 0,
    scoreDisplay: document.getElementById("score1"),
    rollBtn: document.getElementById("roll1"),
  };
  
  const player2 = {
    id: "player2",
    score: 0,
    scoreDisplay: document.getElementById("score2"),
    rollBtn: document.getElementById("roll2"),
  };


  const diceImages = {
    1: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Alea_1.png",
    2: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Alea_2.png",
    3: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Alea_3.png",
    4: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Alea_4.png",
    5: "https://upload.wikimedia.org/wikipedia/commons/5/55/Alea_5.png",
    6: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Alea_6.png",
  };

  const resetButton = document.getElementById("reset");
  let currentPlayer = player1;

  function rollDice() {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    const diceImage = diceImages[diceValue];
    const diceElement = document.getElementById(currentPlayer.id === "player1" ? "dice1" : "dice2");    
    diceElement.src = diceImage;
    
    currentPlayer.score += diceValue;
    currentPlayer.scoreDisplay.textContent = currentPlayer.score;
  
    if (currentPlayer.score >= 30) {
        currentPlayer.rollBtn.disabled = true;
        resetButton.disabled = false;
        const winnerMessage = `${currentPlayer.id} wins!`;
        const winnerMessageElement = document.createElement("p");
        winnerMessageElement.style.background = "green";
        winnerMessageElement.style.height = "25px";
        winnerMessageElement.textContent = winnerMessage;
        winnerMessageElement.className = "winner-message"; // Add a class for styling
        currentPlayer.scoreDisplay.parentElement.appendChild(winnerMessageElement);
        console.log(winnerMessage);
      }else {
      currentPlayer.rollBtn.disabled = true;
      toggleCurrentPlayer();
    }
  }
  
  

//    to toggle the palyer after each time after clicking a button
  
  function toggleCurrentPlayer() {
    currentPlayer.rollBtn.disabled = true;
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    currentPlayer.rollBtn.disabled = false;
  }

//   reset the game
  
  function resetGame() {
    player1.score = 0;
    player2.score = 0;
    player1.scoreDisplay.textContent = "0";
    player2.scoreDisplay.textContent = "0";
    player1.rollBtn.disabled = false;
    player2.rollBtn.disabled = true;
    resetButton.disabled = true;
    currentPlayer = player1;
    const winnerMessageElements = document.querySelectorAll(".winner-message");
    winnerMessageElements.forEach(element => element.remove());
    

    const diceElements = document.querySelectorAll(".play-post");
    diceElements.forEach(element => {
         element.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Dice-0.png/180px-Dice-0.png";
    });
  }
  
  player1.rollBtn.addEventListener("click", rollDice);
  player2.rollBtn.addEventListener("click", rollDice);
  resetButton.addEventListener("click", resetGame);
  
  resetGame(); // Initialize game state
  