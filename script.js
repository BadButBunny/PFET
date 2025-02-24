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

const exerciseName = document.getElementById('exercise-name');
const exerciseDescription = document.getElementById('exercise-description');
const exerciseImage = document.getElementById('exercise-image');
const exerciseTimer = document.getElementById('exercise-timer');
const progressBar = document.getElementById('progress-bar');

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);
document.getElementById('nextButton').addEventListener('click', nextExercise);
document.getElementById('prevButton').addEventListener('click', prevExercise);

function updateUI() {
    const exercise = exercises[currentExerciseIndex];
    exerciseName.textContent = exercise.name;
    exerciseDescription.textContent = exercise.description;
    exerciseImage.src = exercise.image;
    timeLeft = exercise.duration;
    updateTimerDisplay();
    updateProgressBar();
}

function updateTimerDisplay() {
    exerciseTimer.textContent = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
}

function updateProgressBar() {
    const totalDuration = exercises[currentExerciseIndex].duration;
    const percentage = ((totalDuration - timeLeft) / totalDuration) * 100;
    progressBar.style.width = `${percentage}%`;
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
            nextExercise();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = exercises[currentExerciseIndex].duration;
    updateTimerDisplay();
    updateProgressBar();
}

function nextExercise() {
    if (currentExerciseIndex < exercises.length - 1) {
        currentExerciseIndex++;
        updateUI();
    }
}

function prevExercise() {
    if (currentExerciseIndex > 0) {
        currentExerciseIndex--;
        updateUI();
    }
}

// Initialize UI
updateUI();
