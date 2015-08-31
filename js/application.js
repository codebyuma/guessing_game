
$( document ).ready(function() {

var number = Math.floor((Math.random() * 100) + 1); // this is the number the user needs to guess
 var guessesLeft=5; // counter of guesses - user gets 5 guesses
 var currentGuess; // user's current guess
 var guesses = []; // array to store user guesses for comparison purposes
 var previousGuesses=""; // string of user guesses for display purposes
 var guessDifference; // current difference between the number and the user's guess
 var previousDifference = null; // used to store the previous difference to provide a hint on whether the guesses are getting hotter or colder
 var hint =""; // string to be used for display in the help-block area
 var progressHint=""; // part of the string that will be added to hint for display in the help-block area

// function used to update the help-block area of the game board with hints, progress, previous guesses, etc.
var updateHelpBlock = function (){
  $('.help-block').html(hint);
  hint="";
  progressHint="";
}

// eventHandler for the Guess button
// when the user hits the submit button, process the guess and provide tips as necessary for their next guess.
$('.guess').on('click', function (){
  event.preventDefault();
        if (guessesLeft>0){ // if user has guesses left

          currentGuess=+$('#userGuess').val(); // read in the number the user entered and store in currentGuess

          // if the user enters an invalid number, prompt for a new number and don't do anything else until they click guess again
          if (currentGuess<1 || currentGuess>100 || (currentGuess%1!=0)){
            alert("Please enter a valid number between 1 and 100");
          }
          else { // now that the user has entered a valid number...

            // check if the user has guessed this number already
            // if the array of guesses is not 0 (ie. this isn't their first guess), and if we find this currentGuess in the guesses array
            // then prompt the user to enter another number. This won't count as a try, so the number of remaining guesses will stay the same
            if (guesses.length>0 && (guesses.indexOf(currentGuess)!=-1)){
              hint = "You already tried that number. Try again."
              hint += "<br> Your guesses so far: " + previousGuesses.slice(0,previousGuesses.length-2); // slice to drop the trailing comma
              updateHelpBlock(); // call function to update the help-block text
              $('#userGuess').val("1-100"); // reset input field so user can enter new guess

            } else { // if this is a unique guess

            guesses.push(currentGuess); // add this current guess to the guesses array

            if (number == currentGuess){ // if the currentGuess matches the number, print a success message, apply the success class to the help block, ask the user to replay and disable the Guess button.
              hint="Congratulations! You are correct!<br>Hit <i>Replay</i> to play again.";
              updateHelpBlock();
              $('.help-block').addClass("success");
              $('.guess').prop("disabled", true);
            }
            else { // if the guess doesn't match the number, we need to provide hints for the next round

              // calculate the difference between the guess and the number
              guessDifference = Math.abs(currentGuess - number);

              if (previousDifference!=null){ // if this is not the first guess, we need to indicate if the user's guesses are getting hotter or colder
                 // if the current guess difference is less than or equal to the previous guess difference, then the user is getting hotter
               if (guessDifference<=previousDifference){
                progressHint+="<br> Based on your last guess, you are getting hotter.";
                } else { // if the difference is more than the previous, then the user is getting colder. 
                  progressHint+="<br> Based on your last guess, you are getting colder. ";
                }

              }

              // store the current guess difference in previousDifference for comparison purposes and hints later
              previousDifference=guessDifference;
              
              // depending on what the guess difference is, display the appropriate message and store the icon with the current guess in the previousGuess string for display
              if (guessDifference <=10){
                hint+="You are hot <i class='fa fa-fire'></i><i class='fa fa-fire'></i>"; 
                previousGuesses+= "<i class='fa fa-fire'></i>" + currentGuess +", ";
              }
              else if (guessDifference < 20){
                hint+="You are warm <i class='fa fa-fire'></i>";
                previousGuesses+= "<i class='fa fa-fire'></i>" + currentGuess +", ";
              }
              else if (guessDifference < 30) {
                hint+="You are cold <i class='fa fa-cube'></i>";
                previousGuesses+= "<i class='fa fa-cube'></i>" + currentGuess +", ";
              }
              else{ 
                hint+="You are ice cold <i class='fa fa-cube'></i> <i class='fa fa-cube'></i>";
                previousGuesses+= "<i class='fa fa-cube'></i>" + currentGuess +", ";
              }

              // provide a tip for the next guess depending on whether the guess is higher or lower than the number
              if (currentGuess<number){ // if the currentGuess is less than the number, instruct the user to guess higher
                hint +=" | Guess higher <i class='fa fa-arrow-up'></i>";
              }
              else{ // if the currentGuess is more than the number, instruct the user to guess lower
                hint +=" | Guess lower  <i class='fa fa-arrow-down'></i>";
              }

              guessesLeft--; // reduce the guessesLeft counter

              // add the appropriate message with the number of guesses left.
              if (guessesLeft==1){
                hint += "<br> You have 1 guess left.";
              } else if (guessesLeft>1){
                hint += "<br> You have " + guessesLeft + " guesses left.";
              } else {
                hint = "Sorry, that's not correct and you're out of guesses. <br> The correct answer was " + number + ". Please hit <i>Replay</i> to play again."
                $('.guess').prop("disabled", true);
              }

              // if there are previous guesses and the user is not out of guesses, then display the previous guesses.
              if (guessesLeft!=0) {
                  hint += "<br> Your guesses so far: " + previousGuesses.slice(0,previousGuesses.length-2); // slice to drop the trailing comma
                  hint += progressHint;
                }

              // update the help-block to display the various hints
              updateHelpBlock();

              // reset the input field so the user can enter their next guess
              $('#userGuess').val("1-100");

            }
          }
        }
        } else { // user doesn't have any guesses left, display the below message in the help block
        hint += "Sorry, you're out of guesses. <br>Please hit <i>Replay</i> to play again."
        updateHelpBlock();
      }
});

// eventHandler for the Hint button
// if the user clicks the hint button, show the value of the number. 
$('.hint').on('click', function(){
  event.preventDefault();
  if (guessesLeft==5){
    hint = "You need to guess at least once before we give you a hint! <br> Try again."
  } else {
    hint = "The number is: <br>" + number;
  }
  updateHelpBlock();

});

 // eventHandler for the Replay button
 // if the user clicks on replay, generate a new number, set the guess button to active, reset all variables 
 $('.replay').on('click', function(){
  event.preventDefault();
  $('.guess').prop("disabled", false);
  number = Math.floor((Math.random() * 100) + 1);
  guesses = [];
  previousDifference = null;
  guessesLeft=5;
  previousGuesses="";
  $('#userGuess').val("1-100");
  hint = "Enter a number between 1 and 100. <br> You have 5 guesses left.";
  updateHelpBlock();
  $('.help-block').removeClass("success");
  });
 

});