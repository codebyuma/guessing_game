
// if the guess is off by 10 or less, it's hot
// if the guess is off by more than 11, it's cold


$( document ).ready(function() {
 
 var number = Math.floor((Math.random() * 100) + 1);
 var currentGuess;
 var guesses = [];
 var guessDifference;
 var hint ="";
 var guessesLeft=5;

 console.log(number);

 var updateHelpBlock = function (){
    $('.help-block').html(hint);
    hint="";
 }


 $('.guess').on('click', function (){
        event.preventDefault();
        if (guessesLeft>0){
          currentGuess=+$('#userGuess').val();
          guesses.push(currentGuess);

          if (number == currentGuess){
            console.log("SUCCESS!!!!!!");
            hint="SUCCESS!!!!!!";
            updateHelpBlock();
          }
          else {

            guessDifference = Math.abs(currentGuess - number);

            if (guessDifference <=10){
              hint+="You are hot";
            }
            else{
              hint+="You are cold";
            }

            if (currentGuess<number){
              hint +=". Guess higher.";
            }
            else{
              hint +=". Guess lower.";
            }

          guessesLeft--;
          if (guessesLeft==1){
            hint += "<br> You have 1 guess left.";
          } else if (guessesLeft>1){
            hint += "<br> You have " + guessesLeft + " guesses left.";
          } else {
            hint = "Sorry, that's not correct and you're out of guesses. <br>Please hit Replay to play again."
          }

          console.log (hint + "You have " + guessesLeft + " guesse(s) left.");
          updateHelpBlock();

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
    number = Math.floor((Math.random() * 100) + 1);
    guesses = [];
    guessesLeft=5;
    $('#userGuess').val("1-100");
    console.log("new number " + number);
    hint = "Enter a number between 1 and 100. <br> You have 5 guesses left.";
    updateHelpBlock();
 });
 

});