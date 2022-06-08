var titleEl = document.querySelector("#title-content");
var startQuizEl = document.querySelector("#start-quiz"); 
var answersEl = document.querySelector("#answers");
var feedbackEl = document.querySelector(".answer-feedback");
var finalEl = document.querySelector("#final-score");
var timerEl = document.querySelector("#timer-count");
var questionEl = document.querySelector("#question");
var fbEl = document.querySelector("#feedback");
var highScoreEl = document.querySelector("#high-scores");
var btnDivEl = document.querySelector(".score-btns");

var highScores = [];

var timer = 75;
var n = 0;
var score = 0;


var questions = [
    {
        question: "Which is true",
        a1: "false",
        a2: "true",
        a3: "correct",
        a4: "treu",
        ca: "answer2"
    },
    {
        question: "Which is false",
        a1: "true",
        a2: "incorrect",
        a3: "false",
        a4: "fales",
        ca: "answer3"
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
};

var quizStart = function () {
    var remTitle = document.querySelector("#initial-title");
    remTitle.remove();

    var remMessage = document.querySelector("#initial-message");
    remMessage.remove();

    var remButton = document.querySelector(".start-button");
    remButton.remove();

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
    // check if value is empty string
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
        console.log(highScores);
        return fromFinalToHighScores()      
    }
    else {
        highScores = JSON.parse(savedHighScores);
        for (i = 0; i < highScores.length; i++) {
            if (highScores[i].score < scoreDataObj.score) {
                highScores.splice(i, 0, scoreDataObj);
                highScores = highScores.slice(0,5);
                console.log(highScores);
                saveHighScores();
                break;
            }
            else if (i === (highScores.length - 1)) {
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
    var targetEl = event.target;
    
    if (event.target.matches(".start-button")) {
        timerStart();
        quizStart();
    }
    else {
        return false;
    }
};

var highScoresView = function() {
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

    if (!highScores) {
        var scoreEl = document.createElement("h3");
        scoreEl.textContent = "No high scores saved"
        highScoreEl.appendChild(scoreEl);
    }

    btnDivEl.innerHTML = "<button type='button' class='score-btn'>Go back</button><button type='button' class='score-btn'>Clear high scores</button>";  
};

var timerStart = function () {
    timer = 75;

    setInterval(function() {
        if (timer <= 0) {
            clearInterval(timer = 0);
        }
        timerEl.innerHTML = timer;
        timer -=1;
    }, 1000);
};


finalEl.addEventListener("click", highScoreHandler);

answersEl.addEventListener("click", answerSequence);

startQuizEl.addEventListener("click", clickFilter);

initialScreen();