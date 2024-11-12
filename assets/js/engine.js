const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
    life: document.querySelector('#life')
  },
  values: {
    timerId: null,
    restartId: null,
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    countLife: 3,
    currentTime: 60
  },
  actions: {
    countDownTimerId: setInterval(countDown, 1000)
  }
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    alert('O seu resultado foi: ' + state.values.result);
  }
}

function countLife() {
  state.values.countLife--;
  state.view.life.textContent = `x${state.values.countLife}`;

  if (state.values.countLife <= 0) {
    playSound('game-over');

    state.values.restartId = setInterval(restart, 4000);
  }
}

function playSound(audioName) {
  let audio = new Audio(`./assets/src/audios/${audioName}.m4a`);
  audio.volume = 0.4;

  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove('enemy');
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add('enemy');
  state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound('hit');
      } else {
        countLife();
      }
    });
  });
}

function restart() {
  location.reload();
}

function init() {
  moveEnemy();
  addListenerHitBox();
}

init();