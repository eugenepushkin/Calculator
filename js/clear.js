const clearHistoryBtn = document.querySelector('.clear-btn');

function clearHistory() {
    localStorage.clear();
};

clearHistoryBtn.addEventListener("click", clearHistory);
