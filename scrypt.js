
const start = document.querySelector('#start');
const game = document.querySelector('#game');
const time = document.querySelector('#time');
const result = document.querySelector('#result');
const timeH1 = document.querySelector('#time-header');
const resultH1 = document.querySelector('#result-header');
const inputTime = document.querySelector('#game-time');
let isGameActive = false;
let score = 0;

function startGame() {
    inputTime.setAttribute = 'disabled';
    isGameActive = true;
    timeH1.classList.remove('hide')
    start.classList.add('hide');
    game.style.backgroundColor = 'white';
    score = 0;
    time.classList.remove('hide')
    result.classList.add('hide')
    resultH1.classList.add('hide')
    renderBox()
    const interval = setInterval(function () {
        const currentTime = Number(time.textContent);
        if (currentTime <= 0) {
            clearInterval(interval);
            endGame()
        } else {
            time.textContent = (Number(currentTime) - 0.1).toFixed(1);
        }
    }, 100)
}

start.addEventListener('click', startGame)

function endGame() {
    isGameActive = false;
    game.innerHTML = "";
    start.classList.remove('hide');
    game.style.backgroundColor = 'grey';
    time.classList.add('hide');
    timeH1.classList.add('hide')
    result.classList.remove('hide')
    resultH1.classList.remove('hide')
    result.innerHTML = score;
    inputTime.removeAttribute('disabled')
}

function renderBox() {
    game.innerHTML = '';
    let randomSize = getRandom(30, 100);
    const maxDelta = 300 - randomSize;
    const randomBox = document.createElement('div');
    randomBox.style.width = randomSize + 'px';
    randomBox.style.height = randomSize + 'px';
    randomBox.style.position = 'absolute';
    randomBox.style.backgroundColor = 'black';
    randomBox.style.top =  getRandom(0, maxDelta) + 'px';
    randomBox.style.left =  getRandom(0, maxDelta)  + 'px';
    randomBox.classList.add('random-box')
    game.appendChild(randomBox)
}

function gameBoxClick(event) {
    if (event.target.classList.contains('random-box')) {
        score++;
        renderBox();
    } if (!isGameActive) {
        return;
    }
}

game.addEventListener('click', gameBoxClick)

function getRandom(min, max) {
    return (Math.floor(Math.random() * (max - min) + min))
}


inputTime.addEventListener('change', () => {
    time.innerText = inputTime.value;
    result.classList.add('hide');
    time.classList.remove('hide');
    
})
