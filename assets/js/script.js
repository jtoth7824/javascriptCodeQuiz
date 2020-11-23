var timeEl = document.querySelector(".timer");
var secondsLeft = 75;
var buttonId;
var questionSet = {
    javaQuestion: ["Commonly used data types do NOT include:", "Condition in If/Else statement is enclosed within:", "Arrays in javascript canb e used to store:", "String values must be enclosed within ______ when being assigend", "A very useful tool used during development and \n debugging for printing content to the debugger is:"],
    choiceSet1: ["Strings", "Booleans", "Alerts", "Numbers"],
    choiceSet2: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    choiceSet3: ["Numbers & Strings", "Other Arrays", "Booleans", "All of the above"],
    choiceSet4: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
    choiceSet5: ["javascript", "terminal/bash", "for loop", "console.log"],
    correctanswer: ["Alerts", "Curly Brackets", "All of the above", "Quotes", "console.log"],
};

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        console.log(secondsLeft);
        timeEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0) {
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
/*var questionEl = document.querySelector(".h3");*/
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

/*    var node = document.createElement("h3");
    var textnode = document.createTextNode("");
    node.appendChild(textnode);
    document.getElementById("try").appendChild(node);
    node.className = "question";

    var node = document.createElement("input");
    var textnode = document.createTextNode("");
    node.appendChild(textnode);
    document.getElementById("try").appendChild(node);
    node.className = "button1";
    node.type = "button";
    node.id = "button";
 
    var node = document.createElement("input");
    var textnode = document.createTextNode("");
    node.appendChild(textnode);
    document.getElementById("try").appendChild(node);
    node.className = "button2";
    node.type = "button";
    node.id = "button";

    var node = document.createElement("input");
    var textnode = document.createTextNode("");
    node.appendChild(textnode);
    document.getElementById("try").appendChild(node);
    node.className = "button3";
    node.type = "button";
    node.id = "button";

    var node = document.createElement("input");
    var textnode = document.createTextNode("");
    node.appendChild(textnode);
    document.getElementById("try").appendChild(node);
    node.className = "button4";
    node.type = "button";
    node.id = "button";
*/
/*    var node = document.createElement("h3");
    var textnode = document.createTextNode("");
    node.appendChild(textnode);
    document.getElementById("try").appendChild(node);
    node.className = "choice4";
*/
    nextQuestion();
};

function setupQuizQuestions() {
/*    var questionEl = document.body.querySelector("h3");
    var cardTextEl = document.body.querySelector("p");

    questionEl.remove();
    cardTextEl.remove();
    startEl.remove();
*/
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
        console.log("ButtonID: " + this.getAttribute('id'));
        return buttonId = this.getAttribute('id');
    });
};

function nextQuestion() {
    var next = "choice1";
    var johnEl = document.body.querySelector(".question");

        johnEl.textContent = questionSet.javaQuestion[i];

        var but1El = document.body.querySelector("#answer1");
        but1El.value = questionSet[next][0];

        var but2El = document.body.querySelector("#answer2");
/*        choice1El = document.body.querySelector(".choice1");*/
        but2El.value = questionSet[next][1];

        var but3El = document.body.querySelector("#answer3");
/*        choice2El = document.body.querySelector(".choice2");*/
        but3El.value = questionSet[next][2];

        var but4El = document.body.querySelector("#answer4");
        but4El.value = questionSet[next][3];


};