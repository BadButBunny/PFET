const levels = [
    { intervals: [{ active: 5, rest: 10 }] }, // Level 1
    { intervals: [{ active: 6, rest: 9 }] }, // Level 2
    { intervals: [{ active: 7, rest: 8 }] }, // Level 3
    // Add levels up to 30 with appropriate intervals
    { intervals: [{ active: 10, rest: 2 }, { active: 7, rest: 1 }, { active: 10, rest: 2 }] }, // Level 22
    { intervals: [{ active: 10, rest: 5 }, { active: 10, rest: 5 }, { active: 5, rest: 5 }] } // Level 30
];

const masteryLevels = [
    // Mastery Level 1 - Samurai (Beginner)
    [
        { intervals: [{ active: 5, rest: 10 }] }, // Sub-Level 1
        { intervals: [{ active: 6, rest: 9 }] },  // Sub-Level 2
        { intervals: [{ active: 7, rest: 8 }] },  // Sub-Level 3
        { intervals: [{ active: 8, rest: 7 }] },  // Sub-Level 4
        { intervals: [{ active: 9, rest: 6 }] },  // Sub-Level 5
    ],
    // Mastery Level 2 - Ronin (Intermediate)
    [
        { intervals: [{ active: 6, rest: 8 }] }, // Sub-Level 1
        { intervals: [{ active: 7, rest: 7 }] },  // Sub-Level 2
        { intervals: [{ active: 8, rest: 6 }] },  // Sub-Level 3
        { intervals: [{ active: 9, rest: 5 }] },  // Sub-Level 4
        { intervals: [{ active: 10, rest: 4 }] },  // Sub-Level 5
    ],
    // Add similar levels for Mastery Levels 3-6
];

const masteryNames = ["Samurai", "Ronin", "Ninja", "Shogun", "Daimyo", "Emperor"];

let currentLevel = masteryLevels[0][0];
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
const masteryLevelSelect = document.getElementById('mastery-level');
const subLevelSelect = document.getElementById('sub-level');

// Load sound files
const activeSound = new Audio('active.mp3.wav');
const restSound = new Audio('rest.mp3.wav');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
masteryLevelSelect.addEventListener('change', setMasteryLevel);
subLevelSelect.addEventListener('change', setSubLevel);

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
    totalTimeLeft = 5 * 60; // Reset total time
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
    currentIntervalIndex = 0;
    timeLeft = currentLevel.intervals[0].active;
    totalTimeLeft = 5 * 60; // 5 minutes in seconds
    updateTimer();
    updateGeneralTimer();
    updateColors(false);
}

function setMasteryLevel() {
    const masteryLevelIndex = parseInt(masteryLevelSelect.value) - 1;
    updateSubLevelOptions(masteryLevelIndex);
    currentLevel = masteryLevels[masteryLevelIndex][0]; // Default to first sub-level
    resetTimer();
}

function updateSubLevelOptions(masteryLevelIndex) {
    const subLevels = ["I", "II", "III", "IV", "V"];
    subLevelSelect.innerHTML = "";
    for (let i = 0; i < subLevels.length; i++) {
        const option = document.createElement("option");
        option.value = i + 1;
        option.text = `${masteryNames[masteryLevelIndex]} ${subLevels[i]}`;
        subLevelSelect.appendChild(option);
    }
}

function setSubLevel() {
    const masteryLevelIndex = parseInt(masteryLevelSelect.value) - 1;
    const subLevelIndex = parseInt(subLevelSelect.value) - 1;
    if (masteryLevelIndex >= 0 && masteryLevelIndex < masteryLevels.length && subLevelIndex >= 0 && subLevelIndex < masteryLevels[masteryLevelIndex].length) {
        currentLevel = masteryLevels[masteryLevelIndex][subLevelIndex];
        resetTimer();
    } else {
        alert('Please select a valid sub-level.');
        subLevelSelect.value = 1;
    }
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
        document.body.style.backgroundColor = 'grey';
        timerElement.style.color = 'white';
    } else {
        document.body.style.backgroundColor = 'royalblue';
        timerElement.style.color = 'white';
    }
}

// Initialize timer display and colors
updateTimer();
updateGeneralTimer();
updateColors(false);
