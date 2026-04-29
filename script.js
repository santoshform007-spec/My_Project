// script.js
let display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
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
        display.value = "Phir se bol";
    }
}

// Voice Recognition
function startVoice() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = function (event) {
        let speech = event.results[0][0].transcript.toLowerCase();

        speech = speech.replace(/plus/g, "+")
            .replace(/minus/g, "-")
            .replace(/multiply/g, "*")
            .replace(/into/g, "*")
            .replace(/divide/g, "/")
            .replace(/by/g, "")
            .replace(/point/g, ".");

        display.value = speech;

        calculate();
    };

    recognition.onerror = function () {
        alert("Voice recognition failed.");
    };
}