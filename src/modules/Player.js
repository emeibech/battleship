import Gameboard from './Gameboard';

const Player = (board = Gameboard(), enemy = Gameboard()) => {
  const attacks = [];

  const attack = (coord, cb = enemy.receiveAttack) => cb(coord);

  const recordAttack = (coord) => attacks.push(coord);

  const getAttackHistory = () => attacks;

  return {
    board,
    enemy,
    attack,
    recordAttack,
    getAttackHistory,
  };
};

export default Player;
