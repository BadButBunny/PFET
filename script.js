const exercises = [
    {
        name: 'Quick Flick Kegels',
        description: 'Rapidly contract and relax your pelvic floor muscles.',
        image: 'quick-flick-kegels.png',
        duration: 30
    },
    {
        name: 'Long Hold Kegels',
        description: 'Sustain a contraction for a few seconds to build endurance.',
        image: 'long-hold-kegels.png',
        duration: 30
    },
    {
        name: 'Bridge Pose',
        description: 'Lift your hips to engage the pelvic floor and gluteal muscles.',
        image: 'bridge-pose.png',
        duration: 30
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
