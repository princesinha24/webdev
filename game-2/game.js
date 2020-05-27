var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var start=false;
var currentLevel;
var i;
var point=0;
var hig=0;
function nextsequence(){
    userClickedPattern=[];
    start=true;
    currentLevel=0;
    $("h1").html("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var a=new Audio("sounds/"+randomChosenColour+".mp3");
    a.play();
    level+=1;
    console.log(randomChosenColour);
}
$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userChosenColour);
    currentLevel++;
    checkAnswer(currentLevel);
});
function playSound(name){
    var a=new Audio("sounds/"+name+".mp3");
    a.play();
}
function animatePress(currentColour){

    $("."+currentColour).addClass("pressed");
    setTimeout(() => {
        $("."+currentColour).removeClass("pressed");
      },100);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel-1]!=userClickedPattern[currentLevel-1]){
        $("h1").html("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
          },200);
          var over=new Audio("sounds/wrong.mp3");
          over.play();
          startover();
    }
    else{
        point++;
        $("#point").html("Point:"+point);
        if(point>hig){
            hig=point;
            $("#hig").html("Hightest Point:"+hig);
        }
    }
    if(currentLevel==level){
        setTimeout(() => {
            nextsequence();
          },1000);
    }
}
function startover(){
    start=false;
    gamePattern=[];
    level=0;
    point=0;
    $("#point").html("Point:"+point);

}
$(document).on("keydown",function(){
    if(start==false){
        nextsequence();
    }
});