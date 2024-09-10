import { emptyValue } from './constants/empty.js';

const historyOperations = document.querySelector('.history-operations');

export function historyUpdate() {
    if (localStorage.length === 0) {
        historyOperations.innerHTML = 'Operation history is empty';
    } else if (localStorage.getItem('operations') !== null) {
        let operations = JSON.parse(localStorage.getItem('operations'));
        historyOperations.innerHTML = emptyValue;
        for (let i = 0; i < operations.length; i++) {
            historyOperations.insertAdjacentHTML('beforeend', `<p>${operations[i]}</p>`)
        };
    } else {
        historyOperations.innerHTML = 'Operation history is empty';
    };
};
