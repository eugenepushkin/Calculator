import { regCollectionOfNumbers } from './constants/regular.js';

const historyOperations = document.querySelector('.history-operations');

export function historyUpdate() {
    if (localStorage.length === 0) {
        historyOperations.innerHTML = `Operation history is empty`;
    } else {
        historyOperations.innerHTML = ``;
        for (let i = 0; i < localStorage.length; i++) {
            if (regCollectionOfNumbers.test(localStorage[i][0]) || localStorage[i][0] === '-') {
                historyOperations.insertAdjacentHTML('beforeend', `<p>${localStorage[i]}</p>`)
            }
        };
    };
};
