/* let success = "Loaded successfully"
console.log(success); */

const equalsButton = document.getElementById("bt_equals");
const plusButton = document.getElementById("bt_plus");
const minusButton = document.getElementById("bt_minus");
const multiplyButton = document.getElementById("bt_multiply");
const divideButton = document.getElementById("bt_divide");

const clearButton = document.getElementById("bt_clear");
const negateButton = document.getElementById("bt_negate");
const deleteButton = document.getElementById("bt_del");
const floatButton = document.getElementById("bt_float");

/* const oneButton = document.getElementById("bt_1");
const twoButton = document.getElementById("bt_2");
const threeButton = document.getElementById("bt_3");
const fourButton = document.getElementById("bt_4");
const fiveButton = document.getElementById("bt_5");
const sixButton = document.getElementById("bt_6");
const sevenButton = document.getElementById("bt_7");
const eightButton = document.getElementById("bt_8");
const nineButton = document.getElementById("bt_9");
const zeroButton = document.getElementById("bt_0"); */

const numberButton = document.querySelectorAll(".num");

let operand1 = 0;
let operand2 = 0;
let operation = "";
let resolved = false;
let result = 0;

let numsPushed = [];
let displayState = 0;

const display = document.getElementById("display");
display.innerHTML = displayState;

// redundant, only called once
/* const clearDisplay = () => {
    displayState = 0;
    numsPushed = [];
    display.innerHTML = displayState;
} */

const addNum = x => {
    if (resolved) {
        reset();
    }
    numsPushed.push(x);
    displayState = Number(numsPushed.join(""));
    display.innerHTML = displayState;
}

function compute(){
    operand2 = displayState;

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
                console.log("division by zero")
                reset();
                /* displayState = "Error!";
                display.innerHTML = displayState; */
            } else {
                result = operand1 / operand2;
            }
            break;

        default:
            console.log("no operation defined");
    }

    operand1 = result;
    display.innerHTML = result;
    resolved = true;
}

const nextOperation = () => {
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

const reset = () => {
    displayState = 0;
    numsPushed = [];
    operand1 = 0;
    operand2 = 0;
    operation = "";
    resolved = false;
    result = 0;
    display.innerHTML = displayState;
}

const negateValue = () => {
    /* console.log(`resolved: ${resolved}, result = ${result}, displayState = ${displayState}`); */

    if (resolved) {
        result *= -1;
        displayState = result;
        display.innerHTML = displayState;
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

/* oneButton.addEventListener("click", () => addNum(1));
twoButton.addEventListener("click", () => addNum(2));
threeButton.addEventListener("click", () => addNum(3));
fourButton.addEventListener("click", () => addNum(4));
fiveButton.addEventListener("click", () => addNum(5));
sixButton.addEventListener("click", () => addNum(6));
sevenButton.addEventListener("click", () => addNum(7));
eightButton.addEventListener("click", () => addNum(8));
nineButton.addEventListener("click", () => addNum(9));
zeroButton.addEventListener("click", () => addNum(0)); */

numberButton.forEach(button => button.addEventListener("click", () => addNum(button.dataset.number)));


document.addEventListener("keydown", function(event) {
        if (event.keyCode === 13 && document.activeElement !== equalsButton) {
                compute();
            }
    }
);