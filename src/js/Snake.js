class Snake {

  constructor() {

    this.segments = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
    ];
    this.direction = 'RIGHT';
  }

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

  onDirectionChange(direction) {
    if (this.isMoveValid(direction)) {
      return;
    }
    this.direction = direction;
  }

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

  eat() {
    const lastSegment = this.segments[this.segments.length - 1];
    this.segments.unshift({ x: lastSegment, y: lastSegment });
  }
}

module.exports = Snake;
