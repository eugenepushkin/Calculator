const historyOperations = document.querySelector('.history-operations');

export function historyUpdate() {
    if (localStorage.length === 0) {
        historyOperations.innerHTML = `Operation history is empty`;
    } else {
        historyOperations.innerHTML = ``;
        for (let i=0; i < localStorage.length; i++) {
            historyOperations.insertAdjacentHTML('beforeend', `<p>${localStorage[i]}</p>`)
        };
    };
};
