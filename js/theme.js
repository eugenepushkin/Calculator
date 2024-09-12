import { localStorageMethods } from './history.js'

const selectForm = document.querySelector('.theme-select');
const body = document.querySelector('body');
const selectDarkTheme = selectForm[1];

function themeChanger() {
    localStorageMethods.delete('theme');
    localStorageMethods.setTheme('theme', `${selectForm.value}`);
    if (localStorage.theme === 'dark-theme') body.classList.add('dark');
    else body.classList.remove('dark');
    if (localStorage.theme === 'dark-theme') {
        selectDarkTheme.selected = true;
    };
};

selectForm.addEventListener("click", themeChanger);
