var timeEl = document.querySelector(".timer");
var secondsLeft = 75;
var buttonId;
var personalScore;
var questionNum = 1;
var questionSet = {
    javaQuestion: ["Commonly used data types do NOT include:", "Condition in If/Else statement is enclosed within:", "Arrays in javascript can be used to store:", "String values must be enclosed within ______ when being assigend", "A very useful tool used during development and \n debugging for printing content to the debugger is:"],
    choiceSet1: ["Strings", "Booleans", "Alerts", "Numbers"],
    choiceSet2: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    choiceSet3: ["Numbers & Strings", "Other Arrays", "Booleans", "All of the above"],
    choiceSet4: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
    choiceSet5: ["javascript", "terminal/bash", "for loop", "console.log"],
    correctanswer: ["Alerts", "Curly Brackets", "All of the above", "Quotes", "console.log"],
};
var judgementEl = document.body.querySelector(".judgement");
var personalScoreEl = document.body.querySelector("#personalScore");

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        console.log(secondsLeft);
        timeEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            /*     sendMessage();*/
        }
    }, 1000);
};

/*function sendMessage() {
  timeEl.textContent = " ";

  var imgEl = document.createElement("img");

  imgEl.setAttribute("src", "images/image_1.jpg");
  mainEl.appendChild(imgEl);

}
*/

var choice1El = document.querySelector(".choice1");
var choice2El = document.querySelector(".choice2");
var choice3El = document.querySelector(".choice3");
var choice4El = document.querySelector(".choice4");
var count = 0;
var startEl = document.querySelector("#start");
var buttonEl = document.querySelectorAll(".input");
var quizEl = document.querySelector("#quiz");
var tryEl = document.querySelector("#try");

function addNewElements() {
    nextQuestion();
};

function setupQuizQuestions() {
    addNewElements();
};

startEl.addEventListener("click", function () {

    setTime();
    tryEl.className = "card-body hidden";
    quizEl.className = "card-body";
    setupQuizQuestions();

});

var buttonElements = document.querySelectorAll(".button");
for (var i = 0;i < buttonElements.length;i++){
    buttonElements[i].addEventListener('click',function(){
        buttonId = this.getAttribute('value');
        console.log(this.getAttribute.value);
        if (buttonId === questionSet.correctanswer[questionNum -1]){
            judgementEl.innerText = "Correct!";
            questionNum = questionNum + 1;
        }
        else {
            judgementEl.innerHTML = "Wrong answer!";
            secondsLeft = secondsLeft - 15;
            questionNum = questionNum + 1;
        }
        if (questionNum === 6) {
            quizEl.className = "card-body hidden";
            personalScoreEl.className = "card-body"; 
        }
        else {
            nextQuestion();
        }
    });
};

function nextQuestion() {
    var next = "choiceSet" + questionNum;
    var questionEl = document.body.querySelector(".question");

        questionEl.textContent = questionSet.javaQuestion[questionNum - 1];

        var but1El = document.body.querySelector("#answer1");
        but1El.value = questionSet[next][0];

        var but2El = document.body.querySelector("#answer2");
        but2El.value = questionSet[next][1];

        var but3El = document.body.querySelector("#answer3");
        but3El.value = questionSet[next][2];

        var but4El = document.body.querySelector("#answer4");
        but4El.value = questionSet[next][3];
};