const equalsButton = document.getElementById("bt_equals");
const plusButton = document.getElementById("bt_plus");
const minusButton = document.getElementById("bt_minus");
const multiplyButton = document.getElementById("bt_multiply");
const divideButton = document.getElementById("bt_divide");

const clearButton = document.getElementById("bt_clear");
const negateButton = document.getElementById("bt_negate");
const deleteButton = document.getElementById("bt_del");
const floatButton = document.getElementById("bt_float");

const numberButton = document.querySelectorAll(".num");

//TBD: refactor global vars to obj props
/* const states {
    operand1: 0,
    operand2: 0,
    operation: "",
    resolved: false,
    result: 0,
    
    numsPushed: [],
    displayState: 0,
} */

let operand1 = 0;
let operand2 = 0;
let operation = "";
let resolved = false;
let result = 0;

let numsPushed = [];
let displayState = 0;

const display = document.getElementById("display");
display.innerHTML = displayState;

function addNum(x) {
    if (resolved) {
        reset();
    }
    numsPushed.push(x);
    display.innerHTML = numsPushed.join("");
    displayState = Number(numsPushed.join(""));
}

function compute() {
    operand2 = displayState;
    numsPushed = [];

    switch (operation) {

        case "addition":
            result = operand1 + operand2;
            break;

        case "subtraction":
            result = operand1 - operand2;
            break;

        case "multiplication":
            result = operand1 * operand2;
            break;

        case "division":
            if (operand2 == 0) {
                reset();
                display.innerHTML = "Error!";
            } else {
                result = operand1 / operand2;
            }
            break;

        default:
            console.log("no operation defined");
            result = displayState;
    }

    if (display.innerHTML !== "Error!") {
        operand1 = result;
        display.innerHTML = result;
        resolved = true;
    }
}

function nextOperation() {
    if (numsPushed.length !== 0 && numsPushed[0] !== "."){
        compute();
    }
    if (resolved) {
        operand1 = result;
    } else {
        operand1 = displayState;
    }
    resolved = false;
    numsPushed = [];
}

const plus = () => {
    nextOperation();
    operation = "addition";
}

const minus = () => {
    nextOperation();
    operation = "subtraction";
}

const multiply = () => {
    nextOperation();
    operation = "multiplication";
}

const divide = () => {
    nextOperation();
    operation = "division";
}

function reset() {
    displayState = 0;
    numsPushed = [];
    operand1 = 0;
    operand2 = 0;
    operation = "";
    resolved = false;
    result = 0;
    display.innerHTML = displayState;
}

function negateValue() {
    if (resolved) {
        result *= -1;
        displayState = result;
        operand1 = result;
        display.innerHTML = displayState;
        displayState = operand2;
    } else {
        displayState *= -1;
        numsPushed[0] *= -1;
        display.innerHTML = displayState;
    }
}

const deleteLast = () => {
    if (resolved) {
        reset();
    } else {
        numsPushed.pop();
        displayState = Number(numsPushed.join(""));
        display.innerHTML = displayState;
    }
}

const addFloat = () => {
    if (resolved) {
        reset();
        numsPushed.push(".");
    } else {
        if (numsPushed.includes(".") === false) {
            numsPushed.push(".");
        }
    }
}

equalsButton.addEventListener("click", () => compute());
clearButton.addEventListener("click", () => reset());
negateButton.addEventListener("click", () => negateValue());
deleteButton.addEventListener("click", () => deleteLast());
floatButton.addEventListener("click", () => addFloat());

plusButton.addEventListener("click", () => plus());
minusButton.addEventListener("click", () => minus());
multiplyButton.addEventListener("click", () => multiply());
divideButton.addEventListener("click", () => divide());

numberButton.forEach(button => button.addEventListener("click", () => addNum(button.dataset.number)));

document.addEventListener("keydown", function(event) {
        if (event.keyCode === 13 && document.activeElement !== equalsButton) {
                compute();
            }
    }
);