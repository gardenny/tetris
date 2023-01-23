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
