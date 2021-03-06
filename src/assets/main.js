'use strict';

let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let difficulty = 4;
let maxAttempts = 10;

function guess() {
    let input = document.getElementById('user-guess').value;
    //add functionality to guess function here
    let isDirtyChecker = `${answer.value}${attempt.value}`;
    if (isDirtyChecker == null || isDirtyChecker.length == 0 ) {
        setHiddenFields();
    }

    let validInput = validateInput(input);
    if (!validInput) {
        return false;
    }
    attempt.value++;

    let result = getResults(input);
    if (result) {
        setMessage('You Win! :)');
        showAnswer(true);
    } else {
        if (maxAttempts <= attempt.value) {
            setMessage('You Lose! :(');
            showAnswer(false);
        } else {
            setMessage('Incorrect, try again.');
            return;
        }
    }
    showReplay();
}
function showAnswer(success) {
    let codeElem = document.getElementById("code");
    codeElem.innerHTML = answer.value;
    let className = success ? "success" : "failure";
    codeElem.className = ` ${className}`;
}

function showReplay() {
    let guessDiv = document.getElementById("guessing-div");
    let replayDiv = document.getElementById("replay-div");

    guessDiv.style.display = "none";
    replayDiv.style.display = "block";
}

function getResults(newGuess) {
    let startHtml = `<div class='row'><span class='col-md-6'>${newGuess}</span><div class='col-md-6'>`;
    let endHtml = "</div></div>";
    let black = '<span class="glyphicon glyphicon-ok"></span>';
    let white = '<span class="glyphicon glyphicon-transfer"></span>';
    let space = '<span class="glyphicon glyphicon-remove"></span>';

    let correctCount = 0;
    let middleHtml = "";
    for (var i = 0; i < newGuess.length; i++) {
        var char = newGuess[i];
        
    // }
    // for (var char in newGuess) {
        // if (newGuess.hasOwnProperty(char)) {
        //     var element = newGuess[char];
            
        // }
        if (answer.value.includes(char)) {
            if (answer.value[i] == char) {
                middleHtml += black;
                correctCount++;
            } else {
                middleHtml += white;
            }
        } else {
            middleHtml += space;
        }
    }

    let resultElem = document.getElementById("results");
    resultElem.innerHTML += `${startHtml}${middleHtml}${endHtml}`;

    if (correctCount == difficulty) {
        return true;
    }

    return false;
}

//implement new functions here
function setHiddenFields(){
    let value = Math.floor(Math.random() * 10000);
    let strValue = `${"0".repeat(difficulty)}${value}`;
    answer.value = strValue.slice(strValue.length - difficulty);
    attempt.value = 0;
}

function setMessage(message) {
    document.getElementById("message").innerHTML = message;
}

function validateInput(input) {
    if (input != null && input.length == difficulty) {
        return true;
    }

    setMessage(`Guesses must be exactly ${difficulty} characters long.`);
    return false;
}