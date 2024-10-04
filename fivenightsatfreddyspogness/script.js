//global variables
//game mechanics
var playerTries;
var hMan = document.getElementById("hangman");
var rightLetters = [];
var wrongLetters = [];
var textBox = document.getElementById("p3");
var usedLetters = "";
var gameDiff = "";
const numbers = "1234567890";
var startGame, diffPrompt, gameWord, wordSpace, wordSelect, characters, tries, input, hintSpot, hintWord, wordBlank, diffAsk;
//elements
var gameDiv = document.getElementById("gameScreen");
var customDiv = document.getElementById("customScreen");
var failDiv = document.getElementById("failScreen");
var winDiv = document.getElementById("winScreen");
var hintButt = document.getElementById("hint");
var customScreen = document.getElementById("skinPhoto");
var customText = document.getElementById("skinDesc");
var skinValue = 0;
var ogMsg = "The original hangman. Nothing special here.";
var freddyMsg = "Is that a bear robot? Or a hangman dressed as a bear robot?";
var foxyMsg = "A magical pirate robot fox.";
var chicaMsg = "A chicken...? Is that even a chicken?"

//character select
customDiv.style.display = "block"; //show on default
gameDiv.style.display = "none";
failDiv.style.display = "none";
winDiv.style.display = "none";
if (skinValue == 0) { //set as default
  og();
}
function og() { //choosing character
  customScreen.src = ("manphotos/fullman.png");
  customText.innerHTML = (ogMsg);
  skinValue = 0;
}
function freddy() {
  customScreen.src = ("freddy/freddy.png");
  customText.innerHTML = (freddyMsg);
  skinValue = 1;
}
function foxy() {
  customScreen.src = ("foxy/foxy.png");
  customText.innerHTML = (foxyMsg);
  skinValue = 2;
}
function chica() {
  customScreen.src = ("chica/chica.png");
  customText.innerHTML = (chicaMsg);
  skinValue = 3;
}

//actual game
function loadUp() {
  hMan.src = ("manphotos/hanger.png"); //show hanger
  customDiv.style.display = "none";
  gameDiv.style.display = "block"; //show main game
  startGame = false; //set difficulty
  while (startGame == false) {
    diffPrompt = "Your chosen difficulty is: ";
    gameDiff = prompt("Enter your preffered difficulty below: \n\Type 'Easy' for easy difficulty (12 tries) \n\Type 'Medium' for medium difficulty (6 tries) \n\Type 'Hard' for hard difficulty (3 tries)").toLowerCase();
    console.log("difficulty: " + gameDiff);
    if (gameDiff == "easy") {
      alert(diffPrompt + "easy");
      startGame = true;
    } else if (gameDiff == "medium") {
      alert(diffPrompt + "medium");
      startGame = true;
    } else if (gameDiff == "hard") {
      alert(diffPrompt + "hard");
      startGame = true;
    } else {
      alert("Invalid input: Please try again");
    }
  }
  if (gameDiff == "easy") {
    tries = 12;
  } else if (gameDiff == "medium") {
    tries = 6;
  } else {
    tries = 3;
  }
  console.log("skin type: skin #" + skinValue);
  makeWord();
}
//word setup
function makeWord() {
  wordSelect = Math.floor(Math.random() * (words.length + 1)); //pick word
  gameWord = words[wordSelect];
  //make word into spaced out thing for later
  wordSpace = gameWord.split('').join(" ");
  console.log("word: " + wordSpace);
  //make word box
  characters = new Array(gameWord.length);
  for (i = 0; i < gameWord.length; i++) {
    characters[i] = "_";
    wordBlank = characters.join(" ");
    textBox.innerHTML = (wordBlank);
  }
}
//guessing and hangman drawing
function guess() { //guess letter
  input = window.prompt("Guess a letter here").toUpperCase();
  console.log("user inputted '" + input + "'");
  if (input.length != 1 || numbers.includes(input) == true || usedLetters.includes(input) == true) {
    ;
    alert("Invalid input - try again");
  } else {
    check(input);
    usedLetters += input;
  }
}
function check(input) { //see if right or wrong
  document.getElementById("p1").innerHTML += input;
  console.log("added " + input + " to list");
  if (gameWord.includes(input)) {
    alert(input + " Is in the final word");
    for (i = 0; i < gameWord.length; i++) {
      if (gameWord.charAt(i) == input) {
        characters[i] = input;
        wordBlank = characters.join(" ");
        textBox.innerHTML = (wordBlank);
        console.log("current progress: " + wordBlank);
      }
    }
    if (wordBlank == wordSpace) {
      winGame();
    }
  } else {
    alert(input + " Is not in the final word");
    document.getElementById("p2").innerHTML += input
    tries = tries - 1;
    document.getElementById("p4").innerHTML = "Number of errors you can stil make: " + tries;
    console.log("tries: " + tries);
    if (gameDiff == "easy") {
      if (tries == 10) { //change body parts
        changeHead();
      } else if (tries == 8) {
        changeTorso();
      } else if (tries == 6) {
        changeLarm();
      } else if (tries == 4) {
        changeRarm();
      } else if (tries == 2) {
        changeLleg();
      } else if (tries == 0) {
        changeFullbody();
        gameOver();
      }
    } else if (gameDiff == "medium") {
      if (tries == 5) {
        changeHead();
      } else if (tries == 4) {
        changeTorso();
      } else if (tries == 3) {
        changeLarm();
      } else if (tries == 2) {
        changeRarm();
      } else if (tries == 1) {
        changeLleg();
      } else if (tries == 0) {
        changeFulltorso();
        gameOver();
      }
    } else {
      if (tries == 3) {
        changeTorso();
      } else if (tries == 2) {
        changeRarm();
      } else if (tries == 1) {
        changeLleg();
      } else if (tries == 0) {
        changeFullbody();
        gameOver();
      }
    }
  }
}

