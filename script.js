const logo = [
  "images/bucks.jpg",  
  "images/Lakers.jpg",
  "images/kings.jpg",  
  "images/rockets.jpg",  
  "images/warriors.jpg",  
  "images/chikakobulls.jpg"   
];

let cards = [...logo, ...logo];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = logo.length;
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
  cardBack.style.backgroundSize = 'cover';
  cardBack.style.backgroundPosition = 'center';

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  card.setAttribute('data-image', image);
  card.addEventListener('click', () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (flippedCards.length < 2 && !flippedCards.includes(card) && !card.classList.contains('matched')) {
      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
          setTimeout(checkMatch, 800);
      }
  }
}

function checkMatch() {
  let firstCard = flippedCards[0];
  let secondCard = flippedCards[1];

  let isMatch = firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image');

  if (isMatch) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");

      updateScore();
      matchedPairs++;

      checkWin();
      resetBoard(true);  // Keep turn if matched
  } else {
      setTimeout(() => {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");

          resetBoard(false); // Switch turn only if no match
      }, 1000);
  }
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

  document.getElementById('player1-score').parentElement.classList.remove('active');
  document.getElementById('player2-score').parentElement.classList.remove('active');

  if (currentPlayer === 1) {
      document.getElementById('player1-score').parentElement.classList.add('active');
  } else {
      document.getElementById('player2-score').parentElement.classList.add('active');
  }
}

function checkWin() {
  if (matchedPairs === totalPairs) {
      let winner;
      
      if (player1Score > player2Score) {
          winner = 1;
      } else if (player2Score > player1Score) {
          winner = 2;
      } else {
          winner = 0; // Draw case
      }

      document.getElementById('player1-score').parentElement.classList.remove('active');
      document.getElementById('player2-score').parentElement.classList.remove('active');

      if (winner === 1) {
          document.getElementById('player1-score').parentElement.classList.add('winner');
      } else if (winner === 2) {
          document.getElementById('player2-score').parentElement.classList.add('winner');
      } else {
          turnIndicator.textContent = "It's a Draw!";
          return;
      }

      turnIndicator.textContent = `🎉 Player ${winner} Wins! 🎉`;
  }
}

function resetBoard(keepTurn) {
  flippedCards = []; // Fix: Clear flippedCards so next turn works

  if (!keepTurn) {
      switchTurn();
  }
}

function initGame() {
  cards = shuffle(cards);
  gameBoard.innerHTML = '';
  matchedPairs = 0;
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

  document.getElementById('player1-score').parentElement.classList.add('active');
}

document.getElementById('new-game-btn').addEventListener('click', initGame);

initGame();
