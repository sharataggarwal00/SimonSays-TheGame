let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
// to keep track if the game started
let started = false;
// to keep track of the level
let level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(event) {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // passing the index of last entry by user to check with last entry in gamePattern
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  // check if most recent user entry is same as the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    // to check if the user finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  }

  else {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  // every time nextSequence() is called, we go one level u[]
  level++;
  // change the title to new level
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(chosenColour) {
  let audio = new Audio('sounds/' + chosenColour + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}



// $("." + randomChosenColour).click(function() {

//   $("body").css("background-color", "red");
// })
