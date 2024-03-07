![tetris](https://user-images.githubusercontent.com/110226567/214046509-0830e026-5866-43a5-b70c-141eeeb517ba.png)

# 🧱 Tetris

추억의 테트리스 게임 👉 [Demo](https://gardenny.github.io/tetris/)

<br />

## 📢 프로젝트 개요

자동 낙하하는 블록을 움직여서 쌓아나가는 게임입니다.<br />
블록이 가로로 꽉 채워지면 해당 라인이 사라지고 점수가 1점 추가되며,<br />
블록이 맨 위까지 쌓여서 세로로 꽉 채워지면 그 즉시 게임이 종료됩니다.

<br />

## 🗨️ 사용 기술

<p>
 <img src="https://img.shields.io/badge/HTML-e34f26?style=flat-square&logo=HTML5&logoColor=white" />
 <img src="https://img.shields.io/badge/CSS-1572b6?style=flat-square&logo=CSS3&logoColor=white" />
 <img src="https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=JavaScript&logoColor=white" />
</p>

<br />

## 📋 주요 기능

- 무작위 블록 생성 및 렌더링
- 게임 진행 시간이 기록되는 타이머
- 방향키를 통한 블록 이동 및 모양 변경
- 메인 페이지 이동 및 다시 시작 버튼
- 게임 종료 시 결과 팝업창 노출

<br />

## 💻 소스 코드

전체 코드 보러 가기 👉 [Notion](https://imjone.notion.site/Tetris-2d36893b850046a882a20f1f0451a029?pvs=4)

### 📍 블록 배열 정의

`BLOCKS` 라는 객체 안에 모든 블록의 모양을 중첩 배열로 정의해놓았습니다.<br />
이 때 각 배열의 원소는 격자판에서 해당 블록이 차지할 좌표를 의미합니다.

```javascript
const BLOCKS = {
  square: [
    [[0, 0],[0, 1],[1, 0],[1, 1]],
    [[0, 0],[0, 1],[1, 0],[1, 1]],
    [[0, 0],[0, 1],[1, 0],[1, 1]],
    [[0, 0],[0, 1],[1, 0],[1, 1]]
  ],
  zee: [
    [[0, 0],[1, 0],[1, 1],[2, 1]],
    [[0, 1],[1, 0],[1, 1],[0, 2]],
    [[0, 1],[1, 1],[1, 2],[2, 2]],
    [[2, 0],[2, 1],[1, 1],[1, 2]]
  ],
  ...
};

export default BLOCKS;
```

### 📍 무작위 블록 생성

`Math.floor`를 통해 `BLOCKS` 배열 안에서 무작위로 새로운 블록이 생성됩니다.<br />
`tempMovingItem`은 블록 생성 및 렌더링 단계에서 잠깐 쓰이는 임시 변수이며,<br />
이 다음 블록이 생성될 때를 대비해서 `tempMovingItem`을 초기화시켜 줍니다.

```javascript
let tempMovingItem;
const movingItem = {
  type: '',
  direction: 3,
  top: 0,
  left: 0,
};

function generateNewBlock() {
  const blockArray = Object.entries(BLOCKS);
  const randomIndex = Math.floor(Math.random() * blockArray.length);

  movingItem.type = blockArray[randomIndex][0]; // 랜덤한 모양의 블럭 생성
  movingItem.top = 0;
  movingItem.left = 3;
  movingItem.direction = 0;
  tempMovingItem = { ...movingItem }; // 초기화 후 새로운 블럭 생성
  renderBlocks();
}
```

### 📍 블록 이동 및 모양 변경

`keydown` 이벤트를 통해 입력한 키에 따라 블록의 방향 및 모양을 제어합니다.<br />
`moveBlock` - 이동할 방향을 인자로 전달 받은 후 불록을 한 칸씩 이동시킵니다.<br />
`changeDirection` - `BLOCKS` 배열에 정의된 순서대로 블록의 모양이 단계적으로 변경됩니다.

```javascript
function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount; // left, top
  renderBlocks(moveType);
}

function changeDirection() {
  const direction = tempMovingItem.direction;
  direction === 3 ? (tempMovingItem.direction = 0) : (tempMovingItem.direction += 1);
  renderBlocks();
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowRight':
      moveBlock('left', 1);
      break;
    case 'ArrowLeft':
      moveBlock('left', -1);
      break;
    case 'ArrowDown':
      moveBlock('top', 1);
      break;
    case 'ArrowUp':
      changeDirection();
      break;
    case ' ': // space bar
      dropBlock();
      break;
    default:
      break;
  }
});
```

<br />

## 😊 배운 점 및 느낀 점

- 기능을 함수 단위로 엮어나가는 연습을 해볼 수 있어 정말 의미 있는 프로젝트였습니다.
- 블록의 모양을 배열로 정의함으로써 배열의 활용도가 정말 높다는 것을 다시 한번 깨달았습니다.
- 클래스 문법을 능숙하게 사용할 수 있도록 더욱 자주 사용해봐야겠다고 느꼈습니다.
- 다음에 나올 블록을 미리 보여주는 기능을 구현하지 못한 것에 대해 아쉬움이 많이 남습니다.
