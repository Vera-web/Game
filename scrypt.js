// ПОРЯДОК РАБОТЫ
// 1. Записываем в переменные DOM-элементы:
// start - кнопка запуска игры, 
// game - поле игры,
// time - span с установленным временем игры
// result - span c результатом
// timeH1 - h1 для времени
// resultH1 - h1 для результата
// inputTime - поле для настройки времени
// score - переменная для хранения результата, изначально там ноль.
// 1. Вешаем на кнопку начала игры обработчик кликов. По клику срабатывает функция startGame
// start.addEventListener('click', startGame)
// 2. Описываем функцию startGame.
// скрываем кнопку start (добавляем ей класс hide)
// делаем поле игры (game) белым
// вызываем функцию генерации квадратов - renderBox()
// 3. Описываем функцию renderBox, которая создает и помещает первый квадрат в поле игры.
// - создаем элемент (div)
// - добавляем ему ширину и высоту, для начала например по 50px
// - добавляем ему абсолютное позиционирование, цвет заливки (напр. черный)
// - добавляем расположение (top и left, например по 70px)
// - меняем вид курсора на pointer
// - помещаем div внутрь поля game
// - квадрату добавляем класс, например box, чтобы впоследствии можно было определить клик именно по нему.
// 4. Вешаем обработчик событий на поле игры game и при клике запускаем функцию gameBoxClick.
// game.addEventListener('click', gameBoxClick);
// 5. Описываем функцию gameBoxClick, принимающую параметр event (событие):
// - проверяем, содержит ли объект, по которому пришелся клик (event.target) класс box:
//  event.target.classList.contains('box')
// - если да - увеличиваем score и запускаем функцию renderBox()
// Теперь при клике по квадрату генерируется новый квадрат, на том же месте и такого же размера. 
// Чтобы при этом старый квадрат удалялся, в начале функции renderBox добавим очистку поля game:
// game.innerHTML = '';
// 6. Описываем функцию getRandom(min,max), 
// которая будет генерировать случайные целые числа для размеров и раположения квадратов - в диапазоне от min до max:
// function getRandom(min, max) {
//     return (Math.floor(Math.random() * (max - min) + min)) 
//   }
// 7. Добавляем в функцию renderBox случайные размеры width и height и случайные значения расположения top и left. 
// - создаем переменную randomSize, присваиваем ей вызов функции getRandom(30, 100).
//  Меняем значение в свойствах ширины и высоты квадрата на переменную randomSize (не забываем приклеить 'px').
// Для генерирования top и left понадобится вычислить максимально возможное значение смещения квадрата
//  (разница между размером поля game и размером предыдущего квадрата) - чтобы по расположению квадраты всегда "вписывались" в поле игры:
// const maxDelta = 300 - randomSize
// Значение maxDelta будем использовать при генерации случайных значений top и left 
// (оно будет выступать в качестве max при вызове функции getRandom)
// 8. Добавляем таймер. Для этого в функцию startGame добавляем функцию setInterval 
// (срабатывание кода каждые 100ms для обновления времени в таймере). 
// const interval = setInterval(function(){ },100)
// Внутри этой функции:
// - создаем переменную currentTime для текущего значения времени. В нее помещаем содержимое span, 
// находящегося внутри h1 над полем игры (он записан в переменную time) и не забываем поменять тип данных на число.
// - задаем условие: ЕСЛИ значение времени <=0, игру закачиваем:
// Останавливаем интервальное повторение clearInterval(interval);
// Вызываем функцию endGame()),
// ИНАЧЕ записываем в span (переменную time) значение, 
// уменьшенное на 0.1(чтобы округлить дробь до 1 знака после запятой, используем метод .toFixed(1))
// 9. Добавляем проверку статуса игры, чтобы при окончании нельзя было генерировать квадраты.
// В начале кода игры объявим переменную const isGameActive, в которой будем хранить статус игры
//  (игра активна, запущена - true, остановлена - false), присвоим ей изначальное значение false.
// В  функции startGame присваиваем этой переменной значение true.
// В функции endGame - false.
// Также добавим проверку на isGameActive в функции клика по квадрату (gameBoxClick), 
// чтобы при неактивной игре квадраты не генерировались (просто пишем в это условие пустой return):
// if (!isGameActive) {
// return;
// }
// 10. Описываем функцию endGame().
// Итак, в функции endGame() мы:
// записываем isGameActive = false
// очищаем поле игры (game.innerHTML = '')
// показываем кнопку запуска игры
// меняем цвет фона блока игры
// скрываем h1 с временем и показываем h1 с результатом
// в span с результатом (result) помещаем значение score
// 11. Фиксим запуск игры, чтобы таймер не оставался на нуле после предыдущей игры. В функции startGame:
// обнуляем score
// показываем заголовок с таймером и прячем заголовок с результатом
// значение времени берем из поля внизу
// 12. Оживляем поле для изменения времени игры.
// вешаем обарботчик события change (изменение) на поле inputTime, внутри обработчика:
//  - записываем значение поля в span со временем игры:
// time.innerText = inputTime.value
// - скрываем заголовок с результатом и показываем заголовок с временем игры
// блокируем изменение инпута во время игры (добавляем ему атрибут disabled в функции startGame),
//  снимаем этот атрибут в конце игры (в функции endGame:
// inputTime.removeAttribute('disabled');

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
    console.log('запуск функции StartGame')
    inputTime.setAttribute = 'disabled';
    isGameActive = true;
    timeH1.classList.remove('hide')
    start.classList.add('hide');
    game.style.backgroundColor = 'white';
    score = 0;
    time.classList.remove('hide')
    result.classList.add('hide')
    resultH1.classList.add('hide')
    // time.innerHTML = inputTime;
    renderBox()
    const interval = setInterval(function () {
        const currentTime = Number(time.textContent);
        if (currentTime <= 0) {
            clearInterval(interval);
            endGame()
        } else {
            time.textContent = (Number(currentTime) - 0.1).toFixed(1);
        // console.log(time)
        // console.log(currentTime)
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
    console.log(result)
    console.log(resultH1.textContent)
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
    console.log('запуск функции gameBoxClick')
    console.log(event.target)
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
    console.log(inputTime.value)
    time.innerText = inputTime.value;
    result.classList.add('hide');
    time.classList.remove('hide');
    
})
