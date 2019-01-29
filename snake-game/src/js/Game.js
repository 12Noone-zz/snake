const Snake = require('./Snake');
const User = require('./User');

class Game {
/**
 *Creates an instance of Game.
  Maps arrow keys to strings for clarity
  Sets event listener for key down events
  Checks if key down event is an arrow key
  if so call initiateDirectionChange
 * @param {*} domElement
 * @memberof Game
 */
  constructor(domElement) {
    const keyMap = {
      39: 'RIGHT',
      37: 'LEFT',
      40: 'DOWN',
      38: 'UP',
    };
    // just check if the key exists in the map in your if statement below
    // if (keys[e.which]) { do the thing}
    document.addEventListener('keydown', (e) => {
      if (keyMap[e.which]) {
        this.initiateDirectionChange(keyMap[e.which]);
      }
    });
    // generate a new snake, a new user, and some static dom element declaring
    this.snake = new Snake();
    this.user = new User();
    this.startButton = domElement.querySelectorAll('#start-btn');
    this.allRows = domElement.querySelectorAll('.row');
    this.initiateGame();
  }

  /**
   * instantiates game start
   * adds event listener to start button
   * renders apple
   * start button click kicks off interval for game engine
   * adds class to hide start button
   * I thought about removing the element, but its so verbose to remove/put it back
   * I preferred to hide it instead. that way it keeps onClick logic.
   *
   * @memberof Game
   */
  initiateGame() {
    this.startButton[0].addEventListener('click', () => {
      this.startButton[0].classList.add('remove-start-btn');
      this.renderApple();
      this.gameTick = setInterval(() => {
        this.snake.move();
        this.renderGameState();
        this.checkSnakeStatus();
      }, 300);
    });
  }

  /**
   * renders game's current state
   * removes snake
   * loops through snake segments and re-renders with updated coordinates
   * finds and adds class 'head' to snake's head. useful for boundary/self/apple collision
   *
   * @memberof Game
   */
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

  /**
   * Initiates direction change - called by constructor's event listener on key commands
   *
   * @param {*} direction
   * @memberof Game
   */
  initiateDirectionChange(direction) {
    this.snake.onDirectionChange(direction);
  }

  /**
   * renders a new apple
   * randomly generate a coordinate to drop an apple
   * check though if the coordinate returned for apple contains 'snake' class
   * if so, return and call re-render again
   * you can't put an apple under the snake. that's anarchy.
   *
   * @returns
   * @memberof Game
   */
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

  /**
   * check method which triggers methods to check current state of snake
   *
   * @memberof Game
   */
  checkSnakeStatus() {
    this.didSnakeEatAnApple();
    this.didSnakeHitAWall();
    this.didSnakeEatItself();
  }

  /**
   * arguably the purpose of the game
   * finds snake's head
   * sees if snake's head also contains apple class
   * if it does, initiate eat!
   * update user score
   * render a new apple.
   *
   * @memberof Game
   */
  didSnakeEatAnApple() {
    const snakeHead = document.querySelector('.head') || undefined;
    if (snakeHead) {
      if (snakeHead.classList.contains('apple')) {
        this.snake.eat();
        snakeHead.classList.remove('apple');
        this.renderApple();
        this.user.updateScore();
      }
    }
  }

  /**
   * snakes can't hit walls.
   * find snake head's coordinates
   * if snake's coordinates exceed the upper bounds (first most row)
   * lower bounds (last row)
   * first most cell in any given row
   * last most cell in any given row
   * call game over.
   *
   * @memberof Game
   */
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

  /**
   * snakes can't eat themselves.
   * Find snake head coordinates
   * if snake head coordinates match any snake body coordinates
   * thats a game over
   *
   * @memberof Game
   */
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

  /**
   * all good things have to come to an end.
   * clear the interval effectively stopping the game
   * find and remove all classes of apple and snake, clearing the board
   * call User and Snake to reset scoreboard and snake coordinates respectively
   *
   * @memberof Game
   */
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
