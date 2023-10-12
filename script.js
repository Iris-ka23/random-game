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