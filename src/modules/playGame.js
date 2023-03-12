import userInterface from './userInterface';
import Player from './Player';

let player1 = Player();
let dumbAI = Player(player1.enemy, player1.board);
let ui = userInterface(player1, dumbAI);
const truthyOrFalsy = () => Math.floor(Math.random() * 2);
const board1Selector = '[data-board1]';
const board2Selector = '[data-board2]';

const declareHit = (board, coord) => {
  ui.renderHit(board, coord);
};

const declareMiss = (board, coord) => {
  ui.renderMiss(board, coord);
};

const declareWinner = (player) => {
  ui.changeAnnouncement(`${player} won the game`);
  ui.renderBoardOverlay();
  ui.renderPlayAgainBtn();
};

const play2 = () => {
  setTimeout(() => {
    const attackHistory = dumbAI.getAttackHistory();

    let coord = dumbAI.board.getRandomCoordinates();

    while (attackHistory.includes(coord)) {
      coord = dumbAI.board.getRandomCoordinates();
    }

    const result = dumbAI.attack(coord);

    if (result) declareHit(board1Selector, coord);
    if (result === null) declareMiss(board1Selector, coord);

    dumbAI.recordAttack(coord);

    if (player1.board.isFleetDestroyed()) {
      declareWinner('Dumb AI');
      return;
    }

    ui.removeOverlay();
  }, 250);
};

const play1 = (e) => {
  const attackHistory = player1.getAttackHistory();
  const miss = e.target.getAttribute('data-coordinates');
  const hit = e.target.getAttribute('data-ship');

  if (
    (attackHistory.includes(hit) || attackHistory.includes(miss))
  ) return;

  if (miss) {
    player1.attack(miss);
    declareMiss(board2Selector, miss);
    player1.recordAttack(miss);
  }

  if (hit) {
    player1.attack(hit);
    declareHit(board2Selector, hit);
    player1.recordAttack(hit);
  }

  if (dumbAI.board.isFleetDestroyed()) {
    declareWinner('Player 1');
    return;
  }

  ui.renderBoardOverlay();
  play2();
};

const reset = (playGame) => {
  const playAgain = document.querySelector('[data-play]');

  if (playAgain) {
    playAgain.addEventListener('click', () => {
      ui.removeOverlay();
      ui.removeElement(playAgain);
      ui.resetBoards();
      player1 = Player();
      dumbAI = Player(player1.enemy, player1.board);
      ui = userInterface(player1, dumbAI);
      ui.renderStartBtn();
      playGame(document.querySelector('[data-start]'));
      ui.changeAnnouncement('Arrange your ships');
    });
  }
};

const handleStartClick = (playGame) => {
  const board = document.querySelector(`${board2Selector}`);
  if (truthyOrFalsy()) {
    ui.changeAnnouncement('The Nine Divines have chosen Dumb AI to go first');
    ui.renderBoardOverlay();
    play2();
  } else {
    ui.changeAnnouncement('The Nine Divines have chosen Player 1 to go first');
  }

  board.addEventListener('click', (e) => {
    play1(e);
    reset(playGame);
  });
};

const playGame = (btn) => {
  btn.addEventListener('click', () => {
    ui.removeElement(btn);
    handleStartClick(playGame);
  });
};

export default playGame;
