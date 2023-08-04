const cards = [];
let bombIndex;

function createCards() {
  cards.length = 0;
  bombIndex = Math.floor(Math.random() * 25);

  for (let i = 0; i < 25; i++) {
    if (i === bombIndex) {
      cards.push(2);
    } else {
      cards.push('⭐');
    }
  }
}

function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function revealCard(index) {
  const card = document.getElementById(index);
  if (cards[index] === 2) {
    card.innerText = '💣';
    showResultModal('You lost! Try again.');
  } else {
    card.innerText = cards[index];
    card.classList.add('revealed');
    checkWin();
  }
}

function checkWin() {
  const revealedCards = document.querySelectorAll('.card.revealed');
  if (revealedCards.length === 24) {
    showResultModal('Congratulations! You won!');
  }
}

function showResultModal(message) {
  const modal = document.getElementById('modal');
  const modalText = document.getElementById('modalText');
  modalText.textContent = message;
  modal.style.display = 'block';

  const closeModal = document.getElementById('closeModal');
  closeModal.addEventListener('click', () => {
    hideModal();
    startGame(); // Reset the cards on modal close
  });
}

function hideModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function createGame() {
  const gameContainer = document.getElementById('gameContainer');
  gameContainer.innerHTML = '';

  for (let i = 0; i < 25; i++) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.setAttribute('id', i);
    cardElement.addEventListener('click', () => revealCard(i));
    gameContainer.appendChild(cardElement);
  }
}

function startGame() {
  createCards();
  shuffleCards();
  createGame();
}

startGame();
