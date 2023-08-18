const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const attemptsElement = document.getElementById('attempts');
const startButton = document.getElementById('start-button');
let score = 0;
let attempts = 5;
let isPlaying = false;

gameContainer.addEventListener('click', (event) => {
  if (isPlaying && event.target.classList.contains('trash-man')) {
    event.target.style.display = 'none'; // Çöp adamı gizle
    increaseScore();
  }
});

gameContainer.addEventListener('mousedown', () => {
  if (isPlaying) {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.left = event.clientX + 'px';
    bullet.style.top = event.clientY + 'px';
    gameContainer.appendChild(bullet);

    setTimeout(() => {
      bullet.remove();
    }, 300);
  }
});

startButton.addEventListener('click', () => {
  startButton.style.display = 'none';
  isPlaying = true;
  createTrashMan();
  setInterval(createTrashMan, 1000);
});

function createTrashMan() {
  if (isPlaying) {
    const trashMan = document.createElement('div');
    trashMan.className = 'trash-man';

    const xPosition = Math.random() * (gameContainer.offsetWidth - 50);
    const yPosition = Math.random() * (gameContainer.offsetHeight - 50);

    trashMan.style.left = xPosition + 'px';
    trashMan.style.top = yPosition + 'px';

    gameContainer.appendChild(trashMan);

    if (++score % 10 === 0) {
      increaseDifficulty();
    }

    if (score % 10 === 9 && attempts < 5) {
      increaseAttempts();
    }

    if (attempts === 0) {
      gameOver();
    }
  }
}

function increaseScore() {
  score++;
  scoreElement.textContent = 'Puan: ' + score;
}

function increaseDifficulty() {
  clearInterval(createTrashMan);
  const newInterval = 1000 - (score / 10) * 100;
  setInterval(createTrashMan, newInterval > 200 ? newInterval : 200);
}

function increaseAttempts() {
  attempts++;
  attemptsElement.textContent = 'Denemeler: ' + attempts;
}

function gameOver() {
  gameContainer.innerHTML = '<div class="game-over">Oyun Bitti</div>';
}
