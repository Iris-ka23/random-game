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
  const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
  
    // Play the draw sound
    const drawSound = document.getElementById("drawSound");
    drawSound.play();
  
    // Update leaderboard with the result
    leaderboardData.push("Draw");
    if (leaderboardData.length > maxGamesToStore) {
      leaderboardData.shift();
    }
    updateLeaderboard();
  };
  // Update and display the leaderboard
const updateLeaderboard = () => {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
    let leaderboardHTML = leaderboardData.map((result, index) => {
      return `<tr><td>${index + 1}</td><td>${result}</td></tr>`;
    });
    leaderboardTable.innerHTML = leaderboardHTML.join("");
  };
  // New Game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
  });
  
  restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
  });
  // Win Logic
const winChecker = () => {
    // Loop through all win patterns
    for (let i of winningPattern) {
      let [element1, element2, element3] = [
        btnRef[i[0]].innerText,
        btnRef[i[1]].innerText,
        btnRef[i[2]].innerText,
      ];
      // Check if elements are filled
      // If 3 empty elements are same and would give win as would
      if (element1 != "" && element2 != "" && element3 != "") {
        if (element1 == element2 && element2 == element3) {
          // If all 3 buttons have the same values, then pass the value to winFunction
          winFunction(element1);
        }
      }
    }
  };
  // Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
      if (xTurn) {
        xTurn = false;
        // Display X
        element.innerText = "X";
        element.disabled = true;
      } else {
        xTurn = true;
        // Display Y
        element.innerText = "O";
        element.disabled = true;
      }
      // Increment count on each click
      count += 1;
      if (count == 9) {
        drawFunction();
      }
      // Check for win on every click
      winChecker();
    });
  });
  
  // Enable Buttons and disable popup on page load
  window.onload = () => {
    enableButtons();
    updateLeaderboard();
  };