import { emptyValue } from './constants/empty.js';
import { emptyHistoryExpression } from './constants/expression.js'

const historyOperations = document.querySelector('.history-operations');
const body = document.querySelector('body');

if (localStorage.theme === 'dark-theme') body.classList.add('dark');

export const localStorageMethods = {
    get(key) {
        return localStorage.getItem(key)
    },

    set(key, elem) {
        return localStorage.setItem(key, `["${elem}"]`)
    },

    setTheme(key, elem) {
        return localStorage.setItem(key, elem)
    },

    delete(elem) {
        return localStorage.removeItem(elem);
    }
}

export function historyUpdate() {
    if (localStorage.length === 0) {
        historyOperations.innerHTML = emptyHistoryExpression;
    } else if (localStorageMethods.get(`operations`) !== null) {
        let operations = JSON.parse(localStorageMethods.get(`operations`));
        historyOperations.innerHTML = emptyValue;
        for (let i = 0; i < operations.length; i++) {
            historyOperations.insertAdjacentHTML('beforeend', `<p>${operations[i]}</p>`)
        };
    } else {
        historyOperations.innerHTML = emptyHistoryExpression;
    };
};
