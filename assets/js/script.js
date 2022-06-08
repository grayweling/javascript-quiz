var titleEl = document.querySelector("#title-content");
var startQuizEl = document.querySelector("#start-quiz"); 
var answersEl = document.querySelector("#answers");
var feedbackEl = document.querySelector(".answer-feedback");
var finalEl = document.querySelector("#final-score");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var fbEl = document.querySelector("#feedback");
var highScoreEl = document.querySelector("#high-scores");
var btnDivEl = document.querySelector(".score-btns");
var highScoreLinkEl = document.querySelector("#high-scores-link");

var highScores = [];

var timer = 75;
var n = 0;
var score = 0;


var questions = [
    {
        question: "Javascript is an _____ language.",
        a1: "Object-Oriented",
        a2: "Object-Based",
        a3: "Procedural",
        a4: "None of the above",
        ca: "answer1"
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        a1: "getElementById()",
        a2: "getElementsByClassName()",
        a3: "Both A and B",
        a4: "None of the above",
        ca: "answer3"
    },
    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        a1: "Throw an error",
        a2: "Ignore the statement",
        a3: "Give a warning",
        a4: "None of the above",
        ca: "answer2"
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        a1: "document.write()",
        a2: "console.log()",
        a3: "window.alert()",
        a4: "All of the above",
        ca: "answer4"
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        a1: "const",
        a2: "var",
        a3: "let",
        a4: "constant",
        ca: "answer1"
    },
    {
        question: "When a switch statement matches the expression with the given labels, how is the comparison done?",
        a1: "Both the datatype and the result of the expression are compared",
        a2: "Only the datatype of the expression is compared",
        a3: "Only the result of the expression is compared",
        a4: "None of the above",
        ca: "answer1"
    },
    {
        question: "What is the use of the <noscript> tag?",
        a1: "The contents are displayed by non-JavaScript browsers",
        a2: "Clear the cache and cookies",
        a3: "Prevent the browser from loading the page",
        a4: "None of the above",
        ca: "answer1"
    },
    {
        question: "What does the Javascript debugger do?",
        a1: "It will debug all the errors in the program at runtime",
        a2: "It acts as a breakpoint for the program",
        a3: "It will debug errors in the current line, if any",
        a4: "All of the above",
        ca: "answer2"
    },
    {
        question: "Which function is used to serialize an object into a JSON string?",
        a1: "stringify()",
        a2: "parse()",
        a3: "convert()",
        a4: "None of the above",
        ca: "answer1"
    },
    {
        question: "Which of the following is not a Javascript framework?",
        a1: "Node",
        a2: "Vue",
        a3: "React",
        a4: "Cassandra",
        ca: "answer4"
    }
];

var initialScreen = function() {
    var initialTitle = document.createElement("h1");
    initialTitle.id = "initial-title";
    initialTitle.textContent = "Coding Quiz Challenge";
    titleEl.appendChild(initialTitle);

    var initialMessage = document.createElement("p");
    initialMessage.id = "initial-message";
    initialMessage.textContent = "Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your time by ten seconds";
    startQuizEl.appendChild(initialMessage);

    var startBtn = document.createElement("button");
    startBtn.className = "start-button";
    startBtn.id = "start-button";
    startBtn.textContent = "Submit";
    startQuizEl.appendChild(startBtn);

    highScoreLinkEl.innerHTML = "<p>View High Scores</p>";
    timerEl.innerHTML = "<p>Time: " + timer + "</p>";
};

var quizStart = function () {
    clearAll();

    questionEl = document.createElement("h2");
    questionEl.id = "question";
    titleEl.appendChild(questionEl);
      
    a1 = document.createElement("button");
    a1.className = "answer-button";
    a1.id = "answer1";
    answersEl.appendChild(a1);

    a2 = document.createElement("button");
    a2.className = "answer-button";
    a2.id = "answer2";
    answersEl.appendChild(a2);

    a3 = document.createElement("button");
    a3.className = "answer-button";
    a3.id = "answer3";
    answersEl.appendChild(a3);

    a4 = document.createElement("button");
    a4.className = "answer-button";
    a4.id = "answer4";
    answersEl.appendChild(a4);

    n=0;
    questionPrint(n);
};

var questionPrint = function(i) {     
    questionEl.textContent = questions[i].question;
    a1.textContent = questions[i].a1;
    a2.textContent = questions[i].a2;
    a3.textContent = questions[i].a3;
    a4.textContent = questions[i].a4;
};

var answerSequence = function(event) {
    if (timer > 0) {
        if (event.target.matches(".answer-button")) {
            var answerId = event.target.id;
            fbEl = document.createElement("p");
            fbEl.id = "feedback";
            feedbackEl.appendChild(fbEl);
            if (answerId === questions[n].ca) {
                fbEl.textContent = "Correct!";
            }
            else {
                fbEl.textContent = "Wrong!";
                timer -=10;
            }
            setTimeout(() => {
                fbEl.remove();
            }, 1000);
            n++;
            if (n >= questions.length) {
                return quizEnd();
            }
            questionPrint(n);
        }   
    }
};

