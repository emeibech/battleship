import './styles.css';
import playGame from './modules/playGame';

const startBtn = document.querySelector('[data-start]');

document.addEventListener('DOMContentLoaded', () => {
  playGame(startBtn);
});
