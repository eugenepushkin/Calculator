import { collectionOfNumbers, collectionOfNumbersWithDot, openingBracket, closingBracket } from './constants/index.js';
import { operators, operatorsWithExpressions, collectionOfOperators, defaultOperators } from './constants/operators.js';
import { floatingDot, minusSign, plusSign, multiSign, divisionSign, remainderSign }  from './constants/signs.js';
import { regCollectionOfNumbers } from './constants/regular.js';
import { emptyValue, spaceValue, zeroValue, nanValue } from './constants/empty.js';
import { defaultExpression } from './constants/expression.js';
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
const expressionError = document.getElementById('expression-error')

document.onkeypress = physicalKeyboard;

let openingBracketCount = 0;
let closingBracketCount = 0;

function updateInput() {
    let maxLength = 30;
    let lastValue = inputPlace.value[inputPlace.value.length - 1];
    let thisValue = this.textContent;

    if (inputPlace.value == emptyValue && collectionOfOperators.includes(thisValue) && inputPlace.placeholder != defaultExpression) {
        inputPlace.value = inputPlace.placeholder;
    };

    if (thisValue == floatingDot && inputPlace.value != emptyValue) {
        let count = 0;
        let arrOfStr = [];

        for (let i = inputPlace.value.length - 1; !collectionOfOperators.includes(inputPlace.value[i]) && i > 0; i--) {
            arrOfStr.push(inputPlace.value[i]);
        };

        for (let k = 0; k < arrOfStr.length; k++) {
            if (arrOfStr[k] == floatingDot) {
                count++;
            }
        };

        if (count > 0) { 
            return emptyValue
        };
    };

    if (inputPlace.value[0] == plusSign) {
        inputPlace.value = inputPlace.value.substr(1);
    };

    if (thisValue == openingBracket) {
        openingBracketCount++;
    } else if (thisValue == closingBracket) {
        closingBracketCount++;
    };

    if (inputPlace.value == nanValue) {
        inputPlace.value == emptyValue;
    };

    if (inputPlace.value.length > maxLength) {}
    else if (!collectionOfNumbers.includes(thisValue) && lastValue == floatingDot) {}
    else if (thisValue == closingBracket && closingBracketCount > openingBracketCount) closingBracketCount--
    else if (thisValue == openingBracket && !collectionOfOperators.includes(lastValue) && lastValue != openingBracket) openingBracketCount--
    else if (thisValue == closingBracket && lastValue == openingBracket) closingBracketCount--
    else if (thisValue == openingBracket && lastValue == closingBracket) openingBracketCount--
    else if (collectionOfNumbers.includes(lastValue) && thisValue == openingBracket) openingBracketCount--
    else if (thisValue == closingBracket && !collectionOfNumbers.includes(lastValue) && lastValue != closingBracket) closingBracketCount--
    else if (thisValue == floatingDot && lastValue == closingBracket) {}
    else if (lastValue == closingBracket && collectionOfNumbers.includes(thisValue)) openingBracketCount--
    else if (lastValue == openingBracket && defaultOperators.includes(thisValue)) {}
    else if (inputPlace.value == emptyValue && thisValue != minusSign && thisValue != floatingDot && thisValue != openingBracket && !collectionOfNumbers.includes(thisValue)) {}
    else if (collectionOfOperators.includes(thisValue) && collectionOfOperators.includes(lastValue)) {
        inputPlace.value = inputPlace.value.substr(0, inputPlace.value.length - 1);
        inputPlace.value += thisValue;
    } else inputPlace.value += thisValue;

    if (closingBracketCount === openingBracketCount) {
        openingBracketCount = 0;
        closingBracketCount = 0;
    };
};

