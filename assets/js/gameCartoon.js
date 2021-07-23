// Variables defined here
let quiz = document.querySelector('.answers');
let output = [];
let questionCounter = document.getElementById("question-counter").innerHTML;
questionCounter = 1;
let score = [];
let data;
let currentQuestion = 0;
let choice;

// Function to get data from api
async function getData() {
    const responce = await fetch("https://opentdb.com/api.php?amount=10&category=32&type=multiple");
    data = await responce.json();
    loadNextRound(data);
}


// Page loads
window.onload = function() {
    $('.see-your-score').hide();
    $('#next').hide();
    $('.score-page').hide();
    $('.done').hide();
    getData();
}


// shuffle answer choices
function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * i)
        const temp = options[i]
        options[i] = options[rand]
        options[rand] = temp
    }
    return options;
}

// Get questions and answers
function loadNextRound(data) {
    let question = data.results[currentQuestion].question;
    const difficulty = data.results[currentQuestion].difficulty;
    let correctAnswer = data.results[currentQuestion].correct_answer;
    let answer2 = data.results[currentQuestion].incorrect_answers[0];
    let answer3 = data.results[currentQuestion].incorrect_answers[1];
    let answer4 = data.results[currentQuestion].incorrect_answers[2];
    var answers = shuffleOptions([correctAnswer, answer2, answer3, answer4]);
    document.getElementById("question").innerHTML = question;
    // Push answers to html
    answers.forEach(answer => {
        output.push(
            `<div class="row d-flex justify-content-center js-otput no-gutters" >
                    <label class="col options" data-toggle="buttons">
                        <input  type="radio" name="option"  class="choices" value="${answer}">
                        ${answer}
                    </label>
                </div>`
        )
    });
    quiz.innerHTML = output.join('');

    // Select an answer
    document.querySelectorAll('.choices').forEach(choice => {
        choice.addEventListener('click', () => {
            document.getElementById("question-counter").innerHTML = questionCounter;
            questionCounter++;
            if (choice.value == correctAnswer) {
                score++;
                document.getElementById("score").innerHTML = score;
                document.querySelectorAll('.options').forEach(option => {
                    option.addEventListener('click', () => {
                        if ($(option).find('input').first().prop('disabled')) return
                        $(option).addClass('green');
                        $(option).parents().closest('div.answers').find('input').attr("disabled", true);
                    });
                });

            } else {
                document.querySelectorAll('.options').forEach(option => {
                    option.addEventListener('click', () => {
                        if ($(option).find('input').first().prop('disabled')) return
                        $(option).addClass('red');
                        $(option).parents().closest('div.answers').find('input').attr("disabled", true);
                    });
                });
            }

            if (questionCounter < 11) {
                $('#next').show();
            } else if (questionCounter == 11) {
                $('.see-your-score').show();
            }

            // Status bar
            if (questionCounter == 2) {
                $('.q1').addClass('tenne');
            } else if (questionCounter == 3) {
                $('.q2').addClass('tenne');
            } else if (questionCounter == 4) {
                $('.q3').addClass('tenne');
            } else if (questionCounter == 5) {
                $('.q4').addClass('tenne');
            } else if (questionCounter == 6) {
                $('.q5').addClass('tenne');
            } else if (questionCounter == 7) {
                $('.q6').addClass('tenne');
            } else if (questionCounter == 8) {
                $('.q7').addClass('tenne');
            } else if (questionCounter == 9) {
                $('.q8').addClass('tenne');
            } else if (questionCounter == 10) {
                $('.q9').addClass('tenne');
            } else if (questionCounter == 11) {
                $('.q10').addClass('tenne');
                $('.status-text').hide();
                $('.done').show();
            }
        });
    });
}


// Next button loads next question
document.querySelector('#next').addEventListener('click', () => {
    quiz.innerHTML = "";
    output = [];
    currentQuestion += 1;
    loadNextRound(data);
    $('#next').hide('slow');
});


// Buttons leading to score page
document.querySelector('.end-game').addEventListener('click', () => {
    $('#quiz-background').hide();
    $('.score-page').show();
});


document.querySelector('.see-your-score').addEventListener('click', () => {
    $('#quiz-background').hide();
    $('.score-page').show();
});