class User {
  constructor() {
    this.score = document.getElementById('score');
    this.score.innerHTML = 0;
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
}

module.exports = User;
