"use strict";

// variables

const containerGame = document.querySelector(".container");
let playerTxt = document.querySelector(".message");
let restart = document.getElementById("restart");
let boxes = document.querySelectorAll(".box");

const playerO = 'O';
const playerX = 'X';

let currentPlayer = playerX;
let blocks = Array(9).fill(null);

let winnerWon = getComputedStyle(document.body).getPropertyValue("--darkColor");

const startGame = () => {
    boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

// when a player makes a move

function boxClicked(e) {

    console.log(e.target.id);

    const id = e.target.id;
    if (!blocks[id]) {
        blocks[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerWins() != false) {
            playerTxt.innerHTML = `<h3 class="message">Congrats Player ${currentPlayer}!</h3>`
            winnerWon = playerWins();
            winnerWon.map(
                (box) => (boxes[box].style.backgroundColor = "#d1ffbd"),
            );

            containerGame.classList.add('success');
        };

        currentPlayer = currentPlayer == playerX ? playerO : playerX;
    }
};

// winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//when player wins
function playerWins() {
    for (const condition of winningCombinations) {
        let [a, b, c] = condition;
        if (blocks[a] && blocks[a] == blocks[b] && blocks[a] == blocks[c])
            return [a, b, c];
    }
    return false;
}

// restart game
restart.addEventListener('click', restartGame);

function restartGame() {
    blocks.fill(null);

    boxes.forEach((box)=>{
        box.innerHTML = "";
        box.style.backgroundColor = "";
    })
    playerTxt.innerHTML = "Tic Tac Toe";
    currentPlayer = playerX;
    containerGame.classList.remove('success');
}

startGame();