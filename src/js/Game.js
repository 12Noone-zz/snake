const Snake = require('./Snake');
const User = require('./User');

class Game {

  constructor(domElement) {
    const keyMap = {
      39: 'RIGHT',
      37: 'LEFT',
      40: 'DOWN',
      38: 'UP',
    };

    document.addEventListener('keydown', (e) => {
      if (keyMap[e.which]) {
        this.initiateDirectionChange(keyMap[e.which]);
      }
    });
    this.snake = new Snake();
    this.user = new User();
    this.startButton = domElement.querySelectorAll('#start-btn');
    this.allRows = domElement.querySelectorAll('.row');
    this.speed = 1000;
    this.initiateGame();
  }

  initiateGame() {
    this.startButton[0].addEventListener('click', () => {
      this.startButton[0].classList.add('remove-start-btn');
      this.renderApple();
      this.gameTick(this.speed);
    });
  }

  gameTick(speed) {
    this.tick = setInterval(() => {
      this.snake.move();
      this.renderGameState();
      this.checkSnakeStatus();
    }, speed);
  }


  renderGameState() {
    const domSnake = document.querySelectorAll('.snake');
    domSnake.forEach((node) => {
      node.classList.remove('snake');
      node.classList.remove('head');
    });
    this.snake.segments.forEach((segment, idx) => {
      const row = this.allRows[segment.y];
      if (row) {
        const cell = row.querySelectorAll('.cell')[segment.x];
        if (cell) {
          cell.classList.add('snake');
          if (idx === this.snake.segments.length - 1) {
            cell.classList.add('head');
          }
        }
      }
    });
  }

  initiateDirectionChange(direction) {
    this.snake.onDirectionChange(direction);
  }

  renderApple() {
    const rowAxis = document.querySelectorAll('.row');
    const cellAxis = rowAxis[0].children;
    const rowCoordinate = Math.floor(Math.random() * rowAxis.length);
    const cellCoordinate = Math.floor(Math.random() * cellAxis.length);

    const row = this.allRows[rowCoordinate] || undefined;
    let apple = {};
    apple = row.querySelectorAll('.cell')[cellCoordinate];
    if (apple.classList.contains('snake')) {
      this.renderApple();
      return;
    }
    apple.classList.add('apple');
  }

  checkSnakeStatus() {
    this.didSnakeEatAnApple();
    this.didSnakeHitAWall();
    this.didSnakeEatItself();
  }

  didSnakeEatAnApple() {
    const snakeHead = document.querySelector('.head') || undefined;
    if (snakeHead) {
      if (snakeHead.classList.contains('apple')) {
        this.snake.eat();
        snakeHead.classList.remove('apple');
        this.renderApple();
        this.user.updateScore();
        this.checkGameSpeed();
      }
    }
  }

  checkGameSpeed() {
    const score = document.getElementById('score');
    const formattedScore = parseInt(score.innerHTML);
    if (formattedScore % 5 === 0) {
      clearInterval(this.tick);
      this.speed = this.speed - 50;
      this.gameTick(this.speed);
    }
  }

  didSnakeHitAWall() {
    const rowAxis = document.querySelectorAll('.row');
    const cellAxis = rowAxis[0].children;

    const snakeHeadLocation = this.snake.segments[this.snake.segments.length - 1];
    if (snakeHeadLocation.x > cellAxis.length - 1
      || snakeHeadLocation.x < 0
      || snakeHeadLocation.y < 0
      || snakeHeadLocation.y > rowAxis.length - 1) {
      this.gameOver();
    }
  }

  didSnakeEatItself() {
    const snakeHeadLocation = this.snake.segments[this.snake.segments.length - 1];
    this.snake.segments.forEach((segment, idx) => {
      if (idx !== this.snake.segments.length - 1) {
        if (snakeHeadLocation.x === segment.x && snakeHeadLocation.y === segment.y) {
          this.gameOver();
        }
      }
    });
  }

  gameOver() {
    clearInterval(this.gameTick);
    const domSnake = document.querySelectorAll('.snake');
    const apple = document.querySelector('.apple');
    domSnake.forEach((node) => {
      node.classList.remove('snake');
      node.classList.remove('head');
    });
    if (apple) {
      apple.classList.remove('apple');
    }
    this.startButton[0].classList.remove('remove-start-btn');
    this.user.resetScore();
    this.snake.setUpSnake();
  }
}

const gameBoard = document.querySelectorAll('#snake-game')[0];
const game = new Game(gameBoard);

module.exports = game;
