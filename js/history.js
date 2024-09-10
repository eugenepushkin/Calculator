import { regCollectionOfNumbers } from './constants/regular.js';
import { defaultValueLocalStorage } from './constants/local.js';
import { emptyValue } from './constants/empty.js';
import { minusSign } from './constants/signs.js';

const historyOperations = document.querySelector('.history-operations');

export function historyUpdate() {
    if (localStorage.length === 0) {
        historyOperations.innerHTML = 'Operation history is empty';
    } else if (localStorage.length > 0) {
        historyOperations.innerHTML = emptyValue;
        for (let i = 0; i < localStorage.length; i++) {
            let firstElem = localStorage[i][0]
            if (regCollectionOfNumbers.test(firstElem)) {
                historyOperations.insertAdjacentHTML('beforeend', `<p>${localStorage[i]}</p>`)
            } else if (firstElem === minusSign) {
                historyOperations.insertAdjacentHTML('beforeend', `<p>${localStorage[i]}</p>`)
            }
        };
    } else {
        historyOperations.innerHTML = 'Operation history is empty';
    };
};