var quizEnd = function () {
    score = timer;

    a1.remove();
    a2.remove();
    a3.remove();
    a4.remove();

    questionEl.textContent = "All done!"

    finalEl.innerHTML =  "<p>Your final score is " + score + "</p><div class='form-line' id='initials-input'><p>Enter initials:</p><input type='text' name='initials' id='initials' placeholder='Your initials'/><button class='submit-btn'>Submit</button>";
};

var highScoreHandler = function(event) {
    event.preventDefault();
    var initialsInput = document.querySelector("input[name='initials']").value;

    if (!initialsInput) {
        alert("You need to enter initials to continue!")
        return false;    
    }

    if (initialsInput.length > 4) {
        document.getElementById("initials").value = '';
        alert("Initials can't be longer than 4 characters");
        return false;
    }

    var savedHighScores = localStorage.getItem("JSQscores");
    
    var scoreDataObj = {
        name: initialsInput,
        score: score
    } 

    if (!savedHighScores) {
        highScores.push(scoreDataObj);
        saveHighScores();
        clearAll();
        return highScoresView();      
    } else {
        highScores = JSON.parse(savedHighScores);

        if(highScores.length < 1) {
            highScores.push(scoreDataObj);
            saveHighScores();
            clearAll();
            return highScoresView();
        }

        for (i = 0; i < highScores.length; i++) {
            if (highScores[i].score < scoreDataObj.score) {
                highScores.splice(i, 0, scoreDataObj);
                highScores = highScores.slice(0,5);
                console.log(highScores);
                saveHighScores();
                break;
            } else if (i === (highScores.length - 1)) {
                highScores.push(scoreDataObj);
                highScores = highScores.slice(0,5);
                console.log(highScores);
                saveHighScores();
                break;
            }
        }
    }
    clearAll();
    highScoresView ();
}

var saveHighScores = function() {
    localStorage.setItem("JSQscores", JSON.stringify(highScores));
};

var clearAll = function() {
    highScoreEl.innerHTML = "";
    feedbackEl.innerHTML = "";
    startQuizEl.innerHTML = "";
    answersEl.innerHTML = "";
    finalEl.innerHTML ="";
    titleEl.innerHTML ="";
    btnDivEl.innerHTML = "";

    return false;
};

var clickFilter = function(event) {
    
    if (event.target.matches(".start-button")) {
        timerStart();
        quizStart();
    } else {
        return false;
    }
};

var highScoresView = function() {
    highScoreLinkEl.innerHTML = "";
    timerEl.innerHTML = "";

    var savedHighScores = localStorage.getItem("JSQscores");
    highScores = JSON.parse(savedHighScores);

    questionEl = document.createElement("h2");
    questionEl.id = "question";
    questionEl.textContent = "High scores"
    titleEl.appendChild(questionEl);

    for (i = 0; i < highScores.length; i++) {
        var scoreEl = document.createElement("h3");
        scoreEl.textContent = (i+1) + ". " + highScores[i].name + " - " + highScores[i].score;
        highScoreEl.appendChild(scoreEl);
    }

    if ((!highScores) || (highScores.length < 1)) {
        var scoreEl = document.createElement("h3");
        scoreEl.textContent = "No high scores saved"
        highScoreEl.appendChild(scoreEl);
    }

    btnDivEl.innerHTML = "<button type='button' class='score-btn' id='back'>Go back</button><button type='button' class='score-btn' id='clear'>Clear high scores</button>";  
};

var backOrClear = function(event) {
    if (event.target.matches("#clear")) {
        highScores = [];
        saveHighScores();
        clearAll();
        highScoresView();
    }

    if (event.target.matches("#back")) {
        clearAll();
        initialScreen();
    }
}

var timerStart = function() {
    timer = 75;

    timerEl.innerHTML = "<p>Time remaining: " + timer + "</p>";

    var t = setInterval(function() {
        if (timer === 0) {
            clearInterval(t);

            timerEl.innerHTML = "<p>Time remaining:" + timer + "</p>";
            quizEnd();
        }

        if (n<questions.length) {
            timer -= 1;
            timerEl.innerHTML = timer;
        }
    }, 1000);
}

var highScoreLink = function() {
    if (timer === 75) {
        clearAll();
        highScoresView();
    } else {
        return false;
    }
}

btnDivEl.addEventListener("click", backOrClear);

finalEl.addEventListener("click", highScoreHandler);

answersEl.addEventListener("click", answerSequence);

startQuizEl.addEventListener("click", clickFilter);

highScoreLinkEl.addEventListener("click", highScoreLink);

initialScreen();