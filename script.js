let btnRef = document.querySelectorAll(".btn-opt");
let popupRef = document.querySelector(".slide");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let leaderboardTable = document.getElementById("leaderboard");
const maxGamesToStore = 10;

// Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
// Player 'X' plays first
let xTurn = true;
let count = 0;

// Initialize the leaderboard from local storage or create an empty array
let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  // Enable popup
  popupRef.classList.remove("hide");
};

// Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  // Disable popup
  popupRef.classList.add("hide");
};
// This function is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    let winner = letter == "X" ? "X" : "O";
    let moves = count;
    let result = winner + " Wins in " + moves + " moves";
    msgRef.innerHTML = "&#127878; <br>" + result;
  
    // Play the appropriate sound
    const winSound = document.getElementById("winSound");
    winSound.play();
  
    // Update leaderboard with the result
    leaderboardData.push(result);
    if (leaderboardData.length > maxGamesToStore) {
      leaderboardData.shift();
    }
    updateLeaderboard();
  };