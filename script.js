// ==========================
// VITAMIN DATA
// ==========================

const vitamins = [

    {
        name: "B1",
        fullName: "Thiamine",
        function: "Carbohydrate metabolism and nerve function",
        icon: "🍞"
    },

    {
        name: "B2",
        fullName: "Riboflavin",
        function: "Helps form FAD and FMN for energy metabolism",
        icon: "⚡"
    },

    {
        name: "B3",
        fullName: "Niacin",
        function: "Helps form NAD and NADP for energy metabolism",
        icon: "🔋"
    },

    {
        name: "B5",
        fullName: "Pantothenic Acid",
        function: "Part of coenzyme A (CoA)",
        icon: "⚙️"
    },

    {
        name: "B6",
        fullName: "Pyridoxine",
        function: "Amino acid metabolism",
        icon: "🧬"
    },

    {
        name: "B7",
        fullName: "Biotin",
        function: "Helps enzymes perform carboxylation reactions",
        icon: "➕"
    },

    {
        name: "B9",
        fullName: "Folate",
        function: "DNA synthesis and red blood cell production",
        icon: "🩸"
    },

    {
        name: "B12",
        fullName: "Cobalamin",
        function: "DNA synthesis, red blood cells, and nerve function",
        icon: "🧠"
    },

    {
        name: "C",
        fullName: "Ascorbic Acid",
        function: "Collagen production and antioxidant activity",
        icon: "🍊"
    },

    {
        name: "A",
        fullName: "Vitamin A",
        function: "Vision and healthy epithelial tissues",
        icon: "👁️"
    },

    {
        name: "D",
        fullName: "Vitamin D",
        function: "Calcium absorption and bone health",
        icon: "🦴"
    },

    {
        name: "E",
        fullName: "Vitamin E",
        function: "Antioxidant that protects cell membranes",
        icon: "🛡️"
    },

    {
        name: "K",
        fullName: "Vitamin K",
        function: "Blood clotting",
        icon: "🩹"
    }

];


// ==========================
// GAME VARIABLES
// ==========================

let questions = [];

let currentQuestion = 0;

let correctCount = 0;

let totalAttempts = 0;


// ==========================
// SCREEN CONTROL
// ==========================

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.add("hidden");
    });

    document
        .getElementById(screenId)
        .classList.remove("hidden");
}


function goHome() {

    showScreen("home-screen");

}


function openTopic(topic) {

    if (topic === "vitamins") {

        document.getElementById(
            "topic-title"
        ).textContent = "💊 Vitamins";

        showScreen("topic-screen");

    }

}


function comingSoon(topic) {

    document.getElementById(
        "home-message"
    ).textContent =
        topic + " game coming next!";

}


// ==========================
// LEARN MODE
// ==========================

function startLearn() {

    showScreen("learn-screen");

    const grid =
        document.getElementById("learn-grid");

    grid.innerHTML = "";

    vitamins.forEach(vitamin => {

        const card =
            createVitaminCard(vitamin);

        card.onclick = function () {

            document.getElementById(
                "learn-info"
            ).innerHTML =

                "<strong>" +
                vitamin.name +
                " — " +
                vitamin.fullName +
                "</strong><br><br>" +
                vitamin.function;

        };

        grid.appendChild(card);

    });

}


// ==========================
// CREATE VITAMIN CARD
// ==========================

function createVitaminCard(vitamin) {

    const card =
        document.createElement("div");

    card.className =
        "vitamin-card";

    card.innerHTML = `

        <div class="vitamin-icon">
            ${vitamin.icon}
        </div>

        <div class="vitamin-name">
            ${vitamin.name}
        </div>

    `;

    return card;

}


// ==========================
// START GAME
// ==========================

function startGame() {

    showScreen("game-screen");

    questions =
        shuffleArray([...vitamins]);

    currentQuestion = 0;

    correctCount = 0;

    totalAttempts = 0;

    createGameBoard();

    showQuestion();

}


// ==========================
// CREATE GAME BOARD
// ==========================

function createGameBoard() {

    const grid =
        document.getElementById("game-grid");

    grid.innerHTML = "";

    vitamins.forEach(vitamin => {

        const card =
            createVitaminCard(vitamin);

        card.dataset.vitamin =
            vitamin.name;

        card.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();

            }
        );

        card.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();

                checkAnswer(
                    vitamin.name,
                    card
                );

            }
        );

        grid.appendChild(card);

    });

}


// ==========================
// SHOW QUESTION
// ==========================

function showQuestion() {

    if (
        currentQuestion
        >= questions.length
    ) {

        finishGame();

        return;

    }

    const question =
        questions[currentQuestion];

    document.getElementById(
        "function-card"
    ).textContent =
        question.function;

    document.getElementById(
        "feedback"
    ).textContent = "";

    updateStats();

}


// ==========================
// DRAG FUNCTION
// ==========================

const functionCard =
    document.getElementById(
        "function-card"
    );

functionCard.addEventListener(
    "dragstart",
    function (event) {

        event.dataTransfer.setData(
            "text/plain",
            "function"
        );

    }
);


// ==========================
// CHECK ANSWER
// ==========================

function checkAnswer(
    selectedVitamin,
    card
) {

    totalAttempts++;

    const correctVitamin =
        questions[currentQuestion].name;

    if (
        selectedVitamin
        === correctVitamin
    ) {

        card.classList.add(
            "correct"
        );

        document.getElementById(
            "feedback"
        ).textContent =
            "✅ Correct!";

        correctCount++;

        currentQuestion++;

        updateStats();

        setTimeout(
            function () {

                card.classList.remove(
                    "correct"
                );

                showQuestion();

            },
            700
        );

    }

    else {

        card.classList.add(
            "wrong"
        );

        document.getElementById(
            "feedback"
        ).textContent =
            "❌ Wrong — keep trying!";

        setTimeout(
            function () {

                card.classList.remove(
                    "wrong"
                );

            },
            500
        );

    }

}


// ==========================
// UPDATE SCORE
// ==========================

function updateStats() {

    document.getElementById(
        "score"
    ).textContent =
        "Correct: " +
        correctCount;

    document.getElementById(
        "progress"
    ).textContent =
        currentQuestion +
        " / " +
        questions.length;

}


// ==========================
// FINISH GAME
// ==========================

function finishGame() {

    showScreen(
        "finish-screen"
    );

    const accuracy =
        Math.round(
            (
                correctCount /
                totalAttempts
            )
            * 100
        );

    document.getElementById(
        "final-score"
    ).textContent =

        "Accuracy: " +
        accuracy +
        "% — " +
        totalAttempts +
        " total attempts.";

}


// ==========================
// SHUFFLE QUESTIONS
// ==========================

function shuffleArray(array) {

    for (
        let i =
            array.length - 1;

        i > 0;

        i--
    ) {

        const j =
            Math.floor(
                Math.random()
                * (i + 1)
            );

        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }

    return array;

}