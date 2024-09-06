import { arrNums, arrAll, operatorsAll } from './constants.js'

const inputPlace = document.querySelector("input");
const plusMinusBtn = document.querySelector('.plus-minus');
const clearBtn = document.querySelector('.clear');
const equalBtn = document.querySelector('.equal');
const clearAllBtn = document.querySelector('.clear-all');
const zero = document.querySelector('.zero');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const four = document.querySelector('.four');
const five = document.querySelector('.five');
const six = document.querySelector('.six');
const seven = document.querySelector('.seven');
const eight = document.querySelector('.eight');
const nine = document.querySelector('.nine');
const remainder = document.querySelector('.remainder');
const division = document.querySelector('.division');
const mult = document.querySelector('.mult');
const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const open = document.querySelector('.open');
const close = document.querySelector('.close');
const dot = document.querySelector('.dot');


document.onkeypress = function (event) {
    if (event.keyCode == '48') zero.click()
    else if (event.keyCode == '49') one.click()
    else if (event.keyCode == '50') two.click()
    else if (event.keyCode == '51') three.click()
    else if (event.keyCode == '52') four.click()
    else if (event.keyCode == '53') five.click()
    else if (event.keyCode == '54') six.click()
    else if (event.keyCode == '55') seven.click()
    else if (event.keyCode == '56') eight.click()
    else if (event.keyCode == '57') nine.click()
    else if (event.keyCode == '46') dot.click()
    else if (event.keyCode == '13') equalBtn.click()
    else if (event.keyCode == '45') minus.click()
    else if (event.keyCode == '43') plus.click()
    else if (event.keyCode == '42') mult.click()
    else if (event.keyCode == '47') division.click()
    else if (event.keyCode == '37') remainder.click()
    else if (event.keyCode == '40') open.click()
    else if (event.keyCode == '41') close.click()
}

let openPar = 0;
let closePar = 0;

function updateInput() {
    let maxLength = 30;

    if (inputPlace.value == '' && operatorsAll.includes(this.textContent) && inputPlace.placeholder != 'Введите выражение') {
        inputPlace.value = inputPlace.placeholder
    }

    if (this.textContent == '.' && inputPlace.value != '') {
        let count = 0;
        let arrOfStr = [];

        for (let i = inputPlace.value.length - 1; !operatorsAll.includes(inputPlace.value[i]) && i > 0; i--) {
            arrOfStr.push(inputPlace.value[i])
        };

        for (let k = 0; k < arrOfStr.length; k++) {
            if (arrOfStr[k] == '.') {
                count++
            }
        } 

        if (count > 0) { 
            return '' 
        }
    }

    if (inputPlace.value[0] == '+') {
        inputPlace.value = inputPlace.value.substr(1)
    }

    if (this.textContent == '(') {
        openPar++
    }     
    else if (this.textContent == ')') {
        closePar++
    }

    if (inputPlace.value == 'NaN') {
        inputPlace.value == ''
    }

    if (inputPlace.value.length > maxLength) {}
    else if (!arrNums.includes(this.textContent) && inputPlace.value[inputPlace.value.length - 1] == '.') {}
    else if (this.textContent == ')' && closePar > openPar) closePar--
    else if (this.textContent == '(' && !operatorsAll.includes(inputPlace.value[inputPlace.value.length - 1]) && inputPlace.value[inputPlace.value.length - 1] != '(') openPar--
    else if (this.textContent == ')' && inputPlace.value[inputPlace.value.length - 1] == '(') closePar--
    else if (this.textContent == '(' && inputPlace.value[inputPlace.value.length - 1] == ')') openPar--
    else if (this.textContent == '(' && arrNums.includes(inputPlace.value[inputPlace.value.length - 1])) openPar--
    else if (this.textContent == ')' && !arrNums.includes(inputPlace.value[inputPlace.value.length - 1]) && inputPlace.value[inputPlace.value.length - 1] != ')') closePar--
    else if (this.textContent == '.' && inputPlace.value[inputPlace.value.length - 1] == ')') {}
    else if (inputPlace.value[inputPlace.value.length - 1] == ')' && arrNums.includes(this.textContent)) openPar--
    else if (inputPlace.value[inputPlace.value.length - 1] == '(' && ['+', '*', '/', '%'].includes(this.textContent)) {}
    else if (inputPlace.value == '' && this.textContent != '-' && this.textContent != '.' && this.textContent != '(' && !arrNums.includes(this.textContent)) {}
    else if (arrNums.includes(inputPlace.value[inputPlace.value.length - 1]) && this.textContent == '(') {}
    else if (operatorsAll.includes(this.textContent) && operatorsAll.includes(inputPlace.value[inputPlace.value.length - 1])) {
        inputPlace.value = inputPlace.value.substr(0, inputPlace.value.length - 1);
        inputPlace.value += this.textContent;
    }
    else inputPlace.value += this.textContent;

    if (closePar == openPar) {
        openPar = 0;
        closePar = 0;
    }
};

