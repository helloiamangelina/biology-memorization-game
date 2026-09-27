// ==========================================
// VITAMIN DATA
// ==========================================

const vitamins = [

    {
        name: "B1",
        fullName: "Thiamine",
        function:
            "Helps convert carbohydrates into energy and supports nerve function.",
        shortFunction:
            "Carbohydrate metabolism + nerves",
        icon: "🍞",
        type: "water"
    },

    {
        name: "B2",
        fullName: "Riboflavin",
        function:
            "Helps form FAD and FMN, which are used in energy metabolism.",
        shortFunction:
            "FAD + FMN",
        icon: "⚡",
        type: "water"
    },

    {
        name: "B3",
        fullName: "Niacin",
        function:
            "Helps form NAD and NADP, important molecules in energy metabolism.",
        shortFunction:
            "NAD + NADP",
        icon: "🔋",
        type: "water"
    },

    {
        name: "B5",
        fullName: "Pantothenic Acid",
        function:
            "Forms part of coenzyme A, which is important in metabolism.",
        shortFunction:
            "Coenzyme A (CoA)",
        icon: "⚙️",
        type: "water"
    },

    {
        name: "B6",
        fullName: "Pyridoxine",
        function:
            "Important for amino acid metabolism.",
        shortFunction:
            "Amino acid metabolism",
        icon: "🧬",
        type: "water"
    },

    {
        name: "B7",
        fullName: "Biotin",
        function:
            "Helps enzymes carry out carboxylation reactions.",
        shortFunction:
            "Carboxylation",
        icon: "➕",
        type: "water"
    },

    {
        name: "B9",
        fullName: "Folate",
        function:
            "Important for DNA synthesis and red blood cell production.",
        shortFunction:
            "DNA synthesis + red blood cells",
        icon: "🩸",
        type: "water"
    },

    {
        name: "B12",
        fullName: "Cobalamin",
        function:
            "Important for DNA synthesis, red blood cells, and nerve function.",
        shortFunction:
            "DNA + red blood cells + nerves",
        icon: "🧠",
        type: "water"
    },

    {
        name: "C",
        fullName: "Ascorbic Acid",
        function:
            "Needed for collagen production and also acts as an antioxidant.",
        shortFunction:
            "Collagen + antioxidant",
        icon: "🍊",
        type: "water"
    },

    {
        name: "A",
        fullName: "Vitamin A",
        function:
            "Important for vision and healthy epithelial tissues.",
        shortFunction:
            "Vision",
        icon: "👁️",
        type: "fat"
    },

    {
        name: "D",
        fullName: "Vitamin D",
        function:
            "Helps the body absorb calcium and supports healthy bones.",
        shortFunction:
            "Calcium absorption + bones",
        icon: "🦴",
        type: "fat"
    },

    {
        name: "E",
        fullName: "Vitamin E",
        function:
            "Acts as an antioxidant and helps protect cell membranes.",
        shortFunction:
            "Antioxidant",
        icon: "🛡️",
        type: "fat"
    },

    {
        name: "K",
        fullName: "Vitamin K",
        function:
            "Needed for normal blood clotting.",
        shortFunction:
            "Blood clotting",
        icon: "🩹",
        type: "fat"
    }

];



// ==========================================
// GAME VARIABLES
// ==========================================

let questions = [];

let currentQuestionIndex = 0;

let attempts = 0;

let gameLocked = false;



// ==========================================
// SCREEN CONTROL
// ==========================================

function showScreen(id) {

    const screens =
        document.querySelectorAll(
            ".screen"
        );

    screens.forEach(
        function(screen) {

            screen.classList.remove(
                "active"
            );

        }
    );

    document
        .getElementById(id)
        .classList.add(
            "active"
        );



    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



function goHome() {

    document
        .getElementById(
            "home-message"
        )
        .textContent = "";

    showScreen(
        "home-screen"
    );

}



function openVitamins() {

    showScreen(
        "vitamin-menu-screen"
    );

}



function comingSoon(topic) {

    document
        .getElementById(
            "home-message"
        )
        .textContent =
        topic +
        " will be added after we finish Vitamins!";

}



// ==========================================
// CREATE A VITAMIN CARD
// ==========================================

function createVitaminCard(
    vitamin,
    gameMode = false
) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "vitamin-card";


    card.innerHTML = `

        <div class="vitamin-icon">

            ${vitamin.icon}

        </div>

        <div class="vitamin-name">

            ${vitamin.name}

        </div>

        <div class="vitamin-full-name">

            ${vitamin.fullName}

        </div>

    `;



    if (gameMode) {

        card.dataset.answer =
            vitamin.name;

        card.addEventListener(
            "dragover",
            function(event) {

                event.preventDefault();

                if (
                    !gameLocked
                ) {

                    card.classList.add(
                        "drop-hover"
                    );

                }

            }
        );


        card.addEventListener(
            "dragleave",
            function() {

                card.classList.remove(
                    "drop-hover"
                );

            }
        );


        card.addEventListener(
            "drop",
            function(event) {

                event.preventDefault();

                card.classList.remove(
                    "drop-hover"
                );

                checkAnswer(
                    vitamin,
                    card
                );

            }
        );

    }


    return card;

}



// ==========================================
// LEARN MODE
// ==========================================

