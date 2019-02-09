const Snake = require('./Snake');
const User = require('./User');

class Game {
  constructor(domElement) {
    // map arrow keys to strings for humans
    const keyMap = {
      39: 'RIGHT',
      37: 'LEFT',
      40: 'DOWN',
      38: 'UP',
    };
    // initialize event listener for keys, test for key validity
    // call to initiate direction change if correct key
    document.addEventListener('keydown', (e) => {
      if (keyMap[e.which]) {
        this.initiateDirectionChange(keyMap[e.which]);
      }
    });
    // initialize a snake, a user, some dom elements, define starting speed, and call initiate()
    this.snake = new Snake();
    this.user = new User();
    this.startButton = domElement.querySelectorAll('#start-btn');
    this.allRows = domElement.querySelectorAll('.row');
    this.speed = 1000;
    this.initiateGame();

  }
  // adds event listener to start button, call to render the apple and start the game clock
  initiateGame() {
    this.startButton[0].addEventListener('click', () => {
      this.startButton[0].classList.add('remove-start-btn');
      this.renderApple();
      this.startGameTick();
    });
  }

  // if already defined, return. kept getting multiple interval loops.
  startGameTick() {
    if (this.tick) {
      return;
    }
    // initiate game tick and begin calling the methods that run the game
    this.tick = setInterval(() => {
      this.snake.move();
      this.renderGameState();
      this.checkSnakeStatus();
    }, this.speed);
  }
  
  // a reset method good for game overs or changing game speed
  endGameTick() {
    clearInterval(this.tick);
    this.tick = null;
  }

  // render the game state - really this just updates the snake's positioning.
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

  // initiates a direction change for snake
  initiateDirectionChange(direction) {
    this.snake.onDirectionChange(direction);
  }

  // renders an apple in a random coordinate - does not allow for apples rendering in the same space as the snake
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

  // status check method for snake activities
  checkSnakeStatus() {
    this.didSnakeEatAnApple();
    this.didSnakeHitAWall();
    this.didSnakeEatItself();
  }

  // checks if snake head collided with an apple
  // if so, removes the apple, increases the score, and (possibly) the game speed
  didSnakeEatAnApple() {
    const snakeHead = document.querySelector('.head') || undefined;
    if (snakeHead) {
      if (snakeHead.classList.contains('apple')) {
        this.snake.eat();
        snakeHead.classList.remove('apple');
        this.renderApple();
        this.user.updateScore();
        this.updateGameSpeed();
      }
    }
  }

  // update game speed if the score is a multiple of 5 and game speed is currently above 100 MS. intervals aren't a fan of negative integers turns out
  updateGameSpeed() {
    const score = document.getElementById('score');
    const formattedScore = parseInt(score.innerHTML);
    if (formattedScore % 5 === 0 && this.speed > 100) {
      this.endGameTick();
      this.speed = this.speed - 100;
      this.startGameTick();
    }
  }

  // identifies the walls of the game
  // and tests current snake coordinates against boundaries for collisions
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

  // defines snake's head and tests if snake head has collided with snake body
  // calls to game over if so
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

  // game over.
  // ends game interval, removes the snake and apple, adds the start button back in, resets the user, rests the snake, and resets game speed.
  gameOver() {
    this.endGameTick();
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
    this.speed = 1000;
  }
}

const gameBoard = document.querySelectorAll('#snake-game')[0];
const game = new Game(gameBoard);
window.game = game;
module.exports = game;
