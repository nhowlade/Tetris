document.addEventListener('DOMContentLoaded', () => {
    const width = 10;
    const grid = document.querySelector('.grid');
    let squares  = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');

    //The Tetreminos
    const lTetremino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetremino = [
        [width*2, width+1, width*2+1, width+2],
        [0, width, width+1, width*2+1],
        [width*2, width+1, width*2+1, width+2],
        [0, width, width+1, width*2+1]
    ]

    const tTetremino = [
        [width, 1, width+1, width+2],
        [1, width+1, width*2+1, width+2],
        [width, width+1, width*2+1, width+2],
        [width, 1, width+1, width*2+1]
    ]

    const oTetrimino =[
        [0, width, 1, width+1],
        [0, width, 1, width+1],
        [0, width, 1, width+1],
        [0, width, 1, width+1]
    ]

    const iTetremino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetriminoes = [lTetremino, zTetremino, tTetremino, oTetrimino, iTetremino];
    //randomly select a tetrimono
    let random = Math.floor(Math.random()*theTetriminoes.length);
    let currentPosition = 4;
    let currentRotation = 0;
    let current = theTetriminoes[random][currentRotation];

    //draew the first rotation of a tetrimino

    function draw()
    {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetrimino');
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition+index].classList.remove('tetrimino');
        })
    }


    //make the tetrimino to go
    timerId = setInterval(moveDown, 900);
    //assign keycodes
    function control(e)
    {
        if(e.keyCode == 37)
        {
            moveLeft();
        } else if (e.keyCode == 38)
        {
            //rotate
        } else if (e.keyCode == 39)
        {
            moveRight();
        } else if (e.keyCode == 40)
        {
            moveDown();
        }
    }
    document.addEventListener('keyup', control);

    function moveDown()
    {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function freeze()
    {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken')))
        {
            current.forEach( index => squares[currentPosition + index].classList.add('taken'));

            random = Math.floor(Math.random()* theTetriminoes.length);
            current = theTetriminoes[random][currentRotation];
            currentPosition = 4;
            draw();
            
        }
    }

    //move the tetrimino left, unless is at the edge or there is a block

    function moveLeft(){
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width == 0)
        if(!isAtLeftEdge)
        {
            currentPosition -= 1;
        }
        if(current.some(index => squares[currentPosition + index].classList.contains('taken')))
        {
            currentPosition += 1;
        }
        draw();
    }

    function moveRight()
    {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width  === width - 1)
        if(!isAtRightEdge)
        {
            currentPosition ++;
        }
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -= 1;
        }
        draw();
    }
})