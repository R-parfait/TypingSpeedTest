const paragraph = document.getElementById("paragraph");
const inputBox = document.getElementById("input-box");
const startButton = document.getElementById("start-button");
const timeDisplay = document.getElementById("time");
const speedDisplay = document.getElementById("speed");
const errorsDisplay = document.getElementById("errors");

const sampleParagraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect, so keep typing to improve your speed.",
    "A journey of a thousand miles begins with a single step.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Happiness is not something ready made. It comes from your own actions.",
    "The only way to do great work is to love what you do.",
    "In the middle of every difficulty lies opportunity.",
    "Believe you can and you're halfway there.",
    "Don't watch the clock; do what it does. Keep going.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Hardships often prepare ordinary people for an extraordinary destiny.",
    "It does not matter how slowly you go as long as you do not stop.",
    "You are never too old to set another goal or to dream a new dream.",
    "Everything you’ve ever wanted is on the other side of fear.",
    "Don’t limit your challenges. Challenge your limits.",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "You don’t have to be great to start, but you have to start to be great.",
    "Do not wait to strike till the iron is hot; but make it hot by striking.",
    "Opportunities don’t happen. You create them.",
    "Start where you are. Use what you have. Do what you can.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Perseverance is not a long race; it is many short races one after the other."
];


let timer = null;
let startTime = null;
let totalTime = 0;
let errorCount = 0;

// Start the typing test
startButton.addEventListener("click", () => {
    resetTest();
    paragraph.textContent = sampleParagraphs[Math.floor(Math.random() * sampleParagraphs.length)];
    inputBox.disabled = false;
    inputBox.focus();
    startTime = new Date().getTime();

    timer = setInterval(() => {
        const currentTime = new Date().getTime();
        totalTime = Math.floor((currentTime - startTime) / 1000);
        timeDisplay.textContent = totalTime;
    }, 1000);
});

// Handle input typing
inputBox.addEventListener("input", () => {
    const typedText = inputBox.value;
    const originalText = paragraph.textContent;

    if (typedText === originalText) {
        finishTest();
    }

    errorCount = calculateErrors(originalText, typedText);
    errorsDisplay.textContent = errorCount;
});

// Finish the typing test
function finishTest() {
    clearInterval(timer);
    inputBox.disabled = true;
    const wordsTyped = inputBox.value.split(" ").length;
    const speed = Math.round((wordsTyped / totalTime) * 60);
    speedDisplay.textContent = speed;
}

// Calculate errors
function calculateErrors(original, typed) {
    let errors = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] !== original[i]) {
            errors++;
        }
    }
    return errors;
}

// Reset the test
function resetTest() {
    clearInterval(timer);
    inputBox.value = "";
    timeDisplay.textContent = "0";
    speedDisplay.textContent = "0";
    errorsDisplay.textContent = "0";
    errorCount = 0;
    inputBox.disabled = true;
}