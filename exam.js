const questions = [

    {
        question: "She _____ to school every day.",

        answers: [
            "go",
            "goes",
            "going",
            "gone"
        ],

        correct: 1,

        explanation:
            "'She' is a third-person singular subject. " +
            "In the simple present tense, we normally add -s or -es " +
            "to the verb. Therefore, 'go' becomes 'goes'. " +
            "The correct sentence is: 'She goes to school every day.'"
    },

    {
        question: "They _____ football yesterday.",

        answers: [
            "play",
            "plays",
            "played",
            "playing"
        ],

        correct: 2,

        explanation:
            "The word 'yesterday' tells us that the action happened " +
            "in the past. Therefore, we need the simple past form " +
            "of 'play', which is 'played'."
    },

    {
        question: "I have lived here _____ 2020.",

        answers: [
            "for",
            "since",
            "from",
            "at"
        ],

        correct: 1,

        explanation:
            "'Since' is used with a specific starting point in time, " +
            "such as 2020, Monday, or January. " +
            "'For' is normally used with a period of time, " +
            "such as 'for five years'. Therefore, 'since 2020' is correct."
    }

];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber =
    document.getElementById("question-number");

const questionText =
    document.getElementById("question-text");

const answerList =
    document.getElementById("answer-list");

const checkButton =
    document.getElementById("check-button");

const nextButton =
    document.getElementById("next-button");

const explanationBox =
    document.getElementById("explanation-box");


function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionText.textContent =
        question.question;

    answerList.innerHTML = "";

    explanationBox.innerHTML = "";
    explanationBox.style.display = "none";

    checkButton.style.display = "inline-block";
    nextButton.style.display = "none";


    question.answers.forEach((answer, index) => {

        const label =
            document.createElement("label");

        label.className = "answer-option";

        const input =
            document.createElement("input");

        input.type = "radio";
        input.name = "answer";
        input.value = index;

        label.appendChild(input);

        label.append(
            ` ${String.fromCharCode(65 + index)}. ${answer}`
        );

        answerList.appendChild(label);

    });
}


checkButton.addEventListener("click", function () {

    if (answered) {
        return;
    }

    const selectedAnswer =
        document.querySelector(
            'input[name="answer"]:checked'
        );

    if (!selectedAnswer) {

        alert("Please select an answer first.");

        return;
    }


    answered = true;

    const selectedValue =
        Number(selectedAnswer.value);

    const question =
        questions[currentQuestion];


    if (selectedValue === question.correct) {

        score++;

        explanationBox.innerHTML = `
            <h3>✓ Correct!</h3>

            <p>
                <strong>Correct Answer:</strong>
                ${String.fromCharCode(65 + question.correct)}.
                ${question.answers[question.correct]}
            </p>

            <h4>Explanation</h4>

            <p>
                ${question.explanation}
            </p>
        `;

        explanationBox.classList.remove("incorrect");
        explanationBox.classList.add("correct");

    } else {

        explanationBox.innerHTML = `
            <h3>✗ Incorrect</h3>

            <p>
                <strong>Your Answer:</strong>
                ${String.fromCharCode(65 + selectedValue)}.
                ${question.answers[selectedValue]}
            </p>

            <p>
                <strong>Correct Answer:</strong>
                ${String.fromCharCode(65 + question.correct)}.
                ${question.answers[question.correct]}
            </p>

            <h4>Explanation</h4>

            <p>
                ${question.explanation}
            </p>
        `;

        explanationBox.classList.remove("correct");
        explanationBox.classList.add("incorrect");

    }


    explanationBox.style.display = "block";

    checkButton.style.display = "none";

    nextButton.style.display = "inline-block";


    const radioButtons =
        document.querySelectorAll(
            'input[name="answer"]'
        );

    radioButtons.forEach(function (radio) {
        radio.disabled = true;
    });


    if (currentQuestion === questions.length - 1) {

        nextButton.textContent =
            "See Result";

    } else {

        nextButton.textContent =
            "Next Question";

    }

});


nextButton.addEventListener("click", function () {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


function showResult() {

    questionNumber.style.display = "none";
    questionText.style.display = "none";
    answerList.style.display = "none";
    checkButton.style.display = "none";
    nextButton.style.display = "none";
    explanationBox.style.display = "block";

    const percentage =
        Math.round(
            (score / questions.length) * 100
        );

    explanationBox.innerHTML = `
        <h2>Exam Completed</h2>

        <p>
            Your Score:
            <strong>${score} / ${questions.length}</strong>
        </p>

        <p>
            Percentage:
            <strong>${percentage}%</strong>
        </p>

        <button
            id="restart-button"
            class="exam-button">
            Try Again
        </button>
    `;

    document
        .getElementById("restart-button")
        .addEventListener("click", restartExam);
}


function restartExam() {

    currentQuestion = 0;
    score = 0;

    questionNumber.style.display = "block";
    questionText.style.display = "block";
    answerList.style.display = "flex";

    showQuestion();

}


showQuestion();