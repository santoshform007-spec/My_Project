// script.js

let display = document.getElementById("display");

function appendValue(value) {
    display.value += value;   // Show typed value
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

// Voice Recognition
function startVoice() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = function (event) {

        let speech = event.results[0][0].transcript.toLowerCase();

        // Convert voice words to symbols
        let expression = speech.replace(/plus/g, "+")
            .replace(/minus/g, "-")
            .replace(/multiply/g, "*")
            .replace(/into/g, "*")
            .replace(/times/g, "*")
            .replace(/divide/g, "/")
            .replace(/by/g, "")
            .replace(/point/g, ".");

        // Show spoken text in display first
        display.value = expression;

        // Auto calculate after 1 second
        setTimeout(() => {
            calculate();
        }, 1000);
    };

    recognition.onerror = function () {
        alert("Voice recognition failed.");
    };
}