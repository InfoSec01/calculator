let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

// Normalize Unicode symbols from HTML buttons to standard math operators
function normalizeOperator(symbol) {
    switch (symbol) {
        case '＋': return '+';
        case '−': return '-';
        case '×': return '*';
        case '÷': return '/';
        case '＝': return '=';
        case '←': return 'backspace';
        default: return symbol;
    }
}

function buttonClick(value) {
    const symbol = normalizeOperator(value);
    if (isNaN(symbol)) {
        handleSymbol(symbol);
    } else {
        handleNumber(symbol);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) return;
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(symbol);
            break;
        case 'backspace':
            if (buffer.length === 1 || (buffer.length === 2 && buffer.startsWith('-'))) {
                buffer = '0';
            } else {
                buffer = buffer.slice(0, -1);
            }
            break;
    }
}

function handleMath(symbol) {
    const intBuffer = parseFloat(buffer);
    if (isNaN(intBuffer)) return;

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(value) {
    switch (previousOperator) {
        case '+':
            runningTotal += value;
            break;
        case '-':
            runningTotal -= value;
            break;
        case '*':
            runningTotal *= value;
            break;
        case '/':
            runningTotal /= value;
            break;
    }
}

function handleNumber(numStr) {
    if (buffer === "0") {
        buffer = numStr;
    } else {
        buffer += numStr;
    }
}

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function (event) {
            if (event.target.tagName === "BUTTON") {
                buttonClick(event.target.innerText);
            }
        });
}

init();
