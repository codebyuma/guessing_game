
// if the guess is off by 10 or less, it's hot
// if the guess is off by more than 11, it's cold


$( document ).ready(function() {
 
 var number = Math.floor((Math.random() * 100) + 1);
 var currentGuess;
 var guesses = []; // array to store user guesses
 var guessDifference; // current difference between the number and the user's guess
 var differences = []; // array to store user guess differences
 var hint ="";
 var guessesLeft=5;
 var previousGuesses=""; // string of user gusses
 var tempHint="";

 console.log(number);

 var updateHelpBlock = function (){
    $('.help-block').html(hint);
    hint="";
    tempHint="";
 }


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
              hint += "<br> Your guesses so far: " + previousGuesses.slice(0,previousGuesses.length-2);
              updateHelpBlock();

            } else { // if this is a unique guess

            //if (guesses.length>0){ // if this is not their first guess, add the previous guess to the previous guesses string
              //previousGuesses+= guesses[guesses.length-1] +", ";
            //}

            guesses.push(currentGuess); // then add this current guess to the guesses array

            if (number == currentGuess){ // if the currentGuess matches the number, print a success message, ask them to replay and disable the Guess button.
              console.log("SUCCESS!!!!!!");
              hint="SUCCESS!!!!!!<br>Hit Replay to play again.";
              updateHelpBlock();
              $('.help-block').addClass("success");
              $('.guess').prop("disabled", true);
            }
            else { // if the guess doesn't match the number

              // calculate the difference between the guess and the number, and add it to the differencees array for future reference
              guessDifference = Math.abs(currentGuess - number);
              differences.push(guessDifference);

              if (differences.length>1){ // if this is not the first guess, we need to indicate if the user's guesses are getting hotter or colder
                 // if the current guess difference is less than or equal to the previous guess difference, then the user is getting hotter
                 if (guessDifference<=differences[differences.length-2]){
                    tempHint+="<br> Based on your last guess, you are getting hotter.";
                 } else { // if the difference is more than the previous, then the user is getting colder. 
                    tempHint+="<br> Based on your last guess, you are getting colder. ";
                 }

              }

              // if the guessDifference is less than or equal to 10, then indicate that the user is hot.
              if (guessDifference <=10){
                hint+="You are hot. "; 
                if (differences.length>1){ // if this is not the first guess, add the tempHint to display
                 // hint+= tempHint;
                }
              }
              else if (guessDifference < 20){
                hint+="You are warm. "
              }
              else if (guessDifference < 30) {
                hint+="You are cold. "
              }
              else{ // if the guessDifference is more than 10, then indicate that the user is cold.
                hint+="You are ice cold. ";
                if (differences.length>1){
                  //hint+= tempHint;
                }
              }

              // if the currentGuess is less than the number, instruct the user to guess higher
              if (currentGuess<number){
                hint +=" Guess higher.";
              }
              else{ // if the currentGuess is more than the number, instruct the user to guess lower
                hint +=" Guess lower.";
              }

              guessesLeft--; // reduce the guessesLeft counter

              // add the appropriate message to hint with the number of guesses left.
              if (guessesLeft==1){
                hint += " You have 1 guess left.";
              } else if (guessesLeft>1){
                hint += " You have " + guessesLeft + " guesses left.";
              } else {
                hint = "Sorry, that's not correct and you're out of guesses. <br> The correct answer was " + number + ". Please hit Replay to play again."
                $('.guess').prop("disabled", true);
              }

              previousGuesses+= guesses[guesses.length-1] +", ";

              // if there are previous guesses and the user is not out of guesses, then display the previous guesses.
              if (guessesLeft!=0) {
                  hint += tempHint;
                  hint += "<br> Your guesses so far: " + previousGuesses.slice(0,previousGuesses.length-2);
              }

              console.log (hint + "You have " + guessesLeft + " guesse(s) left.");
              updateHelpBlock();
              $('#userGuess').val("1-100");
              }
            }
          }
        } else { // user doesn't have any guesses left
            hint += "Sorry, you're out of guesses. <br>Please hit Replay to play again."
            updateHelpBlock();
      }
 });

// if the user clicks the hint button, show the value of the number. 
 $('.hint').on('click', function(){
    event.preventDefault();
    hint = "The number is: <br>" + number;
    console.log(hint);
    updateHelpBlock();

 });
 
 // if the user clicks on replay, generate a new number, set the guess button to active, reset all variables 
 $('.replay').on('click', function(){
    event.preventDefault();
    $('.guess').prop("disabled", false);
    number = Math.floor((Math.random() * 100) + 1);
    guesses = [];
    differences = [];
    guessesLeft=5;
    previousGuesses="";
    $('#userGuess').val("1-100");
    console.log("new number " + number);
    hint = "Enter a number between 1 and 100. <br> You have 5 guesses left.";
    updateHelpBlock();
    $('.help-block').removeClass("success");
 });
 

});