import { localStorageMethods } from './history.js'

const selectForm = document.querySelector('.theme-select');
const selectDarkTheme = selectForm[1];

if (localStorage.theme === 'dark-theme') {
    selectDarkTheme.selected = true;
};

function isDarkTheme() {
    if (localStorage.theme === 'dark-theme') body.classList.add('dark');
    else body.classList.remove('dark');
}

const body = document.querySelector('body');

function themeChanger() {
    let select = document.querySelector('.theme-select');

    select.addEventListener("change", themeSelect);
}

themeChanger()

function themeSelect() {
    localStorageMethods.delete('theme');
    localStorageMethods.setTheme('theme', `${this.value}`);
    isDarkTheme();
}
