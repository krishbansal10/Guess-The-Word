const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset"),
hint = document.querySelector(".hint span"),
wrongLetter = document.querySelector(".wrong span"),
guessLeft = document.querySelector(".guesses span"),
msg = document.querySelector(".msg"),
quitBtn = document.querySelector(".quit"),
body = document.querySelector("body"),
box = document.querySelector(".wrapper"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, corrects = [], incorrects = [];

function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    maxGuesses = 8, corrects = [], incorrects = [];

    let html = "";
    for(let i=0; i<word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;
    msg.innerText = "All the Best!"
}

randomWord();

function initGame(event) {
    body.style.backgroundColor = "#56baed";
    let key = event.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key.toLowerCase()}`)
        && !corrects.includes(key.toLowerCase())) {
        if(word.includes(key)) {
            for(let i=0; i<word.length; i++) {
                if(word[i] === key) {
                    inputs.querySelectorAll("input")[i].value = key.toUpperCase();
                    corrects.push(key.toLowerCase());
                }
            }
        } else {
            maxGuesses--;
            incorrects.push(` ${key.toLowerCase()}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects;
    }
    typingInput.value = "";

    if(corrects.length === word.length) {
        msg.innerText = "Congratulations! You guessed it.";
        body.style.backgroundColor = "#6dbb6d";
        confetti.start();
        setTimeout(function() {
            confetti.stop();
        }, 1000)
        setTimeout(function() {
            randomWord();
            initGame();
        }, 2000);
    } else if(maxGuesses < 1) {
        msg.innerText = "Game Over!";
        for(let i=0; i<word.length; i++) {
            inputs.querySelectorAll("input")[i].value = word[i].toUpperCase();
        }
        body.style.backgroundColor = "#ff4455";
        box.classList.add("shake");
        setTimeout(function() {
            box.classList.remove("shake");
        }, 1000)
        setTimeout(function() {
            randomWord();
            initGame();
        }, 2000);
    }
}

function func() {
    typingInput.focus();
}

quitBtn.addEventListener("click", function() {
    msg.innerText = "You Quit!";
    for(let i=0; i<word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i].toUpperCase();
    }
    body.style.backgroundColor = "#ff4455";
    box.classList.add("shake");
    setTimeout(function() {
        box.classList.remove("shake");
    }, 1000)
    setTimeout(function() {
        randomWord();
        initGame();
    }, 1500);
})
resetBtn.addEventListener("click", randomWord);
resetBtn.addEventListener("click", function() {
    maxGuesses = 8;
    body.style.backgroundColor = "#56baed";
})
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", func);
document.addEventListener("keydown", func);