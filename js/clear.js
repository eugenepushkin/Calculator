import { defaultValueLocalStorage } from './constants/local.js';
import { localStorageCount } from './main.js'

const clearHistoryBtn = document.querySelector('.clear-btn');

function clearHistory() {
    localStorage.clear();
    localStorageCount = defaultValueLocalStorage;
};

clearHistoryBtn.addEventListener("click", clearHistory);
