// Select display elements
const currentDisplay = document.querySelector('.current');
const historyDisplay = document.querySelector('.history');

// Initialize input and history
let currentInput = "";
let operationHistory = "";

// Update the display
const updateDisplay = () => {
    currentDisplay.textContent = currentInput || "0";
    historyDisplay.textContent = operationHistory || "0";
};

// Handle button clicks
const handleButtonClick = (value) => {
    switch (value) {
        case "ac":
            currentInput = operationHistory = "";
            break;
        case "del":
            currentInput = currentInput.slice(0, -1);
            break;
        case "=":
            try {
                currentInput = eval(operationHistory + currentInput) || "0";
                operationHistory = "";
            } catch {
                currentInput = "Error";
                operationHistory = "";
            }
            break;
        default:
            if ("+-*/".includes(value) && currentInput) {
                operationHistory += currentInput + " " + value + " ";
                currentInput = "";
            } else {
                currentInput += value;
            }
    }
    updateDisplay();
};

// Add click listeners to buttons
document.querySelectorAll('.input button').forEach(button => 
    button.addEventListener("click", () => handleButtonClick(button.value))
);

// Add keyboard support
document.addEventListener("keydown", (event) => {
    const keyMap = {
        Enter: "=", Backspace: "del", c: "ac", C: "ac"
    };
    const value = keyMap[event.key] || event.key;
    if (/[0-9.+\-*/()=]/.test(value)) handleButtonClick(value);
});
