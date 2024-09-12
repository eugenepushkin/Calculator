const selectForm = document.querySelector('.theme-select');
const body = document.querySelector('body');

if (localStorage.theme === 'dark-theme') {
    selectForm[1].selected = true;
};

function themeChanger() {
    localStorage.removeItem('theme');
    localStorage.setItem('theme', `${selectForm.value}`);
    if (localStorage.theme === 'dark-theme') body.classList.add('dark');
    else body.classList.remove('dark');
};

selectForm.addEventListener("click", themeChanger);
