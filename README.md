# Snake Game

A vanilla javascript browser game written in ES6 and vanilla css.

## How to play

I followed basic Snake canon / my old Nokia's sets of rules.

 - The snake is constantly moving and you grow the snake by eating apples
 - There is only one apple on the screen at a time, apple is worth a single point.
 - Use the arrow keys in order to control the snake's movements
 - You cannot move back on yourself. EX: if you're moving right, an attempt to move left will be blocked.
 - Colliding with either yourself or a wall will result in a game over

## Quick overview of classes involved

**Game**
Game monitors and updates the current game's state. Almost all DOM manipulation happens here, with the exception of User. Game sets the game's interval engine, renders the snake, calls snake to move, renders apples, tracks snake's movements for collision events such as apples, walls, or self, and handles resulting game overs as well as triggers setup for the next round.

**Snake**
Everything Snake is siloed here. Snake receives commands to move from Game and methods within Snake determine whether that move is valid and if so which direction to move the snake in. Snake also handles its own growth and initial build/reset.

**User**
User tracks and maintains its score. Initially I was hesitant to have a User class for such a minimal amount of code, however, version 2 would require a User class so it's best to have that class in place and scaled to grow to accommodate new functionality. Two words: Dueling. Snakes. Scaling aside, I felt its users who have scores and so score should belong to User.

## Next Steps

 1. Snake Rendering. Currently somewhat brute force, we clear the snake from the board then re-render with updated coordinates (and lengths if necessary) for every re-render.  If we had a super snake hundreds of segments long then this method would begin to take too long to render and game play would suffer.
 2. DOM elements - currently there's only one grid size available because the elements are statically rendered in the DOM. A good next step would be to instead rely on javascript to render the grid to the DOM. This would give us the ability to change the size or even the shape of the grid for harder levels in the future.
 3. Increased interval for harder game play - currently the timeout (set to a reasonably quick but not too difficult 300MS) never changes as you play the game. Since we have a concept of Score it should be possible to update the interval score when certain thresholds are met. Example: game starts out at 1000ms and every 5 apples eaten it decreases by 100ms.
 4. DUELING SNAKES. Since I have a User class, I plan to make concepts of First and Second player. MVP would mean using the same keyboard (sockets would be the next iteration). Instead of one snake there'd be two, each with their own key commands, and it'd be a race to get to each apple in order to outgrow the other. Hitting walls, self, or the other snake would upd in a game over.
