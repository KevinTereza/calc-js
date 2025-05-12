const main = document.querySelector('main');
const root = document.querySelector(':root');
const calculateInput = document.getElementById('input');
const resultInput = document.getElementById('result');

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "];

const clearBtn = document.getElementById('clear').addEventListener('click', () => {
    calculateInput.value = '';
    resultInput.value = '';
    calculateInput.focus();
})

document.querySelectorAll('.charKey').forEach((charKeyBtn) => {
    charKeyBtn.addEventListener('click', () => {
        const value = charKeyBtn.dataset.value;
        calculateInput.value += value;
    })
})

calculateInput.addEventListener('keydown', (ev) => {
    ev.preventDefault();
    if (allowedKeys.includes(ev.key)) {
        calculateInput.value += ev.key;
        return
    }
    if (ev.key === 'Backspace') {
        calculateInput.value = calculateInput.value.slice(0, -1)
    }
    if (ev.key === 'Enter') {
        calculate();
    }
})

const resultBtn = document.getElementById('equal').addEventListener('click', calculate);

function calculate () {
    resultInput.value = 'ERROR';
    resultInput.classList.add('error');
    const result = eval(calculateInput.value);
    resultInput.value = result;
    console.log('Resultado: ' + result);
    resultInput.classList.remove('error');
}

const switchTheme = document.getElementById('themeSwitcher').addEventListener('click', () => {
    if (main.dataset.theme === 'dark') {
        root.style.setProperty("--bg-color", "#f1f5f9")
        root.style.setProperty("--border-color", "#aaa")
        root.style.setProperty("--font-color", "#212529")
        root.style.setProperty("--primary-color", "#26834a")
        main.dataset.theme = "light"
    } else {
        if (main.dataset.theme === 'light') {
            root.style.setProperty("--bg-color", "#212529")
            root.style.setProperty("--border-color", "#666")
            root.style.setProperty("--font-color", "#f1f5f9")
            root.style.setProperty("--primary-color", "#4dff91")
            main.dataset.theme = "dark"
        }
    }
})

const copyBtn = document.getElementById('copyToClipboard').addEventListener('click', (ev) => {
    const btn = ev.currentTarget;
    if (btn.innerText === 'Copy') {
        btn.innerText = 'Copied!';
        btn.classList.add('success');
        navigator.clipboard.writeText(resultInput.value)
    }
})