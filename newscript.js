const grid = document.getElementById("board");

const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const dice = document.getElementById("dice");

const cells = [];
let player1 = {
  positionX: 0,
  positionY: 9,
  isPlaying: true,
  class: "yellow",
};
let player2 = {
  positionX: 0,
  positionY: 9,
  isPlaying: false,
  class: "red",
};

for (let i = 0; i < 10; i++) {
  const subArray = [];
  for (let j = 0; j < 10; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("x", j);
    cell.setAttribute("y", i);
    subArray.push(cell);
    grid.append(cell);

    // cell.textContent = `X: ${cell.attributes.x.nodeValue}
    //                   Y:${cell.attributes.y.nodeValue}`;
  }
  cells.push(subArray);
}

startButton.addEventListener("click", startGame);

function startGame() {
  showPlayer(player1);
  showPlayer(player2);
}

resetButton.addEventListener("click", resetGame);
function resetGame() {
  removePlayer(player1);
  removePlayer(player2);
  player1.positionX = 0;
  player1.positionY = 9;
  player2.positionX = 0;
  player2.positionY = 9;
  showPlayer(player1);
  showPlayer(player2);
  newGame();
}

function removePlayer(player) {
  cells[player.positionY][player.positionX].classList.remove(player.class);
}

function showPlayer(player) {
  cells[player.positionY][player.positionX].classList.add(player.class);
}

dice.addEventListener("click", rollDice);
let turn = document.getElementById("turn");
function rollDice() {
  let randomDice = Math.floor(Math.random() * 6 + 1);
  let rolled = document.getElementById("rolled");
  rolled.innerHTML = "";
  rolled.textContent = `you have rolled : ${randomDice}`;

  move(randomDice, player1);
  move(randomDice, player2);
  const finishedGame = isGameFinished();
  if (finishedGame) return;
  player1.isPlaying = !player1.isPlaying;
  player2.isPlaying = !player2.isPlaying;

  if (player1.isPlaying) {
    turn.innerHTML = "";
    turn.textContent = "YELLOW PLAYS";
  } else {
    turn.innerHTML = "";
    turn.append("RED PLAYS");
  }
  console.log(player1.positionX);
  console.log(player1.positionY);
}

function move(number, player) {
  if (!player.isPlaying) return;
  removePlayer(player);

  if (player.positionY % 2 === 1) {
    let newPosition = (player.positionX += number);

    if (newPosition <= 9) {
      player.positionX = newPosition;
    } else {
      player.positionY--;
      let moreXthenNeeded = newPosition - 9;
      player.positionX = 9 - moreXthenNeeded + 1;
    }
  } else {
    let newPositionX = (player.positionX -= number);
    if (newPositionX >= 0) {
      player.positionX = newPositionX;
    } else {
      player.positionY--;
      let lessXthenNeeded = 0 - newPositionX;
      player.positionX = lessXthenNeeded - 1;
    }
  }
  //   console.log(player);
  if (player.positionY < 0) {
    player.positionY = 0;
    player.positionX = 0;
  }

  snakes(player);
  ladders(player);

  showPlayer(player);
}

let obstacle = document.getElementById("obstacle");
function snakes(player) {
  obstacle.textContent = "";

  if (player.positionX === 5 && player.positionY === 7) {
    obstacle.textContent = `Oh no! A snake. ${player.class} moves down`;
    player.positionX = 4;
    player.positionY = 9;
  }
  if (player.positionX === 1 && player.positionY === 2) {
    obstacle.textContent = `Oh no! A snake bit player ${player.class} moves down`;
    player.positionX = 0;
    player.positionY = 7;
  }
  if (player.positionX === 4 && player.positionY === 4) {
    obstacle.textContent = `Oh no! A snake bit player ${player.class} moves down`;
    player.positionX = 5;
    player.positionY = 5;
  }
  if (player.positionX === 9 && player.positionY === 3) {
    obstacle.textContent = `Oh no! A snake bit player ${player.class} moves down`;
    player.positionX = 9;
    player.positionY = 6;
  }
  if (player.positionX === 5 && player.positionY === 0) {
    obstacle.textContent = `Oh no! A snake bit player ${player.class} moves down`;
    player.positionX = 4;
    player.positionY = 2;
  }
  if (player.positionX === 9 && player.positionY === 0) {
    obstacle.textContent = `Oh no! A snake bit player ${player.class} moves down`;
    player.positionX = 8;
    player.positionY = 3;
  }
}

function ladders(player) {
  obstacle.textContent = "";
  if (player.positionX === 8 && player.positionY === 9) {
    obstacle.textContent = `Yes! ${player.class} found a ladder. You go up.`;
    player.positionX = 9;
    player.positionY = 7;
  }
  if (player.positionX === 1 && player.positionY === 6) {
    obstacle.textContent = `Yes! ${player.class} found a ladder. You go up.`;
    player.positionX = 0;
    player.positionY = 3;
  }
  if (player.positionX === 4 && player.positionY === 6) {
    obstacle.textContent = `Yes! ${player.class} found a ladder. You go up.`;
    player.positionX = 5;
    player.positionY = 3;
  }
  if (player.positionX === 9 && player.positionY === 6) {
    obstacle.textContent = `Yes! ${player.class} found a ladder. You go up.`;
    player.positionX = 8;
    player.positionY = 3;
  }
}

function isGameFinished() {
  if (
    player1.positionY < 0 ||
    (player1.positionX === 0 && player1.positionY === 0)
  ) {
    turn.innerHTML = "";
    turn.append(`GAME OVER ${player1.class} wins!`);
    return true;
  }
  if (
    player2.positionY < 0 ||
    (player2.positionX === 0 && player2.positionY === 0)
  ) {
    turn.innerHTML = "";
    turn.append(`GAME OVER ${player2.class} wins!`);
    return true;
  }
  return false;
}
// function winner(player) {
//   if (player.positionX === 0 && player.positionY === 0) {
//     turn.innerHTML = "";
//     turn.append(`GAME OVER ${player.class} wins!`);
//   }
// }

function newGame() {
  turn.innerHTML = "";
  rolled.innerHTML = "";
}
