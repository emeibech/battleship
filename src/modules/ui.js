import Player from './Player';

const ui = () => {
  const player1 = Player();
  const player2 = Player(player1.enemy, player1.board);
  const player1Board = document.querySelector('[data-player1]');
  const player2Board = document.querySelector('[data-player2]');

  const generateCoordinates = (counter) => {
    let firstVal;
    let secondVal;

    if (counter < 10) {
      firstVal = 97;
      secondVal = Number(counter) + 1;
    } else {
      firstVal = counter.charCodeAt() + 49;
      secondVal = Number(counter.slice(1, 2)) + 1;
    }

    return `${String.fromCharCode(firstVal)}${secondVal}`;
  };

  const createSquare = (parent, counter) => {
    const square = document.createElement('div');
    square.className = 'coordinates';
    square.setAttribute('data-coordinates', generateCoordinates(`${counter}`));
    parent.appendChild(square);
  };

  const createGrid = () => {
    let counter = 0;
    while (counter < 100) {
      createSquare(player1Board, counter);
      createSquare(player2Board, counter);
      counter += 1;
    }
  };

  const placeShips = () => {
    const loc1 = []
      .concat(...Object.values(player1.board.getLocations()));

    while (loc1.length > 0) {
      const box = document.querySelector(
        `[data-player1] [data-coordinates=${loc1.shift()}]`,
      );
      const overlay = document.createElement('div');
      overlay.className = 'ship';
      box.appendChild(overlay);
    }

    const loc2 = []
      .concat(...Object.values(player2.board.getLocations()));

    while (loc2.length > 0) {
      const box = document.querySelector(
        `[data-player2] [data-coordinates=${loc2.shift()}]`,
      );
      const overlay = document.createElement('div');
      overlay.className = 'ship';
      box.appendChild(overlay);
    }
  };

  createGrid();
  placeShips();

  // player1Board.style.backgroundColor = 'purple';
};

export default ui;
