import { regCollectionOfNumbers } from './constants/regular.js';

const historyOperations = document.querySelector('.history-operations');
const defaultValueLocalStorage = 2;

export function historyUpdate() {
    if (localStorage.length === defaultValueLocalStorage) {
        historyOperations.innerHTML = `Operation history is empty`;
    } else {
        historyOperations.innerHTML = ``;
        for (let i = 0; i < localStorage.length - defaultValueLocalStorage; i++) {
            if (regCollectionOfNumbers.test(localStorage[i][0])) {
                historyOperations.insertAdjacentHTML('beforeend', `<p>${localStorage[i]}</p>`)
            } else if (localStorage[i][0] === '-') {
                historyOperations.insertAdjacentHTML('beforeend', `<p>${localStorage[i]}</p>`)
            }
        };
    };
};