function equal() {
    if (inputPlace.value == '' && inputPlace.placeholder == 'Введите выражение') {
        return ''
    }

    if (inputPlace.value == '') {
        inputPlace.value = inputPlace.placeholder
    }

    let input = inputPlace.value;
    let revPolsNot = [];
    let stack = [];

    const operators = {
        '+': 0,
        '-': 0,
        '*': 1,
        '/': 1,
        '%': 1
    };

    let arr = [];
    let newArr = [];

    for (let i = 0; i < input.length; i++) {
        if (input[i] == '(' && input[i+1] == '-') {
            input = input.substr(0, i + 1) + '0' +  input.substr(i + 1)
        }
    }

    if (openPar != 0 && closePar != 0 && openPar != closePar) { 
        alert('Закончите выражение!')
        return ''
    }

    if (input[0] == '-') {
        arr.push('0');
        arr.push(' ');
    }

    if (operatorsAll.includes(input[input.length - 1])) {
        input = input.substr(0, input.length - 1)
    }

    if (inputPlace.value == '-') {return ''}

    for (let i = 0; i < input.length; i++) {
        arr.push(input[i]);
        if (!arrAll.includes(input[i + 1]) && i < input.length - 1) {
            arr.push(' ')
        } else if (!arrAll.includes(input[i]) && arrAll.includes(input[i + 1]) && i < input.length - 1) {
            arr.push(' ')
        }
    }

    newArr = arr.join('').split(' ');

    for (let i = 0; i < newArr.length; i++) {
        const char = newArr[i];

        if (/[0-9]/.test(char)) {
            revPolsNot.push(char);
        } else if (char == '(') {
            stack.push(char);
        } else if (char == ')') {
            let fromStack = stack.pop();

            while (fromStack != ('(')) {
                revPolsNot.push(fromStack);
                fromStack = stack.pop();
            };
        } else if (Object.keys(operators).includes(char)) {
            while (operators[stack.slice(-1)] >= operators[char]) {
                revPolsNot.push(stack.pop());
            };

            stack.push(char);
        };
    };

    let fromStackOut = '';

    while (fromStackOut = stack.pop()) {
        revPolsNot.push(fromStackOut);
    };

    function rpnToNormal(expression) {
        const stack = [];

        const operators = {
          '+': (a, b) => a + b,
          '-': (a, b) => a - b,
          '*': (a, b) => a * b,
          '/': (a, b) => a / b,
          '%': (a, b) => a % b
        };

        for (let token of expression) {
            if (isNumber(token)) {
                stack.push(parseFloat(token));
            } else {
                const operand2 = stack.pop();
                const operand1 = stack.pop();
                const operator = operators[token];
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

    inputPlace.placeholder = +res.toFixed(3);
};

function clear() {
    if (inputPlace.value[inputPlace.value.length - 1] == '(') {
        openPar--
    } else if (inputPlace.value[inputPlace.value.length - 1] == ')') {
        closePar--
    }

    inputPlace.value = inputPlace.value.substr(0, inputPlace.value.length - 1)
    inputPlace.placeholder = 'Введите выражение';
};

function clearAll() {
    openPar = 0;
    closePar = 0;
    inputPlace.value = '';
    inputPlace.placeholder = 'Введите выражение';
};

function changeSign() {
    if (inputPlace.value == '') {
        inputPlace.value = inputPlace.placeholder
    }    

    if (inputPlace.value =='' && inputPlace.placeholder == 'Введите выражение') return ''

    if (inputPlace.value != '') {
        for (let i = inputPlace.value.length - 1; !operatorsAll.includes(inputPlace.value[i]) && i >= 0; i--) {
            if (inputPlace.value[i-1] == '+') {
                inputPlace.value = inputPlace.value.substr(0, i - 1) + '-' + inputPlace.value.substr(i)
            } else if (inputPlace.value[i-1] == '-') {
                inputPlace.value = inputPlace.value.substr(0, i - 1) + '+' + inputPlace.value.substr(i)
            } else if (inputPlace.value[i-1] == '*') {
                inputPlace.value = inputPlace.value.substr(0, i) + '(-' + inputPlace.value.substr(i) + ')'
            } else if (inputPlace.value[i-1] == '/') {
                inputPlace.value = inputPlace.value.substr(0, i) + '(-' + inputPlace.value.substr(i) + ')'
            } else if (inputPlace.value[i-1] == '%') {
                inputPlace.value = inputPlace.value.substr(0, i) + '(-' + inputPlace.value.substr(i) + ')'
            }  else if (inputPlace.value[i-1] == '(') {
                inputPlace.value = inputPlace.value.substr(0, i) + '-' + inputPlace.value.substr(i)
            } else if (arrNums.includes(inputPlace.value[0]) && i == 0) {
                inputPlace.value = '-' + inputPlace.value.substr(0)
            }
        };

        for (let k = 0; k < inputPlace.value.length; k++) {
            if (inputPlace.value[k] == '(' && inputPlace.value[k+1] == '+') {
                inputPlace.value = inputPlace.value.substr(0, k) + inputPlace.value.slice(k + 2, inputPlace.value.length - 1)
            }
        }

        if (inputPlace.value[0] == '+') {
            inputPlace.value = inputPlace.value.substr(1)
        }
    }
}

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
    mult.addEventListener("click", updateInput);
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
