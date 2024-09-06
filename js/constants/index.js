export const collectionOfNumbers = ['0','1','2','3','4','5','6','7','8','9'];
export const collectionOfNumbersWithDot = [...collectionOfNumbers,'.'];
export const collectionOfOperators = ['+', '-', '*', '/', '%'];

export const openingParenthesis = '(';
export const closingParenthesis = ')';

export const operators = {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1,
    '%': 1
};

export const operatorsWithExpressions = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '%': (a, b) => a % b
};
