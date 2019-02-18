for ( let index = 0; index < squares.length; index++ ) {
  squares[ index ].style.backgroundColor = colours[ index ];
  squares[ index ].addEventListener( "click", function() {
    var clickedColour = this.style.backgroundColor;
    console.log( clickedColour + " vs " + pickedColour );
    if ( clickedColour === pickedColour ) {
      messageDisplay.textContent = "Correct!";
      newColourButton.textContent = "Play again?";
      changeSquaresToWinningColour( clickedColour );
      title.style.backgroundColor = clickedColour;
    } else {
      this.style.background = "#232323";
      messageDisplay.textContent = "Try again";
    }
  } );
}

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
    console.log( collectionOfColours[ index ] );
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

// loads the board with fresh colours ad resets the display to match
function loadTheBoard() {
  if ( easyButton.classList.contains( "selectedButton" ) ) {
    playEasy();
  } else {
    playHard();
  }
  pickedColour = pickRandomColour();
  changeSquaresToRandomColours( colours );
  colourDisplay.textContent = pickedColour;
  title.style.backgroundColor = "#232323";
  newColourButton.textContent = "New Colour";
  messageDisplay.textContent = "";
}
