const exercises = [
    {
        name: 'Diaphragmatic Breathing',
        description: 'Promotes relaxation and prepares the pelvic floor muscles for exercise.',
        duration: 60 // 1 minute
    },
    {
        name: 'Slow Kegel Contractions',
        description: 'Strengthens the slow-twitch muscle fibers responsible for sustained support.',
        duration: 60 // 1 minute
    },
    {
        name: 'Quick Flick Kegels',
        description: 'Enhances the fast-twitch muscle fibers for quick responses to sudden pressures.',
        duration: 60 // 1 minute
    },
    {
        name: 'Bridge Pose',
        description: 'Engages the pelvic floor along with gluteal and core muscles.',
        duration: 60 // 1 minute
    },
    {
        name: 'Happy Baby Pose',
        description: 'Promotes relaxation and lengthening of the pelvic floor muscles.',
        duration: 60 // 1 minute
    }
];
let currentExerciseIndex = 0;
let timerInterval;
let timeLeft = exercises[currentExerciseIndex].duration;

const exerciseNameElement = document.getElementById('exercise-name');
const exerciseDescriptionElement = document.getElementById('exercise-description');
const exerciseTimerElement = document.getElementById('exercise-timer');
const progressBarElement = document.getElementById('progress-bar');

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);

function updateUI() {
    const exercise = exercises[currentExerciseIndex];
    exerciseNameElement.textContent = exercise.name;
    exerciseDescriptionElement.textContent = exercise.description;
    timeLeft = exercise.duration;
    updateTimerDisplay();
    updateProgressBar();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    exerciseTimerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateProgressBar() {
    const totalDuration = exercises[currentExerciseIndex].duration;
    const percentage = ((totalDuration - timeLeft) / totalDuration) * 100;
    progressBarElement.style.width = `${percentage}%`;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
            updateProgressBar();
        } else {
            clearInterval(timerInterval);
            if (currentExerciseIndex < exercises.length - 1) {
                currentExerciseIndex++;
                updateUI();
                startTimer();
            } else {
                // Routine complete
                alert('Well done! You have completed the routine.');
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    currentExerciseIndex = 0;
    updateUI();
}
