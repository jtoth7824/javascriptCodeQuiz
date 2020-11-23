/* global variables */
var secondsLeft = 75;
var buttonId;
var personalScore;
var questionNum = 1;
var score = 0;
var count = 0;
var initials = "";
/* Question/answer set */
var questionSet = {
    javaQuestion: ["Commonly used data types do NOT include:", "Condition in If/Else statement is enclosed within:", "Arrays in javascript can be used to store:", "String values must be enclosed within ______ when being assigend", "A very useful tool used during development and \n debugging for printing content to the debugger is:"],
    choiceSet1: ["Strings", "Booleans", "Alerts", "Numbers"],
    choiceSet2: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    choiceSet3: ["Numbers & Strings", "Other Arrays", "Booleans", "All of the above"],
    choiceSet4: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
    choiceSet5: ["javascript", "terminal/bash", "for loop", "console.log"],
    correctanswer: ["Alerts", "Curly Brackets", "All of the above", "Quotes", "console.log"],
};
/* global variables for html elements */
var timeEl = document.querySelector(".timer");
var judgementEl = document.body.querySelector(".judgement");
var personalScoreEl = document.body.querySelector("#personalScore");
var highScoresEl = document.body.querySelector("#highScores");
var choice1El = document.querySelector(".choice1");
var choice2El = document.querySelector(".choice2");
var choice3El = document.querySelector(".choice3");
var choice4El = document.querySelector(".choice4");
var startEl = document.querySelector("#start");
var buttonEl = document.querySelectorAll(".input");
var quizEl = document.querySelector("#quiz");
var tryEl = document.querySelector("#try");
var currentScoreEl = document.body.querySelector("#currentScore");
var highScoreEl = document.body.querySelectorAll(".textBox");
var playerInitialsEl = document.body.querySelector(".playerInitials");
var buttonElements = document.querySelectorAll(".button");
var submitScoreEl = document.body.querySelector("#saveScore");
var resetScoresEl = document.body.querySelector("#resetScores");
var goBackEl = document.body.querySelector("#goBack");

/* countdown timer function */
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;
        /* check if timer reached 0 for quiz or if all questions have been displayed */
        if (secondsLeft <= 0 || questionNum === 6) {
            clearInterval(timerInterval);
        }
    }, 1000);
};

/* Code Quiz Start button listener */
startEl.addEventListener("click", function () {
    /* start timer for quiz */
    setTime();
    /* switch screens */
    tryEl.className = "card-body hidden";
    quizEl.className = "card-body";
    /* display first question/answer set */
    nextQuestion();
});

/* for loop to set up answer button event listeners */
for (var i = 0; i < buttonElements.length; i++) {
    buttonElements[i].addEventListener('click', function () {
        /* Each listener needs to check whether selected answer is wrong or correct and update score */
        buttonId = this.getAttribute('value');
        if (buttonId === questionSet.correctanswer[questionNum - 1]) {
            judgementEl.innerText = "Correct!";
            questionNum = questionNum + 1;
        } else {
            judgementEl.innerHTML = "Wrong answer!";
            /* if answer was incorrect - deduct 15 seconds from timer/score */
            secondsLeft = secondsLeft - 15;
            questionNum = questionNum + 1;
        }
        /* check if all question/answer sets have been displayed */
        if (questionNum === 6) {
            quizEl.className = "card-body hidden";
            personalScoreEl.className = "card-body";
            score = secondsLeft;
            /* display user score */
            currentScoreEl.textContent = currentScoreEl.textContent + "  " + score;
        } else {
            /* if not the final question/answer set call function to display next question */
            nextQuestion();
        }
    });
};

/* Save personal Score button listener */
submitScoreEl.addEventListener("click", function () {
    /* switch screens */
    personalScoreEl.className = "card-body hidden";
    highScoresEl.className = "card-body";
    /* add player initials and score to high score list */
    initials = playerInitialsEl.value;
    highScoreEl[0].value = playerInitialsEl.value + " " + score;
});

/* Reset High Score button listener */
resetScoresEl.addEventListener("click", function () {
    /* remove high scores from page upon Reset Scores button clicked */
    for (i = 0; i < highScoreEl.length; i++) {
        highScoreEl[i].remove();
    }
});

/* Reset Code Quiz button listener */
goBackEl.addEventListener("click", function () {
    /* Reload webpage to start Code Quiz again */
    window.location.reload();
});

/* Displays the next question/answer set based upon current questionNum variable */
function nextQuestion() {
    var next = "choiceSet" + questionNum;
    var questionEl = document.body.querySelector(".question");

    /* display current question */
    questionEl.textContent = questionSet.javaQuestion[questionNum - 1];

    /* display matching answers to current question */
    var but1El = document.body.querySelector("#answer1");
    but1El.value = questionSet[next][0];
    var but2El = document.body.querySelector("#answer2");
    but2El.value = questionSet[next][1];
    var but3El = document.body.querySelector("#answer3");
    but3El.value = questionSet[next][2];
    var but4El = document.body.querySelector("#answer4");
    but4El.value = questionSet[next][3];
};