function changeHead() { //functions for body parts
  if (skinValue == 0) {
    hMan.src = ("manphotos/head.png");
  } else if (skinValue == 1) {
    hMan.src = ("freddy/freddyHead.png");
  } else if (skinValue == 2) {
    hMan.src = ("foxy/foxyHead.png");
  } else {
    hMan.src = ("chica/chicaHead.png");
  }
}
function changeTorso() {
  if (skinValue == 0) {
    hMan.src = ("manphotos/torso.png");
  } else if (skinValue == 1) {
    hMan.src = ("freddy/freddyTorso.png");
  } else if (skinValue == 2) {
    hMan.src = ("foxy/foxyTorso.png");
  } else {
    hMan.src = ("chica/chicaTorso.png");
  }
}
function changeLarm() {
  if (skinValue == 0) {
    hMan.src = ("manphotos/lArm.png");
  } else if (skinValue == 1) {
    hMan.src = ("freddy/freddyLarm.png");
  } else if (skinValue == 2) {
    hMan.src = ("foxy/foxylArm.png");
  } else {
    hMan.src = ("chica/chicaLarm.png");
  }
}
function changeRarm() {
  if (skinValue == 0) {
    hMan.src = ("manphotos/rArm.png");
  } else if (skinValue == 1) {
    hMan.src = ("freddy/freddyRarm.png");
  } else if (skinValue == 2) {
    hMan.src = ("foxy/foxyrArm.png");
  } else {
    hMan.src = ("chica/chicaRarm.png");
  }
}
function changeLleg() {
  if (skinValue == 0) {
    hMan.src = ("manphotos/lLeg.png");
  } else if (skinValue == 1) {
    hMan.src = ("freddy/freddyLleg.png");
  } else if (skinValue == 2) {
    hMan.src = ("foxy/foxylLeg.png");
  } else {
    hMan.src = ("chica/chicaLleg.png");
  }
}
function changeFullbody() {
  if (skinValue == 0) {
    hMan.src = ("manphotos/fullBody.png");
  } else if (skinValue == 1) {
    hMan.src = ("freddy/freddyFullbody.png");
  } else if (skinValue == 2) {
    hMan.src = ("foxy/foxyFullbody.png");
  } else {
    hMan.src = ("chica/chicaFullbody.png");
  }
}

//hint
function hint() {
  hintSpot = wordBlank.indexOf("_");
  console.log(hintSpot);
  hintWord = wordSpace.charAt(hintSpot);
  alert("The word has at least one " + hintWord);
  hintButt.style.display = "none";
}

//winning, losing and restarting 
function restart() {
  document.location.reload();
}
function winGame() {
  gameDiv.style.display = "none";
  winDiv.style.display = "block";
}
function gameOver() {
  gameDiv.style.display = "none";
  failDiv.style.display = "block";
}