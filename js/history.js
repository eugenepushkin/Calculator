import { emptyValue } from './constants/empty.js';

const historyOperations = document.querySelector('.history-operations');

export const localObjectMethods = {
    get() {
        return localStorage.getItem('operations')
    },

    set(elem) {
        return localStorage.setItem(`operations`, `["${elem}"]`)
    }
}

export function historyUpdate() {
    if (localStorage.length === 0) {
        historyOperations.innerHTML = 'Operation history is empty';
    } else if (localObjectMethods.get() !== null) {
        let operations = JSON.parse(localObjectMethods.get());
        historyOperations.innerHTML = emptyValue;
        for (let i = 0; i < operations.length; i++) {
            historyOperations.insertAdjacentHTML('beforeend', `<p>${operations[i]}</p>`)
        };
    } else {
        historyOperations.innerHTML = 'Operation history is empty';
    };
};
