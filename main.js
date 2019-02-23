// var difficulty = 6;
var colours;
var pickedColour;
var squares = document.querySelectorAll( ".square" );
var colourDisplay = document.querySelector( "#colourDisplay" );
var messageDisplay = document.querySelector( "#message" );
var title = document.querySelector( "h1" );
var resetButton = document.querySelector( "#resetButton" );
var modeSelector = document.querySelector( "#gameMode" );
var difficultySelector = document.querySelector( "#difficultySetting" );
var gameMode = modeSelector.options[ modeSelector.selectedIndex ].value;
var gameDifficulty = difficultySelector.options[ difficultySelector.selectedIndex ].value;

//resets the board on load
setMode();
setDifficulty();
reset();

//initiates a reset of the board depending on the difficulty selected
function reset() {
  if ( gameDifficulty === "Easy" ) {
    playGame( 3 );
  } else {
    playGame( 6 );
  }
}

//loads the game board ready for the player to play
function playGame( difficultyValue ) {

  colours = generateRandomColours( difficultyValue );
  pickedColour = pickRandomColour( colours );
  colourDisplay.textContent = pickedColour;
  if ( difficultyValue === 3 ) {
    for ( let index = 0; index < squares.length; index++ ) {
      if ( colours[ index ] ) {
        console.log( colours[ index ] );
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
    squares[ index ].addEventListener( "click", function() {
      if ( gameMode === "RGB" ) {
        var clickedColour = this.style.backgroundColor;
      } else {
        var clickedColour = rgbToHex( this.style.backgroundColor );
      }
      console.log( "This is the colour I clicked " + clickedColour );
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

// sets the difficulty of the game
function setDifficulty() {
  difficultySelector.addEventListener( "click", function() {
    if ( this.options[ this.selectedIndex ].value === "Easy" ) {
      gameDifficulty = "Easy";
    } else {
      gameDifficulty = "Hard";
    }
    reset();
  } );
}

function setMode() {
  modeSelector.addEventListener( "click", function() {
    if ( this.options[ this.selectedIndex ].value === "RGB" ) {
      gameMode = "RGB";
      console.log( "RGB game mode" );
    } else {
      gameMode = "Hex";
      console.log( "Hex game mode" );
    }
    reset();
  } );
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
    console.log( "Game mode when generating random colors " + gameMode );
    if ( gameMode === "RGB" ) {
      collectionOfColours[ index ] = randomRGBColour();
      console.log( collectionOfColours[ index ] );
    } else {
      collectionOfColours[ index ] = randomHexColour();
      console.log( collectionOfColours[ index ] );
    }
    //  if the selected mode is hex then do this
  }
  return collectionOfColours;
}

// Generates a random single rgb colour value
function randomRGBColour() {
  var red = Math.floor( Math.random() * 256 ),
    green = Math.floor( Math.random() * 256 ),
    blue = Math.floor( Math.random() * 256 );
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// Generates a random single hex colour value
function randomHexColour() {
  return '#' + Math.floor( Math.random() * 16777215 ).toString( 16 );
}

function rgbToHex( rgb ) {
  rgb = rgb.match( /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/ );

  function hex( x ) {
    return ( "0" + parseInt( x ).toString( 16 ) ).slice( -2 );
  }
  return "#" + hex( rgb[ 1 ] ) + hex( rgb[ 2 ] ) + hex( rgb[ 3 ] );
}