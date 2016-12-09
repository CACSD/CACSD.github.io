/**
 * Created by Rocco Pietrofesa on 11/19/2016.
 */


var words = [];
var definitions = [];
var guessedCorrectly = ''; // letters correctly guessed by the player
var guessedCorrectlyView = '';
var matchingLetters = [];
var secret = '';
var hint = '';
var i = 0;
var guessedLetters = '';
var guessedLettersCorrect = 0;
var guessedLettersInCorrect = 0;
var guessedWordsCorrect = 0;
var guessedWordsIncorrect = 0;
var round = 1;
var score = 0;
var wrong = 0;
var time = 0;
var turns = 6;
var points = 0;
var outcome = '';

// var correctSound = new Audio('./sounds/NFF-bugs.wav');
// audio.play();
function playOutro(){
    document.getElementById("special-out").play();
}
function playComplete(){
    document.getElementById("special-in").play();
    setTimeout(playOutro, 1500);
}
// way to easily load an external file
// $("#update").load("./word_libraries/sat_words_1.txt");

/*
 loads the word data from the JSON file
 */
$(document).ready(function(){
    playComplete();
    $.getJSON('./word_libraries/words.json', function(info){
        console.log(info);
        var output = '';
        for(i = 0; i < info.terms.length; i++) {
            words.push(info.terms[i].word);
            definitions.push(info.terms[i].definition);
        }
        secretGenerator();
    });
});

// selects the secret word and relative hint
function secretGenerator(){
    var index = Math.floor((Math.random() * (words.length-1)));
// select secret word
    secret = words[index];
    hint = definitions[index];
    console.log('word :' +  secret);
    console.log('definition :' + hint);
//delete used word
    words.splice(index, 1);
    definitions.splice(index, 1);
    document.getElementById('hintValue').textContent=hint;
    // create empty guessed list
    matchingLetters = [];
    for(i = 0; i < secret.length; i++) {
        matchingLetters.push('-');
    }
    guessedCorrectlyView = matchingLetters.join(' ');
    document.getElementById('matchingLettersValue').innerHTML=guessedCorrectlyView;
}
/*
// clears the form entries
document.guessForm.guessEntry.onfocus=function() {
    document.getElementById("wordEntry").value='';
};
document.guessForm.wordEntry.onfocus=function() {
    document.getElementById("guessEntry").value='';
};

*/
/*
 this is the main algorithm that compares a guessed letter to the secret word
 */
function checkGuess(guess) {
    var match = false;
    if (guessedLetters.indexOf(guess) < 0){
        // compare 'guess' and 'secret word', flag 'match' if correct guess
        for (i = 0; i < secret.length; i++) {
            if (guess == secret[i]) {
                matchingLetters[i] = guess;
                match = true;
            }
        }
        // update the guessed letters
        if(guessedLetters.search('None') != -1) {
            guessedLetters = '';
        }
        guessedLetters = guessedLetters + ' ' + guess;
        // outcome based on match status
        // update the correctly guessed letters
        guessedCorrectlyView = matchingLetters.join(' ');
        guessedCorrectly = guessedCorrectlyView.replace(/ /g,'');

        if(match != true) {
            turns -= 1;
            score -= 5;
            points = -5;
            guessedLettersInCorrect += 1;
            if(turns != 0) {
                document.getElementById("addressed").play();
            }
        }
        else {
            score += 5;
            points += 5;
            guessedLettersCorrect += 1;
            if(guessedCorrectly != secret) {
                document.getElementById("complete").play();
            }
        }
    }
    endOfTurn();
}

/*
 // a word has been entered
 else {
 var word = document.getElementById('wordEntry').value.toLowerCase();
 if (word.length >= 2){
 if (word != secret) {
 turns -= 1;
 score -= 50;
 points = -50;
 guessedWordsIncorrect += 1;
 if(turns != 0) {
 document.getElementById("addressed").play();
 }
 }
 else {
 guessedCorrectly = word;
 score += 50;
 points += 50;
 guessedWordsCorrect += 1;
 }
 }
 endOfTurn();
 }
 */


