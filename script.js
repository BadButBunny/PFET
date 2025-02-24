// Load translations
const translations = {
    en: {
        welcome: "Welcome to Your Daily PFE Routine",
        exercises: "Your Exercises",
        schedule: "Workout Schedule",
        progress: "Your Progress",
        settings: "Settings"
    },
    es: {
        welcome: "Bienvenido a tu rutina diaria de PFE",
        exercises: "Tus ejercicios",
        schedule: "Horario de entrenamiento",
        progress: "Tu progreso",
        settings: "Configuraciones"
    }
};

// Workout schedule
const workoutSchedule = [
    { name: "Kegel Exercises", duration: 100 },
    { name: "Pelvic Tilts", duration: 50 },
    { name: "Bird-Dog", duration: 100 },
    { name: "Heel Slides", duration: 50 }
];

document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const startWorkoutBtn = document.getElementById("startWorkout");
    const pauseWorkoutBtn = document.getElementById("pauseWorkout");
    const stopWorkoutBtn = document.getElementById("stopWorkout");
    const quickStartBtn = document.getElementById("quickStart");
    const workoutDisplay = document.getElementById("workoutDisplay");
    const currentExercise = document.getElementById("currentExercise");
    const timeRemaining = document.getElementById("timeRemaining");
    const timerSound = document.getElementById("timerSound");
    const progressForm = document.getElementById("progressForm");
    const progressList = document.getElementById("progressList");
    const progressChart = document.getElementById("progressChart").getContext("2d");
    const toggleDarkMode = document.getElementById("toggleDarkMode");
    const tutorialModal = document.getElementById("tutorialModal");
    const closeModal = document.querySelector(".close");
    const saveSettingsBtn = document.getElementById("saveSettings");

    let currentIndex = 0;
    let timerInterval;
    let isPaused = false;
    let lang = localStorage.getItem("language") || "en";

    // Load settings
    const savedDuration = localStorage.getItem("duration") || 300;
    document.getElementById("duration").value = savedDuration;
    document.getElementById("language").value = lang;
    updateLanguage();

    // Dark Mode Toggle
    toggleDarkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        toggleDarkMode.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });

    // Tutorial Modal
    if (!localStorage.getItem("tutorialShown")) {
        tutorialModal.style.display = "block";
        localStorage.setItem("tutorialShown", "true");
    }
    closeModal.addEventListener("click", () => tutorialModal.style.display = "none");

    // Workout Logic
    function startWorkout() {
        currentIndex = 0;
        workoutDisplay.style.display = "block";
        startExercise();
    }

    function startExercise() {
        const exercise = workoutSchedule[currentIndex];
        currentExercise.textContent = exercise.name;
        let timeLeft = exercise.duration;
        timeRemaining.textContent = timeLeft;

        timerInterval = setInterval(() => {
            if (!isPaused) {
                timeLeft--;
                timeRemaining.textContent = timeLeft;
                if (timeLeft === 5) timerSound.play();
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    currentIndex++;
                    if (currentIndex < workoutSchedule.length) {
                        startExercise();
                    } else {
                        workoutDisplay.style.display = "none";
                        alert("Workout completed! Great job!");
                        logStreak();
                    }
                }
            }
        }, 1000);
    }

    function pauseWorkout() {
        isPaused = !isPaused;
        pauseWorkoutBtn.textContent = isPaused ? "Resume" : "Pause";
    }

    function stopWorkout() {
        clearInterval(timerInterval);
        workoutDisplay.style.display = "none";
    }

    startWorkoutBtn.addEventListener("click", startWorkout);
    pauseWorkoutBtn.addEventListener("click", pauseWorkout);
    stopWorkoutBtn.addEventListener("click", stopWorkout);
    quickStartBtn.addEventListener("click", startWorkout);

    // Progress Tracking
    progressForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const date = document.getElementById("date").value;
        const completed = document.getElementById("completed").value;
        const progress = { date, completed };
        saveProgress(progress);
        displayProgress();
        updateChart();
        progressForm.reset();
    });

    function saveProgress(progress) {
        let progressData = JSON.parse(localStorage.getItem("progress")) || [];
        progressData.push(progress);
        localStorage.setItem("progress", JSON.stringify(progressData));
    }

    function displayProgress() {
        progressList.innerHTML = "";
        const progressData = JSON.parse(localStorage.getItem("progress")) || [];
        progressData.sort((a, b) => new Date(b.date) - new Date(a.date));
        progressData.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.date}: ${item.completed}`;
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                progressData.splice(index, 1);
                localStorage.setItem("progress", JSON.stringify(progressData));
                displayProgress();
                updateChart();
            });
            li.appendChild(deleteBtn);
            progressList.appendChild(li);
        });
    }

    function updateChart() {
        const progressData = JSON.parse(localStorage.getItem("progress")) || [];
        const dates = progressData.map(p => p.date);
        const completions = progressData.map(p => p.completed === "yes" ? 1 : 0);
        new Chart(progressChart, {
            type: "line",
            data: {
                labels: dates,
                datasets: [{
                    label: "Workout Completion",
                    data: completions,
                    borderColor: var(--primary),
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true, max: 1 }
                }
            }
        });
    }

    // Gamification: Streak
    function logStreak() {
        let streak = parseInt(localStorage.getItem("streak")) || 0;
        streak++;
        localStorage.setItem("streak", streak);
        if (streak % 5 === 0) alert(`Awesome! You've hit a ${streak}-day streak!`);
    }

    // Settings
    saveSettingsBtn.addEventListener("click", () => {
        const duration = document.getElementById("duration").value;
        lang = document.getElementById("language").value;
        localStorage.setItem("duration", duration);
        localStorage.setItem("language", lang);
        updateLanguage();
        alert("Settings saved!");
    });

    function updateLanguage() {
        document.querySelector("#home h2").textContent = translations[lang].welcome;
        document.querySelector("#exercises h2").textContent = translations[lang].exercises;
        document.querySelector("#schedule h2").textContent = translations[lang].schedule;
        document.querySelector("#progress h2").textContent = translations[lang].progress;
        document.querySelector("#settings h2").textContent = translations[lang].settings;
    }

    // Initial Load
    displayProgress();
    updateChart();
});

// Minified code is handled by tools like Terser in production