function equal() {
    if (inputPlace.value == emptyValue && inputPlace.placeholder == defaultExpression) {
        return emptyValue
    };

    if (inputPlace.value == emptyValue) {
        inputPlace.value = inputPlace.placeholder;
    };

    let input = inputPlace.value;
    let revPolsNot = [];
    let stack = [];

    let arr = [];
    let newArr = [];

    let fromStackOut = emptyValue;

    let inputLength = input.length - 1;

    for (let i = 0; i < input.length; i++) {
        if (input[i] == openingBracket && input[i+1] == minusSign) {
            input = input.substr(0, i + 1) + zeroValue +  input.substr(i + 1);
        };
    };

    if (openingBracketCount != 0 && openingBracketCount != closingBracketCount) { 
        expressionError.showPopover()
        return emptyValue
    };

    if (input[0] == minusSign) {
        arr.push(zeroValue);
        arr.push(spaceValue);
    };

    if (collectionOfOperators.includes(input[inputLength])) {
        input = input.substr(0, inputLength);
    };

    if (inputPlace.value == minusSign) return emptyValue;

    for (let i = 0; i < input.length; i++) {
        arr.push(input[i]);
        if (!collectionOfNumbersWithDot.includes(input[i + 1]) && i < inputLength) {
            arr.push(spaceValue);
        } else if (!collectionOfNumbersWithDot.includes(input[i]) && collectionOfNumbersWithDot.includes(input[i + 1]) && i < inputLength) {
            arr.push(spaceValue);
        };
    };

    newArr = arr.join(emptyValue).split(spaceValue);

    for (let i = 0; i < newArr.length; i++) {
        const char = newArr[i];

        if (regCollectionOfNumbers.test(char)) {
            revPolsNot.push(char);
        } else if (char == openingBracket) {
            stack.push(char);
        } else if (char == closingBracket) {
            let fromStack = stack.pop();

            for (let i = stack.length; fromStack != (openingBracket) && i > 0; i--) {
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

    inputPlace.value = emptyValue;

    inputPlace.placeholder = Number(Number(res).toFixed(3));
};

function clear() {
    if (inputPlace.value[inputPlace.value.length - 1] == openingBracket) {
        openingBracketCount--;
    } else if (inputPlace.value[inputPlace.value.length - 1] == closingBracket) {
        closingBracketCount--;
    }

    inputPlace.value = inputPlace.value.substr(0, inputPlace.value.length - 1);
    inputPlace.placeholder = defaultExpression;
};

function clearAll() {
    openingBracketCount = 0;
    closingBracketCount = 0;
    inputPlace.value = emptyValue;
    inputPlace.placeholder = defaultExpression;
};

function changeSign() {
    if (inputPlace.value == emptyValue && inputPlace.placeholder == defaultExpression) return emptyValue;

    if (inputPlace.value == emptyValue) {
        inputPlace.value = inputPlace.placeholder;
    };

    if (inputPlace.value != emptyValue) {
        for (let i = inputPlace.value.length - 1; !collectionOfOperators.includes(inputPlace.value[i]) && i >= 0; i--) {
            switch (inputPlace.value[i-1]) {
                case plusSign: 
                    inputPlace.value = inputPlace.value.substr(0, i - 1) + minusSign + inputPlace.value.substr(i);
                    break;
                case minusSign: 
                    inputPlace.value = inputPlace.value.substr(0, i - 1) + plusSign + inputPlace.value.substr(i);
                    break;
                case multiSign: 
                    inputPlace.value = inputPlace.value.substr(0, i) + openingBracket + minusSign + inputPlace.value.substr(i) + closingBracket;
                    break;
                case divisionSign: 
                    inputPlace.value = inputPlace.value.substr(0, i) + openingBracket + minusSign + inputPlace.value.substr(i) + closingBracket;
                    break;
                case remainderSign: 
                    inputPlace.value = inputPlace.value.substr(0, i) + openingBracket + minusSign + inputPlace.value.substr(i) + closingBracket;
                    break;
                case openingBracket: 
                    inputPlace.value = inputPlace.value.substr(0, i) + minusSign + inputPlace.value.substr(i);
                    break;
            }

            if (collectionOfNumbers.includes(inputPlace.value[0]) && i == 0) {
                inputPlace.value = minusSign + inputPlace.value.substr(0);
            }
        };

        for (let k = 0; k < inputPlace.value.length; k++) {
            if (inputPlace.value[k] == openingBracket && inputPlace.value[k+1] == plusSign) {
                inputPlace.value = inputPlace.value.substr(0, k) + inputPlace.value.slice(k + 2, inputPlace.value.length - 1);
            };
        };

        if (inputPlace.value[0] == plusSign) {
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
