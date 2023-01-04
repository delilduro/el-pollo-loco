let canvas;
let world;
let keyboard = new Keyboard;
let intervalIds = [];
var gameSound = new Audio('audio/gameSound.mp3');
gameSound.loop = true;
gameSound.volume = 0.5;
let gameIsFinish = false;
let splash_sound = new Audio('audio/splash.wav');

function  setStopableInterval(fn, time){
    let id = setInterval(fn, time);
    intervalIds.push(id);
}
  
  
function stopGame(){
    gameSound.pause();
    intervalIds.forEach(clearInterval);
}


function pauseSound() {
    gameSound.pause();
    document.getElementById('off').classList.remove('d-none');
    document.getElementById('on').classList.add('d-none');
}


function playSound() {
    gameSound.play();
    document.getElementById('off').classList.add('d-none');
    document.getElementById('on').classList.remove('d-none');
}



function init() {
    document.getElementById('game').classList.add('d-none');
    document.getElementById('gameOver').classList.add('d-none');
}


function startGame() {
    touchTheButtons();
    gameSound.play();
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('startGame').classList.add('d-none');
    document.getElementById('game').classList.remove('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('mobileButton').classList.remove('d-none');
    document.getElementById('enterfullscreen').classList.remove('d-none');
}


function restartGame() {
    stopGame();
    init();
    startGame();
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('game').classList.remove('d-none');
    document.getElementById('winner').classList.add('d-none');
}


function openFullscreen() {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.webkitRequestFullscreen) { /* Safari */
  canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) { /* IE11 */
  canvas.msRequestFullscreen();
  }
}


window.addEventListener("keydown", e => {
    if (e.keyCode == 39){
        keyboard.RIGHT = true;
    };
    if (e.keyCode == 37){
        keyboard.LEFT = true;
    };
    if (e.keyCode == 38){
        keyboard.UP = true;
    };
    if (e.keyCode == 40){
        keyboard.DOWN = true;
    };
    if (e.keyCode == 32){
        keyboard.SPACE = true;
    };
    if (e.keyCode == 68){
        keyboard.D = true;
    };
});


window.addEventListener("keyup", e => {
    if (e.keyCode == 39){
        keyboard.RIGHT = false;
    };
    if (e.keyCode == 37){
        keyboard.LEFT = false;
    };
    if (e.keyCode == 38){
        keyboard.UP = false;
    };
    if (e.keyCode == 40){
        keyboard.DOWN = false;
    };
    if (e.keyCode == 32){
        keyboard.SPACE = false;
    };
    if (e.keyCode == 68){
        keyboard.D = false;
    };
});


function touchTheButtons() {
    document.getElementById('left').addEventListener('touchstart', (event) => {
        event.preventDefault();
        if(gameIsFinish == false){
        keyboard.LEFT = true;
        } 
    });


    document.getElementById('left').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });


    document.getElementById('right').addEventListener('touchstart', (event) => {
        event.preventDefault();
        if(gameIsFinish == false){
        keyboard.RIGHT = true;
        }
    });


    document.getElementById('right').addEventListener('touchend', (event) => {
        keyboard.RIGHT = false;
    });


    document.getElementById('jump').addEventListener('touchstart', (event) => {
        event.preventDefault();
        if(gameIsFinish == false){
        keyboard.SPACE = true;
        }
    });


    document.getElementById('jump').addEventListener('touchend', (event) => {
        keyboard.SPACE = false;
    });


    document.getElementById('hit').addEventListener('touchstart', (event) => {
        event.preventDefault();
        if(gameIsFinish == false){
        keyboard.D = true;
        }
    });


    document.getElementById('hit').addEventListener('touchend', (event) => {
        keyboard.D = false;
    });
}

