import { emptyValue } from './constants/empty.js';
import { emptyHistoryExpression } from './constants/expression.js'

const historyOperations = document.querySelector('.history-operations');
const body = document.querySelector('body');

if (localStorage.theme === 'dark-theme') body.classList.add('dark');


export const localStorageMethods = {
    get() {
        return localStorage.getItem('operations')
    },

    set(elem) {
        return localStorage.setItem(`operations`, `["${elem}"]`)
    },

    delete(elem) {
        localStorage.removeItem(elem);
    }
}

export function historyUpdate() {
    if (localStorage.length === 0) {
        historyOperations.innerHTML = emptyHistoryExpression;
    } else if (localStorageMethods.get() !== null) {
        let operations = JSON.parse(localStorageMethods.get());
        historyOperations.innerHTML = emptyValue;
        for (let i = 0; i < operations.length; i++) {
            historyOperations.insertAdjacentHTML('beforeend', `<p>${operations[i]}</p>`)
        };
    } else {
        historyOperations.innerHTML = emptyHistoryExpression;
    };
};
