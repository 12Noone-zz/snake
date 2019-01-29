class Snake {
  /**
   * Creates an instance of Snake.
   * initial data rendering of the snake with initial coordinates
   * also, default snake direction is to the right at game start
   * @memberof Snake
   */
  constructor() {
    this.setUpSnake();
  }

  /**
   * dictates the snake's movements
   * basically, depending on the key command, increment or decrement x or y
   * then remove the last array segment to facilitate moving forwards
   * @memberof Snake
   */
  move() {
    const lastSegment = this.segments[this.segments.length - 1];
    if (this.direction === 'RIGHT') {
      this.segments.push({ x: lastSegment.x + 1, y: lastSegment.y });
    }
    if (this.direction === 'LEFT') {
      this.segments.push({ x: lastSegment.x - 1, y: lastSegment.y });
    }
    if (this.direction === 'DOWN') {
      this.segments.push({ x: lastSegment.x, y: lastSegment.y + 1 });
    }
    if (this.direction === 'UP') {
      this.segments.push({ x: lastSegment.x, y: lastSegment.y - 1 });
    }
    this.segments.shift();
  }

  /**
   * comes in from Game, sets direction to new directional to be used by Move
   * direction is a string directional term derived in board constructor
   * a check is done to ensure the move is a valid one.
   * @param {*} direction
   * @memberof Snake
   */
  onDirectionChange(direction) {
    if (this.isMoveValid(direction)) {
      return;
    }
    this.direction = direction;
  }

  /**
   * takes direction as a string and defines what would be an illegal move
   * i.e, you can't go backwards on yourself.
   * conditional returns a bool, if true (if the move is invalid) return out of changeDirection()
   * // todo: theres probably a neater way to do this than brute conditionals.
   * @param {*} direction
   * @returns bool
   * @memberof Snake
   */
  isMoveValid(direction) {
    let move = false;
    if (direction === 'RIGHT') {
      move = this.direction === 'LEFT';
    }
    if (direction === 'LEFT') {
      move = this.direction === 'RIGHT';
    }
    if (direction === 'UP') {
      move = this.direction === 'DOWN';
    }
    if (direction === 'DOWN') {
      move = this.direction === 'UP';
    }
    return move;
  }

  /**
   * finds last segment then adds another last segment
   *
   * @memberof Snake
   */
  eat() {
    const lastSegment = this.segments[this.segments.length - 1];
    this.segments.unshift({ x: lastSegment, y: lastSegment });
  }

  /**
   * whether first game or 8th it sets the snake to original coordinates.
   * also sets an initial direction for the snake.
   *
   * @memberof Snake
   */
  setUpSnake() {
    this.segments = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
    ];
    this.direction = 'RIGHT';
  }
}

module.exports = Snake;
