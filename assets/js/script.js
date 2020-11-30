/* global variables */
var secondsLeft = 75;
var personalScore;
var questionNum = 1;
var score = 0;
var savedInitials = "";
var highScores = [];
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
var startEl = document.querySelector("#start");
var buttonEl = document.querySelectorAll(".input");
var quizEl = document.querySelector("#quiz");
var startEl = document.querySelector("#start");
var currentScoreEl = document.body.querySelector("#currentScore");
var highScoreEl = document.body.querySelectorAll(".textBox");
var playerInitialsEl = document.body.querySelector(".playerInitials");
var submitScoreEl = document.body.querySelector("#saveScore");
var resetScoresEl = document.body.querySelector("#resetScores");
var goBackEl = document.body.querySelector("#goBack");
var verdictEl = document.body.querySelector(".verdict");
var navEl = document.body.querySelector("#topNav");
var hsList = document.body.querySelector("#hsList");
var answerList = document.querySelector("#answers");
var viewHSLinkEl = document.querySelector("#viewHSLink");

function displayHS() {
    /* clear elements inside the ul tag to remove existing high scores*/
    hsList.innerHTML = "";

    /* for loop to re-display the list of high scores from local storage */
    for (var i = 0; i < highScores.length; i++) {
        var li = document.createElement("li");

        /* set user initials and score for li tag */
        li.textContent = (i + 1) + ".  " + highScores[i].initials + "  :   " + highScores[i].score;

        /* append high score as a child to the ul tag (hsList) */
        /*keep the following line!!!!!!*/
/*        hsList.appendChild(li);*/

        if (score === highScores[i].score && savedInitials === highScores[i].initials) {
            li.className = "tryButton";
            li.style.display = "inline-block";
            li.style.backgroundColor = "red";
            /* append high score as a child to the ul tag (hsList) */
            /*keep the following line!!!!!!*/
            hsList.appendChild(li);            
            var div = document.createElement("span");
            div.textContent = "<---- Your current score";
            div.className = "try";
            hsList.appendChild(div);
        }
        else {
            /* append high score as a child to the ul tag (hsList) */
            /*keep the following line!!!!!!*/
            hsList.appendChild(li);
        }

    }
    /* save high scores to local storage */
    storeHS();
}

function displayAnswers() {
    var next = "choiceSet" + questionNum;

    /* loop over answer choice set and display the choices */
    for (var j = 0; j < questionSet[next].length; j++) {

        var liAns = document.createElement("li");

        /* set answer choice as text of li tag */
        liAns.id = "displayedAnswers";

        var Span = document.createElement("span");
        Span.textContent = (j + 1) + ".  " + questionSet[next][j];
        liAns.appendChild(Span);

        /* append answer choice as a child to the ul tag (answerList) */
        answerList.appendChild(liAns);
    }
}

init();

function init() {
    // Get stored high scores from localStorage
    // Parsing the JSON string to an object
    var storedHS = JSON.parse(localStorage.getItem("highScores"));

    // If high scores were retrieved from localStorage, update the high scores array to it
    if (storedHS === null) {
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }
}


function storeHS() {
    /* save highScores to local storage after channging object to String */
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

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
    startEl.className = "card-body hidden";
    quizEl.className = "card-body";
    /* display first question/answer set */
    nextQuestion();
});

/* event listener for answer buttons */
answerList.addEventListener("click", function (event) {
    event.preventDefault();

    /* check if text inside element user clicked on matches the correct answer */
    if (event.target.innerText.indexOf(questionSet.correctanswer[questionNum - 1]) != -1) {
        /* display 'Correct' since user answer matched */
        event.target.className = "correct";
        judgementEl.innerText = "Correct!";
        questionNum = questionNum + 1;
    } else {
        /* display 'wrong' since user answer did NOT match */
        event.target.className = "wrong";
        judgementEl.innerHTML = "Wrong answer!";
        /* take extra time off timer since user answered incorrectly */
        secondsLeft = secondsLeft - 15;
        /* increment to next question */
        questionNum = questionNum + 1;
    };

    /* check if end of quiz due to no more questions in array */
    if (questionNum === 6) {
        /* switch screens */
        quizEl.className = "card-body hidden";
        personalScoreEl.className = "card-body";
        /* set score based upon time remaining */
        score = secondsLeft;
        /* display user score to screen */
        currentScoreEl.firstElementChild.textContent = score;
        /* decide if user answered final question correctly and display prompt */
        if (event.target.innerText.indexOf(questionSet.correctanswer[questionNum - 2]) != -1) {
            verdictEl.innerText = "Correct!";
        } else {
            verdictEl.innerText = "Wrong answer!";
        };
    } else {
        /* clear question from screen when advancing to next quiz question */
        clearQuestion();
        /* display next question/answer set to screen when advancing to next quiz question */
        nextQuestion();
    }
});

function sortFunction() {
    highScores.sort(function (a, b) {
        return b.score - a.score
    });
}

/* remove verdict when user changes text box initials field */
playerInitialsEl.addEventListener("input", function () {
    /* when user changes the initials field remove the Correct/Wrong indication */
    verdictEl.className = "hidden";
});

/* Save personal Score button listener */
submitScoreEl.addEventListener("click", function () {
    /* populate object with initials and score */
    var hsEntry = {
        initials: playerInitialsEl.value.trim(),
        score: score
    };
    savedInitials = hsEntry.initials;

    if (hsEntry.initials !== "") {
        /* switch screens */
        personalScoreEl.className = "card-body hidden";
        highScoresEl.className = "card-body";
        navEl.className = "hidden";

        /* retrieve current high scores from local storage */
        var storedHS = JSON.parse(localStorage.getItem("highScores"));
        if (storedHS !== null) {
            highScores = storedHS;
            /* add new high score to end of high scores array */
            highScores.push(hsEntry);
        }

        sortFunction();
        /* display the updated high score list to screen */
        displayHS();
    } else {
        alert("Need to enter initials");
    }

});

/* View High Scores button listener */
viewHSLinkEl.addEventListener("click", function () {
    /* switch screens */
    navEl.className = "hidden";
    personalScoreEl.className = "card-body hidden";
    startEl.className = "card-body hidden";
    quizEl.className = "card-body hidden";
    highScoresEl.className = "card-body";

    /* retrieve current high scores from local storage */
    var storedHS = JSON.parse(localStorage.getItem("highScores"));
    highScores = storedHS;
    /* display the high score list on screen */
    displayHS();
});

/* Reset High Score button listener */
resetScoresEl.addEventListener("click", function () {
    var lengthHS = highScores.length;

    /* pop each element off from the end of array until array is empty */
    for (var m = 0; m < lengthHS; m++) {
        highScores.pop();
    }
    /* update local storage with empty high score array */
    storeHS();
    /* display the updated high score list to screen */
    displayHS();
});

/* Reset Code Quiz button listener */
goBackEl.addEventListener("click", function () {
    /* Reload webpage to start Code Quiz again */
    window.location.reload();
});

/* Displays the next question/answer set based upon current questionNum variable */
function nextQuestion() {
    var questionEl = document.body.querySelector(".question");

    /* display current question */
    questionEl.textContent = questionSet.javaQuestion[questionNum - 1];

    /* display matching answers to current question */
    displayAnswers();
};

function clearQuestion() {
    var ans = document.querySelectorAll("#displayedAnswers");
    /* remove all answers for current question from screen */
    for (var i = 0; i < 4; i++) {
        ans[i].remove();
    }
}