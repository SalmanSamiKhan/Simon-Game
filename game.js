let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let userPattern = [];
let level=0;
let started = false;

function restart(){
    level=0;
    gamePattern=[];
    started=false;
}

$(document).keypress(function (){
    if(!started){ //if game not started
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function(){
    // User chosen color
    let userColor = $(this).attr("id");

    // add this color to user pattern array
    userPattern.push(userColor);

    //Play sound when user click a color
    playSound(userColor);

    //Add animation
    animatePress(userColor);

    checkAnswer(userPattern.length-1);
    
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

        playSound("wrong");
        animateGameOver();
        $("h1").text("Game Over, Press Any Key to Restart");
        restart();
    }

}


function nextSequence() {
    userPattern = [];
    level+=1;
    $("#level-title").text("Level "+level);

    let num = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[num];
    gamePattern.push(randomColor);

    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    //Playing sound
    playSound(randomColor);
}

function playSound(name){
    let sound = new Audio("sounds/"+name+".mp3");
        sound.play();
}

function animatePress(color){
    // add animation 
    $("#"+color).addClass("pressed");
    // remove animation
    setTimeout(function (){
        $("#"+color).removeClass("pressed");    
    }, 100);
}

function animateGameOver(){
    $("body").addClass("game-over");
    // remove animation
    setTimeout(function (){
        $("body").removeClass("game-over");    
    }, 200);
}
// document.addEventListener("keypress", function(event){
//     console.log(event.key);
//     if(event.key.toLowerCase()==='s'){
//         nextSequence();
//     }
// });