const actors = [
  "images/bucks.jpg",  
  "images/Lakers.jpg",
  "images/kings.jpg",  
  "images/rockets.jpg",  
  "images/warriors.jpg",  
  "images/chikakobulls.jpg"   
];

let cards = [...actors, ...actors];
let flippedCards = [];
let matchedCards = [];
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

const gameBoard = document.getElementById('game-board');
const player1ScoreDisplay = document.getElementById('player1-score');
const player2ScoreDisplay = document.getElementById('player2-score');
const turnIndicator = document.getElementById('turn-indicator');
const resultDisplay = document.getElementById('result');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(image) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');
  cardFront.style.backgroundImage = `url(${image})`;

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  cardBack.style.backgroundImage = 'url(images/jordan.jpg)';
  cardBack.style.backgroundSize= 'cover';
  cardBack.style.backgroundPosition = 'center';

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  card.addEventListener('click', () => flipCard(card, image));
  return card;
}

function flipCard(card, image) {
  if (flippedCards.length < 2 && !flippedCards.includes(card) && !card.classList.contains('matched')) {
      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
          setTimeout(checkForMatch, 800);
      }
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  const image1 = card1.querySelector('.card-front').style.backgroundImage;
  const image2 = card2.querySelector('.card-front').style.backgroundImage;

  if (image1 === image2) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedCards.push(card1, card2);
      updateScore();
  } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
  }

  flippedCards = [];
  switchTurn();
  checkWin();
}

function updateScore() {
  if (currentPlayer === 1) {
      player1Score++;
      player1ScoreDisplay.textContent = player1Score;
  } else {
      player2Score++;
      player2ScoreDisplay.textContent = player2Score;
  }
}

function switchTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  if (matchedCards.length === cards.length) {
      if (player1Score > player2Score) {
          resultDisplay.textContent = "Player 1 Wins!";
      } else if (player2Score > player1Score) {
          resultDisplay.textContent = "Player 2 Wins!";
      } else {
          resultDisplay.textContent = "It's a Tie!";
      }
      resultDisplay.style.display = "block";
  }
}

function initGame() {
  cards = shuffle(cards);
  gameBoard.innerHTML = '';
  matchedCards = [];
  flippedCards = [];
  player1Score = 0;
  player2Score = 0;
  player1ScoreDisplay.textContent = player1Score;
  player2ScoreDisplay.textContent = player2Score;
  turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
  resultDisplay.style.display = "none";

  cards.forEach(image => {
      const card = createCard(image);
      gameBoard.appendChild(card);
  });
}

// New Game button functionality
document.getElementById('new-game-btn').addEventListener('click', initGame);

initGame();
