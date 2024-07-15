let isResting = false;
let timer;
let totalTimer;
let timeLeft;
let totalTimeLeft = 5 * 60; // 5 minutes in seconds

const timerElement = document.getElementById('timer');
const generalTimerElement = document.getElementById('general-timer');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');

// Load sound files
const activeSound = new Audio('active.mp3.wav');
const restSound = new Audio('rest.mp3.wav');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateGeneralTimer() {
    const minutes = Math.floor(totalTimeLeft / 60);
    const seconds = totalTimeLeft % 60;
    generalTimerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    clearInterval(timer);
    clearInterval(totalTimer);
    totalTimeLeft = 5 * 60; // Reset total time to 5 minutes
    setRandomInterval(); // Set initial random interval
    totalTimer = setInterval(() => {
        if (totalTimeLeft > 0) {
            totalTimeLeft--;
            updateGeneralTimer();
        } else {
            clearInterval(timer);
            clearInterval(totalTimer);
        }
    }, 1000);
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            isResting = !isResting;
            setRandomInterval(); // Set new random interval
            updateColors(isResting);
            playSound(isResting);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    clearInterval(totalTimer);
}

function resetTimer() {
    clearInterval(timer);
    clearInterval(totalTimer);
    isResting = false;
    timeLeft = getRandomTime(); // Get initial random time
    totalTimeLeft = 5 * 60; // 5 minutes in seconds
    updateTimer();
    updateGeneralTimer();
    updateColors(false);
}

function getRandomTime() {
    return Math.floor(Math.random() * 10) + 1; // Random time between 1 and 10 seconds
}

function setRandomInterval() {
    timeLeft = getRandomTime();
}

function playSound(isResting) {
    if (isResting) {
        restSound.currentTime = 0; // Reset to the beginning of the audio
        restSound.play();
    } else {
        activeSound.currentTime = 0; // Reset to the beginning of the audio
        activeSound.play();
    }
}

function updateColors(isResting) {
    if (isResting) {
        document.body.style.backgroundColor = 'blue';
        timerElement.style.color = 'white';
    } else {
        document.body.style.backgroundColor = 'red';
        timerElement.style.color = 'white';
    }
}

// Initialize timer display and colors
resetTimer();
