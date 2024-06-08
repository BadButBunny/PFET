const levels = [
    { intervals: [{ active: 5, rest: 10 }] }, // Level 1
    { intervals: [{ active: 6, rest: 9 }] }, // Level 2
    { intervals: [{ active: 7, rest: 8 }] }, // Level 3
    // Add levels up to 30 with appropriate intervals
    { intervals: [{ active: 10, rest: 2 }, { active: 7, rest: 1 }, { active: 10, rest: 2 }] }, // Level 22
    { intervals: [{ active: 10, rest: 5 }, { active: 10, rest: 5 }, { active: 5, rest: 5 }] } // Level 30
];

let currentLevel = levels[0];
let currentIntervalIndex = 0;
let isResting = false;
let timer;
let totalTimer;
let timeLeft = currentLevel.intervals[0].active;
let totalTimeLeft = 5 * 60; // 5 minutes in seconds

const timerElement = document.getElementById('timer');
const generalTimerElement = document.getElementById('general-timer');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const levelInput = document.getElementById('level');

// Load sound files
const activeSound = new Audio('active.mp3.wav');
const restSound = new Audio('rest.mp3.wav');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
levelInput.addEventListener('change', setLevel);

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
            currentIntervalIndex = (currentIntervalIndex + 1) % currentLevel.intervals.length;
            timeLeft = isResting ? currentLevel.intervals[currentIntervalIndex].rest : currentLevel.intervals[currentIntervalIndex].active;
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
    currentIntervalIndex = 0;
    timeLeft = currentLevel.intervals[0].active;
    totalTimeLeft = 5 * 60; // 5 minutes in seconds
    updateTimer();
    updateGeneralTimer();
}

function setLevel() {
    const levelIndex = parseInt(levelInput.value) - 1;
    if (levelIndex >= 0 && levelIndex < levels.length) {
        currentLevel = levels[levelIndex];
        resetTimer();
    } else {
        alert('Please select a valid level between 1 and 30.');
        levelInput.value = 1;
    }
}

function playSound(isResting) {
    if (isResting) {
        restSound.play();
    } else {
        activeSound.play();
    }
}

// Initialize timer display
updateTimer();
updateGeneralTimer();
