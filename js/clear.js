import { localStorageMethods } from './history.js'

const clearHistoryBtn = document.querySelector('.clear-btn');

function clearHistory() {
    localStorageMethods.delete('operations');
};

clearHistoryBtn.addEventListener("click", clearHistory);
