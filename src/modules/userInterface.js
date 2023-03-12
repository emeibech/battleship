const userInterface = (player1, player2) => {
  const player1ui = {
    selector: '[data-board1]',
    board: document.querySelector('[data-board1]'),
  };

  const player2ui = {
    selector: '[data-board2]',
    board: document.querySelector('[data-board2]'),
  };

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

  const renderGrid = () => {
    let counter = 0;
    while (counter < 100) {
      createSquare(player1ui.board, counter);
      createSquare(player2ui.board, counter);
      counter += 1;
    }
  };

  const createShipsOverlay = (player, playerui) => {
    const loc = []
      .concat(...Object.values(player.board.getLocations()));

    while (loc.length > 0) {
      const coord = loc.shift();
      const box = document.querySelector(
        `${playerui.selector} [data-coordinates=${coord}]`,
      );
      const overlay = document.createElement('div');
      overlay.className = 'ship';
      overlay.setAttribute('data-ship', `${coord}`);
      box.appendChild(overlay);
    }
  };

  const renderShips = () => {
    createShipsOverlay(player1, player1ui);
    createShipsOverlay(player2, player2ui);
  };

  const removeElement = (element) => {
    if (element) element.parentElement.removeChild(element);
  };

  const changeAnnouncement = (text) => {
    const para = document.querySelector('[data-announcement]');
    para.textContent = text;
  };

  const directTurn = (text) => {
    const para = document.querySelector('[data-directive]');
    para.textContent = text;
  };

  const renderHit = (board, coord) => {
    const box = document.querySelector(`${board} [data-ship="${coord}"]`);
    box.textContent = 'x';
    box.className = 'ship hit';
  };

  const renderMiss = (board, coord) => {
    const box = document.querySelector(
      `${board} [data-coordinates="${coord}"]`,
    );
    box.textContent = 'O';
    box.className = 'coordinates miss';
  };

  const renderBoardOverlay = () => {
    const boards = document.querySelector('[data-boards]');
    const overlay = document.createElement('div');
    overlay.className = 'boards-overlay';
    overlay.setAttribute('data-overlay', '');
    boards.appendChild(overlay);
  };

  const renderPlayAgainBtn = () => {
    const info = document.querySelector('[data-info]');
    const playAgain = document.createElement('button');
    playAgain.textContent = 'Play Again';
    playAgain.className = 'btn';
    playAgain.setAttribute('data-play', '');
    info.appendChild(playAgain);
  };

  const removeOverlay = () => {
    const overlay = document.querySelector('[data-overlay]');
    removeElement(overlay);
  };

  const resetBoards = () => {
    const parent = document.querySelector('[data-boards]');
    const board1 = document.querySelector('[data-board1]');
    const board2 = document.querySelector('[data-board2]');
    parent.removeChild(board1);
    parent.removeChild(board2);
    const newBoard1 = document.createElement('div');
    const newBoard2 = document.createElement('div');
    newBoard1.className = 'board1';
    newBoard2.className = 'board2';
    newBoard1.setAttribute('data-board1', '');
    newBoard2.setAttribute('data-board2', '');
    parent.append(newBoard1, newBoard2);
  };

  const renderStartBtn = () => {
    const info = document.querySelector('[data-info]');
    const playAgain = document.createElement('button');
    playAgain.textContent = 'Start Game';
    playAgain.className = 'btn';
    playAgain.setAttribute('data-start', '');
    info.appendChild(playAgain);
  };

  renderGrid();
  renderShips();

  return {
    removeElement,
    changeAnnouncement,
    renderHit,
    renderMiss,
    renderBoardOverlay,
    renderStartBtn,
    renderPlayAgainBtn,
    directTurn,
    removeOverlay,
    resetBoards,
    renderGrid,
    renderShips,
  };
};

export default userInterface;
