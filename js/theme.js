import { localStorageMethods } from './history.js'

const selectForm = document.querySelector('.theme-select');
const body = document.querySelector('body');
const selectDarkTheme = selectForm[1];

if (localStorage.theme === 'dark-theme') {
    selectDarkTheme.selected = true;
};

function themeChanger() {
    localStorageMethods.delete('theme');
    localStorageMethods.setTheme('theme', `${selectForm.value}`);
    isDarkTheme();
    selectForm.click();
};

function isDarkTheme() {
    if (localStorage.theme === 'dark-theme') body.classList.add('dark');
    else body.classList.remove('dark');
}

selectForm.addEventListener("click", themeChanger);
