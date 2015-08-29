
// if the guess is off by 10 or less, it's hot
// if the guess is off by more than 11, it's cold


$( document ).ready(function() {
 
 var number = Math.floor((Math.random() * 100) + 1);
 var currentGuess;
 var guesses = [];
 var guessDifference;
 var differences = [];
 var hint ="";
 var guessesLeft=5;
 var previousGuesses="";
 var tempHint="";

 console.log(number);

 var updateHelpBlock = function (){
    $('.help-block').html(hint);
    hint="";
    tempHint="";
 }


 $('.guess').on('click', function (){
        event.preventDefault();
        if (guessesLeft>0){
          currentGuess=+$('#userGuess').val();
          if (currentGuess<1 || currentGuess>100 || (currentGuess%1!=0)){
            alert("Please enter a valid number between 1 and 100");
          }
          else {
            if (guesses.length>0 && (guesses.indexOf(currentGuess)!=-1)){
              hint = "You already tried that number. Try again."
              hint += "<br> Your guesses so far: " + previousGuesses.slice(0,previousGuesses.length-2);
              updateHelpBlock();
            } else {

            if (guesses.length>0){
              previousGuesses+= guesses[guesses.length-1] +", ";
            }

            guesses.push(currentGuess);

            if (number == currentGuess){
              console.log("SUCCESS!!!!!!");
              hint="SUCCESS!!!!!!<br>Hit Replay to play again.";
              updateHelpBlock();
              $('.guess').prop("disabled", true);
            }
            else {

              guessDifference = Math.abs(currentGuess - number);
              differences.push(guessDifference);

              if (differences.length>1){

                 if (guessDifference<=differences[differences.length-2]){
                    tempHint+="You are getting hotter";
                 } else {
                    tempHint+="You are getting colder";
                 }

              }

              if (guessDifference <=10){
                hint+="You are hot. "; 
                if (differences.length>1){
                  hint+= tempHint;
                }

              }
              else{
                hint+="You are cold. ";
                if (differences.length>1){
                  hint+= tempHint;
                }
              }

              if (currentGuess<number){
                hint +=" Guess higher.";
              }
              else{
                hint +=" Guess lower.";
              }

              guessesLeft--;
              if (guessesLeft==1){
                hint += "<br> You have 1 guess left.";
              } else if (guessesLeft>1){
                hint += "<br> You have " + guessesLeft + " guesses left.";
              } else {
                hint = "Sorry, that's not correct and you're out of guesses. <br> The correct answer was " + number + ". Please hit Replay to play again."
                $('.guess').prop("disabled", true);
              }

              if (previousGuesses!="" && !($('.guess').prop("disabled"))) {
                  hint += "<br> Your guesses so far: " + previousGuesses.slice(0,previousGuesses.length-2);
              }

              console.log (hint + "You have " + guessesLeft + " guesse(s) left.");
              updateHelpBlock();
              }
            }
          }
        } else {
            hint += "Sorry, you're out of guesses. <br>Please hit Replay to play again."
            updateHelpBlock();
      }
 });

 $('.hint').on('click', function(){
    event.preventDefault();
    hint = "The number is: <br>" + number;
    console.log(hint);
    updateHelpBlock();

 });
 
 $('.replay').on('click', function(){
    event.preventDefault();
    $('.guess').prop("disabled", false);
    number = Math.floor((Math.random() * 100) + 1);
    guesses = [];
    differences = [];
    guessesLeft=5;
    previousGuess="";
    $('#userGuess').val("1-100");
    console.log("new number " + number);
    hint = "Enter a number between 1 and 100. <br> You have 5 guesses left.";
    updateHelpBlock();
 });
 

});