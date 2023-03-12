import Gameboard from './Gameboard';

const Player = (board = Gameboard(), enemy = Gameboard()) => {
  const attacks = [];

  const attack = (coord, cb = enemy.receiveAttack) => cb(coord);

  const recordAttack = (coord) => attacks.push(coord);

  const getAttackHistory = () => attacks;

  const purgeAttacks = () => {
    while (attacks.length > 0) attacks.pop();
  };

  const resetPlayer = () => {
    board.restoreShips();
    board.purgeHits();
    board.purgeMissedShots();
    purgeAttacks();
  };

  const resetAI = () => {
    board.purgeShips();
    board.purgeHits();
    board.purgeMissedShots();
    board.assignRandomCoordinates();
    purgeAttacks();
  };

  return {
    board,
    enemy,
    attack,
    recordAttack,
    getAttackHistory,
    resetPlayer,
    resetAI,
  };
};

export default Player;
