//Code Block: Initialisations
var gamePattern=[]; // an array to store the game patterns.
var userClickedPattern=[]; // an array to store the user Clicked Pattern.
var buttonColor = ["green","red","yellow","blue"];  // the color codes.
var started = false;
var level=0;



//Code Block:Starter Engine
$(document).keypress(function() {     // Functions catches any key press and starts the game.
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});



//Code Block: I/O Response Logic Engine
//user starts playing and all the user actions are caught in this block
$( ".btn" ).click(function() {
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour); 
  playAudio(userChosenColour);  
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length-1); //userClickedPattern.length-1 as we need to passing in the index of the last answer in the user's sequence.
});



//Code Block: Equality Checker Logic Engine
//creating a function called check answer for checking user pattern against machine pattern
function checkAnswer(currentLevel){ //game carry-on code
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function() {
        nextSequence(); //next sequence is called after a 1000 millisecs  of user last click
      }, 1000);
    }
    }   //game Over code 
  else{
    playAudio("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Lol Skill Issue bro. Press Any key to restart.");
    setTimeout(function() {
      $("body").removeClass("game-over");
  },200);

  startOver();
}
}



//Code Block: Next Squence Generation Logic 
//a function to generate a random number which will be used to mapped to the colour buttons.
function nextSequence() {
  userClickedPattern=[]; //user clicked pattern is reset after one level is finished
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);    
  var randomChoosenColor=buttonColor[randomNumber];         //the generated random number will point to postion of colour elements in the array buttonColor , that chosen colour will then be used.
  gamePattern.push(randomChoosenColor); // the randomChoosenColor is pushed to the array gameparttern.
  $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playAudio(randomChoosenColor);
 }



//Code Block: Audio Response
function playAudio(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
  }



//Code Block: Animation Response
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
      $("#"+currentColour).removeClass('pressed');
  },100);
  }

  

//Code Block:Start-over 
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}