// update data fields
function updateDataFields() {
    document.getElementById('roundValue').textContent=round.toString();
    document.getElementById('scoreValue').textContent=score.toString();
    // document.getElementById('timeValue').textContent=time.toString();
    // document.getElementById('pointsValue').textContent=points.toString();
    // document.getElementById('guessedLettersCorrectValue').textContent=guessedLettersCorrect.toString();
    // document.getElementById('guessedLettersInCorrectValue').textContent=guessedLettersInCorrect.toString();
    // document.getElementById('guessedWordsCorrectValue').textContent=guessedWordsCorrect.toString();
    // document.getElementById('guessedWordsInCorrectValue').textContent=guessedWordsIncorrect.toString();
    // document.getElementById('guessedLettersValue').textContent=guessedLetters;
    document.getElementById('matchingLettersValue').textContent=guessedCorrectlyView;
}

// selects the pic to display based on the turn count
function picChooser(){
    if(turns == 0){
        document.getElementById('picView').src='./images/hangman/hangman_0.png';
    }
    else if(turns == 1){
        document.getElementById('picView').src='./images/hangman/hangman_1.png';
    }
    else if(turns == 2){
        document.getElementById('picView').src='./images/hangman/hangman_2.png';
    }
    else if(turns == 3){
        document.getElementById('picView').src='./images/hangman/hangman_3.png';
    }
    else if(turns == 4){
        document.getElementById('picView').src='./images/hangman/hangman_4.png';
    }
    else if(turns == 5){
        document.getElementById('picView').src='./images/hangman/hangman_5.png';
    }
    else{
        document.getElementById('picView').src='./images/hangman/hangman_6.png';
    }
}

function endOfTurn() {
    // player wins
    if (guessedCorrectly.localeCompare(secret) == 0) {
        turns = 6;
        round += 1;
        score += 75;
        points = 75;
        //guessedCorrectlyView = 'None';
        guessedLetters = 'None';
        secretGenerator();
        picChooser();
        updateDataFields();
        playComplete();
        resetLetters();
    }
    // player loses
    else if (turns == 0) {
        document.getElementById("choice-bad").play();
        turns = 6;
        score -= 75;
        points = -75;
        guessedCorrectlyView = 'None';
        guessedLetters = 'None';
        alert('You lost this round. The word was: ' + secret);
        secretGenerator();
        picChooser();
        updateDataFields();
        resetLetters();
    }
    updateDataFields();
    picChooser();
    // document.getElementById("guessEntry").value = '';
    // document.getElementById("wordEntry").value = '';
}

//enter key functionality
document.onkeypress = function(e){
    if( e.code == 'Enter' &&
        (document.getElementById("guessEntry").value != '' ||
        document.getElementById("wordEntry").value != '')){
        checkGuess();
    }

};

/*
 keyboard entry functionality
 This allows the user to use the keyboard for entry as well as solving the entire puzzle
 and pressing enter.
  */
document.addEventListener('keypress', function(e) {
    if (e.keyCode == 13 && $('#wordEntry').value != '') {
        checkWord($('#wordEntry').value);
    }
    else if(e.keyCode >= 65 || e.keyCode <= 90){
        //eventId = '#' + $(this).attr('id').toString();
        $('#'+e.key).addClass("used"); //crosses out letter
        checkGuess(e.key);
    }
});

/*
 alphabet panel button press
 This listens for a letter in the alphabet area be pressed. It finds the "id" of the span
 tag that was pressed, pulls the "char" and passes it on.
 */
$('span').click(function(){
    console.log($(this).attr('id'));
    var eventId = '#' + $(this).attr('id').toString();
    console.log(eventId);
    $(eventId).addClass("used"); //crosses out letter
    checkGuess($(eventId).html());
});

/*
 This will reset the alphabet panel and remove the crossed out background image->".used"
 */
function resetLetters(){
    $('span').each(function () {
        $(this).removeClass('used');
    });
}

// this will enter the free letter when coin achieved
function freeLetter (){
    i = guessedCorrectly.indexOf('-');
    checkGuess(secret.charAt(i));
}

