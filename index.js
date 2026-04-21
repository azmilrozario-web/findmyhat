import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

// *Game elements/assets constants
const HAT = '^';
const HOLE = 'O';
const GRASS = '░';
const PLAYER = '*';

// *UP / DOWN / LEFT / RIGHT / QUIT keyboard constants
const UP = "W";
const DOWN = "S";
const LEFT = "A";
const RIGHT = "D";
const QUIT = "Q";

// *: MSG_UP / MSG_DOWN / MSG_LEFT / MSG_RIGHT / MSG_QUIT / MSG_INVALID
const FEEDBACK_UP = "You moved up.";
const FEEDBACK_DOWN = "You moved down.";
const FEEDBACK_LEFT = "You moved left.";
const FEEDBACK_RIGHT = "You moved right.";
const FEEDBACK_QUIT = "You have quit the game.";
const FEEDBACK_INVALID = "Invalid entry.";

// *: WIN / LOSE / OUT / QUIT message constants
const FEEDBACK_WIN = "Congratulations, you won!";
const FEEDBACK_LOSE = "You fell into a hole. Game over.";
const FEEDBACK_OUT = "You stepped out of the platform. Game over.";
const FEEDBACK_QUIT_END = "You quit the game. Thank you for playing.";

// *: MAP ROWS, COLUMNS AND PERCENTAGE
const ROWS = 8;
const COLS = 5;
const PERCENT = 0.2; // Percentage of holes in the game map

let score = 0;

class Field {

  // constructor, a built-in method of a class
  // (invoked when an object of a class is instantiated)
  // [ Outer array → the whole map
  // [] Inner array → a row
  // ] Outer array → the whole map
  // “Store the map + track if game is running”
  constructor(field = [[]]) {
    this.field = field; // stores your map inside the object
    this.gamePlay = false; // controls whether game runs
  }

  // * generateField is a static method, returning a 2D array of the fields
  // This creates the game map (2D array)
  // [ Outer array → the whole map
  // [] Inner array → a row
  // ] Outer array → the whole map
  static generateField(rows, cols, percentage) {

    const map = [[]];

    for (let i = 0; i < rows; i++) {
      map[i] = []; // generate the row for the map. Create each row

      for (let j = 0; j < cols; j++) {
        map[i][j] = Math.random() > PERCENT ? GRASS : HOLE; // populate GRASS per column in each row
      }
    }

    return map; // return the generated 2D array. This becomes your game world
  }

  // *: welcomeMessage is a static method, displays a string
  static welcomeMsg(msg) {
    console.log(msg);
  }

  // * setHat positions the hat along a random x and y position within field array
  setHat() {
    const x = Math.floor(Math.random() * (ROWS - 1)) + 1;   // establish a random position of X in the field
    const y = Math.floor(Math.random() * (COLS - 1)) + 1;   // establish a random postion of Y in the field
    this.field[x][y] = HAT;   // set the HAT along the derived random position this.field[x][y]
  }


  // *: printField displays the updated status of the field position
  printField() {

    // Do you all remember the code we used to print the field without the [] and the ''
    // An array has built-in methods to iterate through each element
    this.field.forEach(row => console.log(row.join(' ')));
  }

  // * updateMove displays the move (key) entered by the user
  updateMove(direction) {
    console.log(direction);
  }


  // !! TODO: updateGame Assessment Challenge
  updateGame() {

    // Check the following conditions:
    // 1. Whether the player fell into HOLE, end the game
    // 2. Whether the player moved out of the map, end the game
    // 3. Whether the player moved to the HAT, wins the game
    // 4. Whether the player moved to a GRASS spot, update the players's position and continue with the game

  }

  // * start() a public method of the class to start the game
  start() {
    this.gamePlay = true; // game starts when true

    this.field[0][0] = PLAYER; // set player start position
    this.setHat(); // set the hat start position

    while (this.gamePlay) {        // while gamePlay is true, ask the user for an input (W), (A), (S), (D) or (Q). This keeps the game running forever until stopped

      this.printField();
      const input = prompt("Enter (w)up, (s)down, (a)left, (d)right. Press (q) to quit.");
      let flagInvalid = false;    // use a flag to determine if the game entry is correct
      let feedback = "";

      // Converts input to uppercase and checks:
      switch (input.toUpperCase()) {
        case UP:
          feedback = FEEDBACK_UP;
          break;
        case DOWN:
          feedback = FEEDBACK_DOWN;
          break;
        case LEFT:
          feedback = FEEDBACK_LEFT;
          break;
        case RIGHT:
          feedback = FEEDBACK_RIGHT;
          break;
        case QUIT:
          feedback = FEEDBACK_QUIT;
          this.#end();
          break;
        default:
          feedback = FEEDBACK_INVALID;
          flagInvalid = true;
          break;
      }

      this.updateMove(feedback);


      if (!flagInvalid) {  // flagInvalid is a boolean (if flagInvalid is NOT false (true))
        // update the game
        this.updateGame();
      }

    }
  }


  #end() {
    this.gamePlay = false;
  }

}
// *: Generate a new field - using Field's static method: generateField
const createField = Field.generateField(ROWS, COLS, PERCENT); // This builds your game world

// *: Generate a welcome message
Field.welcomeMsg("\n************WELCOME TO FIND YOUR HAT************\n");

// * Create a new instance of the game
// * by passing createField as a parameter to the new instance of Field
// This line new Field(createField), Triggers: 
// constructor(field = [[]]) {
// this.field = field;
// this.gamePlay = false;
// }
//
// Now gameField becomes your game object
//
// Like:
// gameField = {
// field: [your map],
// gamePlay: false,
// start: function,
// #end: function 
// }
const gameField = new Field(createField);

// *: Invoke method start(...) from the instance of game object
// gameField.start(); is at the bottom because: => You must finish setting everything up BEFORE starting the game
gameField.start();


//  ! method #end() cannot be instantiated by the instance of Field - it is a private method
// gameField.#end(); // ❌