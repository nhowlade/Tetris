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
})