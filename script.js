// script.js

let display = document.getElementById("display");

function appendValue(value) {
    display.value += value;   // Show typed values
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;
        let result = eval(expression);

        // Show both expression and result
        display.value = expression + " = " + result;

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

        // Convert voice words into symbols
        let expression = speech.replace(/plus/g, "+")
            .replace(/minus/g, "-")
            .replace(/multiply/g, "*")
            .replace(/times/g, "*")
            .replace(/into/g, "*")
            .replace(/divide/g, "/")
            .replace(/by/g, "")
            .replace(/point/g, ".");

        // Show spoken expression first
        display.value = expression;

        // Calculate after 1 second
        setTimeout(() => {
            try {
                let result = eval(expression);
                display.value = expression + " = " + result;
            } catch {
                display.value = "Error";
            }
        }, 1000);
    };

    recognition.onerror = function () {
        alert("Voice recognition failed.");
    };
}