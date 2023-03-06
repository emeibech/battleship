import Gameboard from './Gameboard';

const Player = (enemy = Gameboard()) => {
  const board = Gameboard();

  const attack = (coord, cb = enemy.receiveAttack) => cb(coord);

  return {
    board,
    attack,
  };
};

export default Player;
