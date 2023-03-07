import Gameboard from './Gameboard';

const Player = (board = Gameboard(), enemy = Gameboard()) => {
  const attack = (coord, cb = enemy.receiveAttack) => cb(coord);

  return {
    board,
    enemy,
    attack,
  };
};

export default Player;
