const game = document.querySelector(".game");
const dice = document.querySelector(".dice");
const players = document.querySelectorAll(".player");
const startGameBtn = document.querySelector(".start-game");
const rollBtn = document.querySelector(".btns .roll");
const holdBtn = document.querySelector(".btns .hold");
const newGameBtn = document.querySelector(".btns .new-game");
let finalScore;

// On Start Game Click
startGameBtn.addEventListener("click", _ => {
  let details = document.querySelector(".details")
  let playerOneName = document.querySelector(".player1-name").value;
  let playerTwoName = document.querySelector(".player2-name").value;
  let gameFinalScore = document.querySelector(".final-socer").value;
  if(playerOneName && playerTwoName && gameFinalScore) {
    document.querySelector(".player1 h2").innerHTML = playerOneName;
    document.querySelector(".player2 h2").innerHTML = playerTwoName;
    document.querySelector("header h1 .final-score-value").innerHTML = gameFinalScore;
    finalScore = +gameFinalScore;
    details.remove();
  }
});

// On Roll Click
rollBtn.addEventListener("click", _ => {

  // Shake The Dice
  dice.classList.add("shake");
  setTimeout(() => {
    dice.classList.remove("shake");
  }, 400);

  // Add Dots To Dice
  dice.innerHTML = ""
  let dotsNumber = Math.ceil(Math.random() * 6);
  for(let i = 0; i < dotsNumber; i++) {
    let dot = document.createElement("div");
    dot.classList.add("dot");
    dice.appendChild(dot);
  }

  // Layout Of Dots In The Dice
  layoutDots(dotsNumber);
  
  // Sum Total Turn
  if(dotsNumber != 1) {
    let turnTotal = document.querySelector(".player.turn .turn-total span").innerHTML;
    document.querySelector(".player.turn .turn-total span").innerHTML = +turnTotal + dotsNumber;
  } else {
    changePlayersTurn();
  }

});

// Layout Of Dots In The Dice Function
function layoutDots(dotsNumber) {
  let dots = document.querySelectorAll(".dice .dot");
  switch(dotsNumber) {
    case 1 :
      dots[0].classList.add("center", "middle");
      break;
    case 2 :
      dots[0].classList.add("right", "top");
      dots[1].classList.add("left", "bottom");
      break;
    case 3 :
      dots[0].classList.add("right", "top");
      dots[1].classList.add("center", "middle");
      dots[2].classList.add("left", "bottom");
      break;
    case 4 :
      dots[0].classList.add("left", "top");
      dots[1].classList.add("right", "top");
      dots[2].classList.add("left", "bottom");
      dots[3].classList.add("right", "bottom");
      break;
    case 5 :
      dots[0].classList.add("left", "top");
      dots[1].classList.add("right", "top");
      dots[2].classList.add("center", "middle");
      dots[3].classList.add("left", "bottom");
      dots[4].classList.add("right", "bottom");
      break;
    case 6 :
      dots[0].classList.add("left", "top");
      dots[1].classList.add("left", "middle");
      dots[2].classList.add("left", "bottom");
      dots[3].classList.add("right", "top");
      dots[4].classList.add("right", "middle");
      dots[5].classList.add("right", "bottom");
      break;
  }
}

// On Hold Click
holdBtn.addEventListener("click", () => {

  // Add Total Turn To Score
  let turnTotal = document.querySelector(".player.turn .turn-total span").innerHTML;
  let totalScore = document.querySelector(".player.turn .total-score span").innerHTML;
  document.querySelector(".player.turn .total-score span").innerHTML = +totalScore + +turnTotal;

  // Check If There Is A Winner
  if(document.querySelector(".player.turn .total-score span").innerHTML >= finalScore) {
    let winnerName = document.querySelector(".player.turn h2").innerHTML;
    declareTheWinner(winnerName);
  }
  else {
    changePlayersTurn();
    dice.innerHTML="";
  }

});

// Change Players Turn Function
function changePlayersTurn() {
  document.querySelector(".player.turn span").innerHTML = 0;
  players.forEach(player => {
    player.classList.contains("turn") ? player.classList.remove("turn") : player.classList.add("turn");
  })
}

// Declare The Winner Function
function declareTheWinner(winnerName) {
  rollBtn.style.pointerEvents = "none";
  holdBtn.style.pointerEvents = "none";

  // Winner Text
  let span = document.createElement("span");
  span.appendChild(document.createTextNode("Winner!"));
  span.style.color = "green"
  span.style.display = "block"
  document.querySelector(".player.turn h2").appendChild(span);

  // Declare The Winner
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(`${winnerName} is The Winner`));
  div.className = "winner";
  setTimeout(() => {
    div.classList.add("show")
  }, 200);
  game.appendChild(div);
  document.querySelector('.win').play();
}

// On Start New Game Click
newGameBtn.addEventListener("click", _ => {
  location.reload();
});

/* Change Colors */
let colors = document.querySelectorAll(".colors span");
colors.forEach(color => {
  color.style.backgroundColor = color.dataset.color;
  color.addEventListener("click", _ => {
    colors.forEach(color => {
      color.classList.remove("active");
    });
    color.classList.add("active");
    document.querySelector(":root").style.setProperty("--primary-color", color.dataset.color);
  });
});