function startLearn() {

    showScreen(
        "learn-screen"
    );


    const waterGrid =
        document.getElementById(
            "water-vitamin-grid"
        );


    const fatGrid =
        document.getElementById(
            "fat-vitamin-grid"
        );


    waterGrid.innerHTML = "";

    fatGrid.innerHTML = "";



    vitamins.forEach(
        function(vitamin) {

            const card =
                createVitaminCard(
                    vitamin
                );


            card.addEventListener(
                "click",
                function() {

                    showVitaminInfo(
                        vitamin
                    );

                }
            );


            if (
                vitamin.type
                ===
                "water"
            ) {

                waterGrid.appendChild(
                    card
                );

            }

            else {

                fatGrid.appendChild(
                    card
                );

            }

        }
    );


    document
        .getElementById(
            "learn-info"
        )
        .innerHTML = `

        <div class="learn-info-icon">
            👆
        </div>

        <div>

            <strong>
                Click any vitamin above.
            </strong>

            <p>
                Its name and function
                will appear here.
            </p>

        </div>

    `;

}



function showVitaminInfo(
    vitamin
) {

    const info =
        document.getElementById(
            "learn-info"
        );


    info.innerHTML = `

        <div class="learn-info-icon">

            ${vitamin.icon}

        </div>

        <div>

            <strong>

                Vitamin
                ${vitamin.name}
                —
                ${vitamin.fullName}

            </strong>

            <p>

                ${vitamin.function}

            </p>

            <p>

                <strong>
                    Quick memory:
                </strong>

                ${vitamin.shortFunction}

            </p>

        </div>

    `;

}



// ==========================================
// START GAME
// ==========================================

function startGame() {

    questions =
        shuffle(
            [...vitamins]
        );


    currentQuestionIndex = 0;

    attempts = 0;

    gameLocked = false;


    showScreen(
        "game-screen"
    );


    buildGameBoard();


    showQuestion();

}



// ==========================================
// GAME BOARD
// ==========================================

function buildGameBoard() {

    const grid =
        document.getElementById(
            "game-grid"
        );


    grid.innerHTML = "";


    vitamins.forEach(
        function(vitamin) {

            const card =
                createVitaminCard(
                    vitamin,
                    true
                );


            grid.appendChild(
                card
            );

        }
    );

}



// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    if (
        currentQuestionIndex
        >=
        questions.length
    ) {

        finishGame();

        return;

    }


    gameLocked = false;


    clearCardStates();


    const question =
        questions[
            currentQuestionIndex
        ];


    const functionCard =
        document.getElementById(
            "function-card"
        );


    functionCard.textContent =
        question.shortFunction;


    document
        .getElementById(
            "feedback"
        )
        .textContent = "";


    document
        .getElementById(
            "feedback"
        )
        .className =
        "feedback";


    updateStats();

}



// ==========================================
// DRAGGING
// ==========================================

const functionCard =
    document.getElementById(
        "function-card"
    );


functionCard.addEventListener(
    "dragstart",
    function(event) {

        if (
            gameLocked
        ) {

            event.preventDefault();

            return;

        }


        event.dataTransfer
            .setData(
                "text/plain",
                "vitamin-function"
            );


        event.dataTransfer
            .effectAllowed =
            "move";

    }
);



// ==========================================
// CHECK ANSWER
// ==========================================

function checkAnswer(
    selectedVitamin,
    selectedCard
) {

    if (
        gameLocked
    ) {

        return;

    }


    attempts++;


    const correctVitamin =
        questions[
            currentQuestionIndex
        ];



    if (
        selectedVitamin.name
        ===
        correctVitamin.name
    ) {

        gameLocked = true;


        selectedCard
            .classList.add(
                "correct-card"
            );


        const feedback =
            document.getElementById(
                "feedback"
            );


        feedback.textContent =
            "✅ Correct!";


        feedback.className =
            "feedback correct-message";


        currentQuestionIndex++;


        updateStats();


        setTimeout(
            function() {

                showQuestion();

            },
            800
        );

    }

    else {

        selectedCard
            .classList.add(
                "wrong-card"
            );


        const feedback =
            document.getElementById(
                "feedback"
            );


        feedback.textContent =
            "❌ Wrong — keep trying!";


        feedback.className =
            "feedback wrong-message";


        setTimeout(
            function() {

                selectedCard
                    .classList.remove(
                        "wrong-card"
                    );

            },
            450
        );

    }

}



// ==========================================
// CLEAR CARD COLORS
// ==========================================

function clearCardStates() {

    const cards =
        document.querySelectorAll(
            "#game-grid .vitamin-card"
        );


    cards.forEach(
        function(card) {

            card.classList.remove(
                "correct-card",
                "wrong-card",
                "drop-hover"
            );

        }
    );

}



// ==========================================
// UPDATE STATS
// ==========================================

function updateStats() {

    document
        .getElementById(
            "progress"
        )
        .textContent =

        currentQuestionIndex
        +
        " / "
        +
        questions.length;


    document
        .getElementById(
            "attempts"
        )
        .textContent =
        attempts;

}



// ==========================================
// FINISH GAME
// ==========================================

function finishGame() {

    showScreen(
        "finish-screen"
    );


    const perfectAttempts =
        vitamins.length;


    let message = "";


    if (
        attempts
        ===
        perfectAttempts
    ) {

        message =

            "PERFECT! 🎉 You got every vitamin correct on the first try.";

    }

    else {

        const extraAttempts =
            attempts
            -
            perfectAttempts;


        message =

            "You matched all "
            +
            vitamins.length
            +
            " vitamins! You made "
            +
            extraAttempts
            +
            " extra attempt"
            +
            (
                extraAttempts
                === 1
                ?
                ""
                :
                "s"
            )
            +
            ".";

    }


    document
        .getElementById(
            "final-results"
        )
        .textContent =
        message;

}



// ==========================================
// SHUFFLE
// ==========================================

function shuffle(array) {

    for (
        let i =
            array.length - 1;

        i > 0;

        i--
    ) {

        const j =
            Math.floor(
                Math.random()
                *
                (i + 1)
            );


        const temp =
            array[i];


        array[i] =
            array[j];


        array[j] =
            temp;

    }


    return array;

}