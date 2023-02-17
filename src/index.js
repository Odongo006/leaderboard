import './style.css';
import Scores from './modules/scores.js';

const scores = new Scores();
const refreshBtn = document.querySelector('.refresh-btn');
const form = document.getElementById('form');

scores.retrieveScores();

refreshBtn.addEventListener('click', scores.retrieveScores);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  scores.submitNewScore(form.name.value, form.score.value);
  form.reset();
});