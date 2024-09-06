import { collectionOfNumbers, collectionOfNumbersWithDot, collectionOfOperators, operators, operatorsWithExpressions, openingParenthesis, closingParenthesis } from './constants/index.js';
import physicalKeyboard from './keyboard.js';

export const equalBtn = document.querySelector('.equal');
export const zero = document.querySelector('.zero');
export const one = document.querySelector('.one');
export const two = document.querySelector('.two');
export const three = document.querySelector('.three');
export const four = document.querySelector('.four');
export const five = document.querySelector('.five');
export const six = document.querySelector('.six');
export const seven = document.querySelector('.seven');
export const eight = document.querySelector('.eight');
export const nine = document.querySelector('.nine');
export const remainder = document.querySelector('.remainder');
export const division = document.querySelector('.division');
export const multiplication = document.querySelector('.mult');
export const minus = document.querySelector('.minus');
export const plus = document.querySelector('.plus');
export const open = document.querySelector('.open');
export const close = document.querySelector('.close');
export const dot = document.querySelector('.dot');
const inputPlace = document.querySelector("input");
const plusMinusBtn = document.querySelector('.plus-minus');
const clearBtn = document.querySelector('.clear');
const clearAllBtn = document.querySelector('.clear-all');

document.onkeypress = physicalKeyboard;

let openPar = 0;
let closePar = 0;

function updateInput() {
    let maxLength = 30;
    let lastValue = inputPlace.value[inputPlace.value.length - 1];
    let thisValue = this.textContent;

    if (inputPlace.value == '' && collectionOfOperators.includes(thisValue) && inputPlace.placeholder != 'Enter expression') {
        inputPlace.value = inputPlace.placeholder;
    };

    if (thisValue == '.' && inputPlace.value != '') {
        let count = 0;
        let arrOfStr = [];

        for (let i = inputPlace.value.length - 1; !collectionOfOperators.includes(inputPlace.value[i]) && i > 0; i--) {
            arrOfStr.push(inputPlace.value[i]);
        };

        for (let k = 0; k < arrOfStr.length; k++) {
            if (arrOfStr[k] == '.') {
                count++;
            }
        };

        if (count > 0) { 
            return '' 
        };
    };

    if (inputPlace.value[0] == '+') {
        inputPlace.value = inputPlace.value.substr(1);
    };

    if (thisValue == openingParenthesis) {
        openPar++;
    } else if (thisValue == closingParenthesis) {
        closePar++;
    };

    if (inputPlace.value == 'NaN') {
        inputPlace.value == '';
    };

    if (inputPlace.value.length > maxLength) {}
    else if (!collectionOfNumbers.includes(thisValue) && lastValue == '.') {}
    else if (thisValue == closingParenthesis && closePar > openPar) closePar--
    else if (thisValue == openingParenthesis && !collectionOfOperators.includes(lastValue) && lastValue != openingParenthesis) openPar--
    else if (thisValue == closingParenthesis && lastValue == openingParenthesis) closePar--
    else if (thisValue == openingParenthesis && lastValue == closingParenthesis) openPar--
    else if (thisValue == openingParenthesis && collectionOfNumbers.includes(lastValue)) openPar--
    else if (thisValue == closingParenthesis && !collectionOfNumbers.includes(lastValue) && lastValue != closingParenthesis) closePar--
    else if (thisValue == '.' && lastValue == closingParenthesis) {}
    else if (lastValue == closingParenthesis && collectionOfNumbers.includes(thisValue)) openPar--
    else if (lastValue == openingParenthesis && ['+', '*', '/', '%'].includes(thisValue)) {}
    else if (inputPlace.value == '' && thisValue != '-' && thisValue != '.' && thisValue != openingParenthesis && !collectionOfNumbers.includes(thisValue)) {}
    else if (collectionOfNumbers.includes(lastValue) && thisValue == openingParenthesis) {}
    else if (collectionOfOperators.includes(thisValue) && collectionOfOperators.includes(lastValue)) {
        inputPlace.value = inputPlace.value.substr(0, inputPlace.value.length - 1);
        inputPlace.value += thisValue;
    } else inputPlace.value += thisValue;

    if (closePar == openPar) {
        openPar = 0;
        closePar = 0;
    };
};

