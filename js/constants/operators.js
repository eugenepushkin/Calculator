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

export const collectionOfOperators = ['+', '-', '*', '/', '%'];

export const defaultOperators = ['+', '*', '/', '%'];
