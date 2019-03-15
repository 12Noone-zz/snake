const Snake = require('./Snake');

class User {
  constructor() {
    this.score = document.getElementById('score');
    this.score.innerHTML = 0;
    this.snake = new Snake();
  }

  /**
   * takes current inner html of score element
   * stores it to variable
   * increases by one
   * sets html of score element to new score
   *
   * @memberof User
   */
  updateScore() {
    let newScore = this.score.innerHTML;
    newScore++; // eslint-disable-line
    this.score.innerHTML = newScore;
  }


  /**
   * resets it back to zero.
   *
   * @memberof User
   */
  resetScore() {
    this.score.innerHTML = 0;
  }
  // what does player one need to know?
  /*
    it needs to know where it's snake is
    it needs to know what it's score is

    I kind of want to take snake and move it down into user. 
    because now Users will have snakes they control.
  */
}

module.exports = User;