function equal() {
    if (inputPlace.value == '' && inputPlace.placeholder == 'Enter expression') {
        return ''
    };

    if (inputPlace.value == '') {
        inputPlace.value = inputPlace.placeholder;
    };

    let input = inputPlace.value;
    let revPolsNot = [];
    let stack = [];

    let arr = [];
    let newArr = [];

    for (let i = 0; i < input.length; i++) {
        if (input[i] == openingParenthesis && input[i+1] == '-') {
            input = input.substr(0, i + 1) + '0' +  input.substr(i + 1);
        };
    };

    if (openPar != 0 && openPar != closePar) { 
        alert('Complete the expression!');
        return ''
    };

    if (input[0] == '-') {
        arr.push('0');
        arr.push(' ');
    };

    if (collectionOfOperators.includes(input[input.length - 1])) {
        input = input.substr(0, input.length - 1);
    };

    if (inputPlace.value == '-') return '';

    for (let i = 0; i < input.length; i++) {
        arr.push(input[i]);
        if (!collectionOfNumbersWithDot.includes(input[i + 1]) && i < input.length - 1) {
            arr.push(' ');
        } else if (!collectionOfNumbersWithDot.includes(input[i]) && collectionOfNumbersWithDot.includes(input[i + 1]) && i < input.length - 1) {
            arr.push(' ');
        };
    };

    newArr = arr.join('').split(' ');

    for (let i = 0; i < newArr.length; i++) {
        const char = newArr[i];

        if (/[0-9]/.test(char)) {
            revPolsNot.push(char);
        } else if (char == openingParenthesis) {
            stack.push(char);
        } else if (char == closingParenthesis) {
            let fromStack = stack.pop();

            for (let i = stack.length; fromStack != (openingParenthesis) && i > 0; i--) {
                revPolsNot.push(fromStack);
                fromStack = stack.pop();
            };
        } else if (Object.keys(operators).includes(char)) {
            for (let i = stack.length; operators[stack.slice(-1)] >= operators[char] && i > 0; i--) {
                revPolsNot.push(stack.pop());
            };

            stack.push(char);
        };
    };

    let fromStackOut = '';

    for (let i = stack.length; i > 0; i--) {
        fromStackOut = stack.pop();
        revPolsNot.push(fromStackOut);
    };

    function rpnToNormal(expression) {
        const stack = [];

        for (let token of expression) {
            if (isNumber(token)) {
                stack.push(parseFloat(token));
            } else {
                const operand2 = stack.pop();
                const operand1 = stack.pop();
                const operator = operatorsWithExpressions[token];
                stack.push(operator(operand1, operand2));
            };
        };
        return stack.pop();
    };

    function isNumber(token) {
        return !isNaN(parseFloat(token)) && isFinite(token);
    };

    const res = rpnToNormal(revPolsNot);

    inputPlace.value = '';

    inputPlace.placeholder = +Number(res).toFixed(3);
};

function clear() {
    if (inputPlace.value[inputPlace.value.length - 1] == openingParenthesis) {
        openPar--;
    } else if (inputPlace.value[inputPlace.value.length - 1] == closingParenthesis) {
        closePar--;
    }

    inputPlace.value = inputPlace.value.substr(0, inputPlace.value.length - 1);
    inputPlace.placeholder = 'Enter expression';
};

function clearAll() {
    openPar = 0;
    closePar = 0;
    inputPlace.value = '';
    inputPlace.placeholder = 'Enter expression';
};

function changeSign() {
    if (inputPlace.value == '') {
        inputPlace.value = inputPlace.placeholder;
    };

    if (inputPlace.value =='' && inputPlace.placeholder == 'Enter expression') return '';

    if (inputPlace.value != '') {
        for (let i = inputPlace.value.length - 1; !collectionOfOperators.includes(inputPlace.value[i]) && i >= 0; i--) {
            if (inputPlace.value[i-1] == '+') {
                inputPlace.value = inputPlace.value.substr(0, i - 1) + '-' + inputPlace.value.substr(i);
            } else if (inputPlace.value[i-1] == '-') {
                inputPlace.value = inputPlace.value.substr(0, i - 1) + '+' + inputPlace.value.substr(i);
            } else if (inputPlace.value[i-1] == '*') {
                inputPlace.value = inputPlace.value.substr(0, i) + '(-' + inputPlace.value.substr(i) + closingParenthesis;
            } else if (inputPlace.value[i-1] == '/') {
                inputPlace.value = inputPlace.value.substr(0, i) + '(-' + inputPlace.value.substr(i) + closingParenthesis;
            } else if (inputPlace.value[i-1] == '%') {
                inputPlace.value = inputPlace.value.substr(0, i) + '(-' + inputPlace.value.substr(i) + closingParenthesis;
            }  else if (inputPlace.value[i-1] == openingParenthesis) {
                inputPlace.value = inputPlace.value.substr(0, i) + '-' + inputPlace.value.substr(i);
            } else if (collectionOfNumbers.includes(inputPlace.value[0]) && i == 0) {
                inputPlace.value = '-' + inputPlace.value.substr(0);
            };
        };

        for (let k = 0; k < inputPlace.value.length; k++) {
            if (inputPlace.value[k] == openingParenthesis && inputPlace.value[k+1] == '+') {
                inputPlace.value = inputPlace.value.substr(0, k) + inputPlace.value.slice(k + 2, inputPlace.value.length - 1);
            };
        };

        if (inputPlace.value[0] == '+') {
            inputPlace.value = inputPlace.value.substr(1);
        };
    };
};

function addHandler() {
    zero.addEventListener("click", updateInput);
    one.addEventListener("click", updateInput);
    two.addEventListener("click", updateInput);
    three.addEventListener("click", updateInput);
    four.addEventListener("click", updateInput);
    five.addEventListener("click", updateInput);
    six.addEventListener("click", updateInput);
    seven.addEventListener("click", updateInput);
    eight.addEventListener("click", updateInput);
    nine.addEventListener("click", updateInput);
    remainder.addEventListener("click", updateInput);
    division.addEventListener("click", updateInput);
    multiplication.addEventListener("click", updateInput);
    minus.addEventListener("click", updateInput);
    plus.addEventListener("click", updateInput);
    open.addEventListener("click", updateInput);
    close.addEventListener("click", updateInput);
    dot.addEventListener("click", updateInput);
    plusMinusBtn.addEventListener("click", changeSign);
    clearBtn.addEventListener("click", clear);
    equalBtn.addEventListener("click", equal);
    clearAllBtn.addEventListener("click", clearAll);
};

window.onload = addHandler();
