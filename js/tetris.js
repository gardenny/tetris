'use strict';

import BLOCKS from './block.js';

// DOM
const startScreen = document.querySelector('.start');
const gameField = document.querySelector('.game');
const tetrisBoard = document.querySelector('.tetris');
const startBtn = document.querySelector('.start__btn');
const gameScore = document.querySelector('.score');
const gameMenu = document.querySelector('.menu');

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

let started = false;
let score = 0;
let duration = 500;
let downInterval;
let gameTimer;
let seconds = 0;
let minutes = 0;
let tempMovingItem;
const movingItem = {
  type: '', // 블럭의 형태
  direction: 3,
  top: 0,
  left: 0,
};

// Prevent context
document.addEventListener('contextmenu', e => e.preventDefault());

// Game start
startBtn.addEventListener('click', () => {
  init();
});
document.addEventListener('keydown', e => {
  if (startScreen.style.display === 'none') return;
  if (e.key === 'Enter') {
    init();
  }
  return;
});

// Functions
function init() {
  started = true;
  score = 0;

  startScreen.style.display = 'none';
  gameField.style.display = 'block';
  gameScore.innerText = score;
  updateTimer();
  startTimer();

  // 블럭 잠시 담아두기
  // 기존의 블럭에는 영향이 가지 않도록 spread 연산자를 통해 새로운 블럭 생성
  tempMovingItem = { ...movingItem };
  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
  generateNewBlock();
}

function prependNewLine() {
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  for (let j = 0; j < GAME_COLS; j++) {
    const matrix = document.createElement('td');
    tr.prepend(matrix);
  }
  td.prepend(tr);
  tetrisBoard.prepend(tr);
}
