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

function generateNewBlock() {
  stopDescendBlock();
  descendBlock();

  const blockArray = Object.entries(BLOCKS);
  const randomIndex = Math.floor(Math.random() * blockArray.length);

  movingItem.type = blockArray[randomIndex][0]; // 랜덤한 모양의 블럭 생성
  movingItem.top = 0;
  movingItem.left = 3;
  movingItem.direction = 0;
  tempMovingItem = { ...movingItem }; // 초기화 후 새로운 블럭 생성
  renderBlocks();
}

function renderBlocks(moveType = '') {
  if (!started) return;

  // 구조 분해 할당
  // tempMovingItem의 각 속성들을 개별적으로 변수에 할당
  const { type, direction, top, left } = tempMovingItem;
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach(moving => moving.classList.remove(type, 'moving'));

  BLOCKS[type][direction].some(block => {
    const x = block[0] + left; // 좌표 이동
    const y = block[1] + top;
    const target = tetrisBoard.childNodes[y] ? tetrisBoard.childNodes[y].childNodes[x] : null;
    const isAvailable = checkEmpty(target);
    if (isAvailable) target.classList.add(type, 'moving');
    else {
      tempMovingItem = { ...movingItem }; // tempMovingItem 원상 복구

      if (moveType === 'replay') {
        clearInterval(downInterval);
        gameOver();
      }
      // call stack maximum 오류 방지를 위해 setTimeout 함수 사용
      // event loop 내의 모든 event들이 실행된 후에 call stack으로 넣어줌
      setTimeout(() => {
        renderBlocks('replay');
        if (moveType === 'top') seizeBlock(); // 블럭이 바닥에 닿았을 때 고정시킴
      }, 0); // 재귀 함수
      return true; // 쓸데 없는 반복문 제어
    }
  });

  // 블럭이 영역 밖으로 벗어나지 않도록 방지
  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;
}

function descendBlock() {
  downInterval = setInterval(() => moveBlock('top', 1), duration);
}

function stopDescendBlock() {
  clearInterval(downInterval);
}

function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount; // left, top
  renderBlocks(moveType); // 블럭이 움직일 때만 moveType을 인자로 전달
}
