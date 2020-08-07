document.addEventListener("DOMContentLoaded", () => {
    const width = 10;
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const ScoreDisplay = document.querySelector("#score");
    const startBtn = document.querySelector("#start-button");
    let timerId;
    let nextRandom = 0;
    let score = 0;

    const lTetremino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2],
    ];

    const zTetremino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
    ];

    const tTetremino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1],
    ];

    const oTetremino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
    ];

    const iTetremino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
    ];

    const theTetriminoes = [
        lTetremino,
        zTetremino,
        tTetremino,
        oTetremino,
        iTetremino,
    ];
    //randomly select a tetrimono

    let currentPosition = 4;
    let currentRotation = 0;

    let random = Math.floor(Math.random() * theTetriminoes.length);
    let current = theTetriminoes[random][currentRotation];

    //draew the first rotation of a tetrimino

    function draw() {
        current.forEach((index) => {
            squares[currentPosition + index].classList.add("tetremino");
        });
    }

    function undraw() {
        current.forEach((index) => {
            squares[currentPosition + index].classList.remove("tetremino");
        });
    }

    //make the tetrimino to go
    //timerId = setInterval(moveDown, 800);
    //assign keycodes
    function control(e) {
        if (e.keyCode == 37) {
            moveLeft();
        } else if (e.keyCode == 38) {
            rotate();
        } else if (e.keyCode == 39) {
            moveRight();
        } else if (e.keyCode == 40) {
            moveDown();
        }
    }
    document.addEventListener("keyup", control);

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function freeze() {
        if (
            current.some((index) =>
                squares[currentPosition + index + width].classList.contains(
                    "taken"
                )
            )
        ) {
            current.forEach((index) =>
                squares[currentPosition + index].classList.add("taken")
            );
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetriminoes.length);
            current = theTetriminoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
            addScore();
            gameOver();
        }
    }

    //move the tetrimino left, unless is at the edge or there is a block

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(
            (index) => (currentPosition + index) % width === 0
        );
        if (!isAtLeftEdge) {
            currentPosition -= 1;
        }
        if (
            current.some((index) =>
                squares[currentPosition + index].classList.contains("taken")
            )
        ) {
            currentPosition += 1;
        }
        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(
            (index) => (currentPosition + index) % width === width - 1
        );
        if (!isAtRightEdge) {
            currentPosition += 1;
        }
        if (
            current.some((index) =>
                squares[currentPosition + index].classList.contains("taken")
            )
        ) {
            currentPosition -= 1;
        }
        draw();
    }

    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation == current.length) {
            currentRotation = 0; // this is to say if we hit the entire rotation array we will move to the first index
        }
        current = theTetriminoes[random][currentRotation];
        draw();
    }

    const displaySquares = document.querySelectorAll(".mini-grid div");
    const displayWidth = 4;
    let displayIndex = 0;

    const upNextTetriminoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
        [1, displayWidth, displayWidth + 1, displayWidth + 2],
        [0, 1, displayWidth, displayWidth + 1],
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
    ];

    function displayShape() {
        displaySquares.forEach((square) => {
            square.classList.remove("tetremino");
        });
        upNextTetriminoes[nextRandom].forEach((index) => {
            displaySquares[displayIndex + index].classList.add("tetremino");
        });
    }

    startBtn.addEventListener("click", () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 800);
            nextRandom = Math.floor(Math.random() * theTetriminoes.length);
            displayShape();
        }
    });

    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [
                i,
                i + 1,
                i + 2,
                i + 3,
                i + 4,
                i + 5,
                i + 6,
                i + 7,
                i + 8,
                i + 9,
            ];

            if (
                row.every((index) => squares[index].classList.contains("taken"))
            ) {
                score += 10;
                ScoreDisplay.innerHTML = score;
                row.forEach((index) => {
                    squares[index].classList.remove("taken");
                    squares[index].classList.remove("tetremino");
                });
                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach((cell) => grid.appendChild(cell));
            }
        }
    }

    function gameOver() {
        if (
            current.some((index) =>
                squares[currentPosition + index].classList.contains("taken")
            )
        ) {
            ScoreDisplay.innerHTML = "end";
            clearInterval(timerId);
        }
    }
});
