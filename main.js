var difficulty = 6;
var colours = generateRandomColours( difficulty );
var squares = document.querySelectorAll( ".square" );
var pickedColour = pickRandomColour();
var colourDisplay = document.querySelector( "#colourDisplay" );
colourDisplay.textContent = pickedColour;
var messageDisplay = document.querySelector( "#message" );
var title = document.querySelector( "h1" );
var resetButton = document.querySelector( "#resetButton" );
var modeButtons = document.querySelectorAll( ".mode" );

reset();
setDifficulty();


// sets the difficulty of the game
function setDifficulty() {
  for ( var i = 0; i < modeButtons.length; i++ ) {
    modeButtons[ i ].addEventListener( "click", function() {
      modeButtons[ 0 ].classList.remove( "selectedButton" );
      modeButtons[ 1 ].classList.remove( "selectedButton" );
      this.classList.add( "selectedButton" );
      if ( this.textContent === "Easy" ) {
        playGame( 3 );
      } else {
        playGame( 6 );
      }
    } );
  }
}

//loads the game board ready for the player to play
function playGame( mode ) {
  colours = generateRandomColours( mode );
  pickedColour = pickRandomColour( colours );
  colourDisplay.textContent = pickedColour;
  if ( mode === 3 ) {
    for ( let index = 0; index < squares.length; index++ ) {
      if ( colours[ index ] ) {
        squares[ index ].style.backgroundColor = colours[ index ];
      } else {
        squares[ index ].style.display = "none";
      }
    }
  } else {
    for ( let index = 0; index < squares.length; index++ ) {
      squares[ index ].style.backgroundColor = colours[ index ];
      squares[ index ].style.display = "block";
    }
  }
  changeSquaresToRandomColours( colours );
  title.style.backgroundColor = "#232323";
  resetButton.textContent = "Reset";
  messageDisplay.textContent = "";
  processInput();
}

//processes input from the user on the game board
function processInput() {
  for ( let index = 0; index < squares.length; index++ ) {
    // squares[ index ].style.backgroundColor = colours[ index ];
    squares[ index ].addEventListener( "click", function() {
      var clickedColour = this.style.backgroundColor;
      if ( clickedColour === pickedColour ) {
        messageDisplay.textContent = "✅";
        resetButton.textContent = "Play again?";
        changeSquaresToWinningColour( clickedColour );
        title.style.backgroundColor = clickedColour;
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "❌";
      }
    } );
  }
}

function reset() {
  if ( modeButtons[ 0 ].classList.contains( "selectedButton" ) ) {
    playGame( 3 );
  } else {
    playGame( 6 );
  }
}

//resets the game board to a fresh start
resetButton.addEventListener( "click", function() {
  reset();
} );

// Sets the colour of each square to a single colour
function changeSquaresToWinningColour( colour ) {
  for ( let index = 0; index < squares.length; index++ ) {
    squares[ index ].style.backgroundColor = colour;
  }
}

// sets the value of each square to a range of colours
function changeSquaresToRandomColours( colours ) {
  for ( let index = 0; index < squares.length; index++ ) {
    squares[ index ].style.backgroundColor = colours[ index ];
  }
}

// selects a single colour from an array of colours at random
function pickRandomColour() {
  var randomNumber = Math.floor( Math.random() * colours.length );
  return colours[ randomNumber ];
}

// Generates an array of random RGB values
function generateRandomColours( numberOfColours ) {
  var collectionOfColours = [];
  for ( let index = 0; index < numberOfColours; index++ ) {
    collectionOfColours[ index ] = randomColour();
  }
  return collectionOfColours;
}

// Generates a random single rgb colour value
function randomColour() {
  var red = Math.floor( Math.random() * 256 ),
    green = Math.floor( Math.random() * 256 ),
    blue = Math.floor( Math.random() * 256 );
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}