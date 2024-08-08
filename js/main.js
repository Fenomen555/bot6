const getSignal = document.getElementById("get-signal"),
      getSignalTwo = document.getElementById("get-signal-two"),
      printSignal = document.getElementById("print-signal"),
      stopSignalTimeBlock = document.getElementById("stop-signal-time-block"),
      stopProgress = document.getElementById("stop-progress"),
      errorNotification = document.getElementById("error-notification"),
      errorProgress = document.getElementById("error-progress"),
      textError = document.getElementById("text-error"),
      errorExit = document.getElementById("error-exit"),
      settingsButton = document.getElementById("settings-button"),
      settingsModal = document.getElementById("settings-modal"),
      applySettingsButton = document.getElementById("apply-settings"),
      closeSettingsButton = document.getElementById("close-settings"),
      modeSelect = document.getElementById("mode-select"),
      fixedSettings = document.getElementById("fixed-settings"),
      fixedSignalInput = document.getElementById("fixed-signal");

let signalMode = "random"; // Дефолтный режим
let fixedSignal = null;

function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

function goTimer(time) {
  const timer = setInterval(() => {
    if (time >= 1) {
      getSignalTwo.classList.remove("deactivate");
      getSignal.classList.add("deactivate");
      getSignalTwo.style["z-index"] = "5";
      stopProgress.style.animation = "animateProgress 60s linear infinite";
      stopSignalTimeBlock.classList.remove("deactivate");
      document.getElementById("stop-timer").innerHTML = time-- + "<span> seconds</span>";
      getSignal.disabled = true;
    } else {
      getSignalTwo.classList.add("deactivate");
      getSignal.classList.remove("deactivate");
      getSignalTwo.style["z-index"] = "-1";
      stopSignalTimeBlock.classList.add("deactivate");
      stopProgress.style.animation = "none";
      clearInterval(timer);
      getSignal.disabled = false;
    }
  }, 1000);
}

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
      errorNotification.classList.add("deactivate");
    }
  }, 1000);

  errorExit.onclick = function() {
    errorNotification.classList.add("deactivate");
    errorNotification.style.transform = "translateY(-99px)";
    errorProgress.style.animation = "none";
    clearInterval(timer);
  };
}

getSignal.onclick = function() {
  let receivingSignal;
  if (signalMode === "fixed" && fixedSignal !== null) {
    receivingSignal = fixedSignal;
  } else {
    receivingSignal = getRandomFloat(1, 3.99, 2);
    if (receivingSignal.toString().length === 3) {
      receivingSignal += "0";
    } else if (receivingSignal.toString().length === 1) {
      receivingSignal += ".00";
    }
  }
  printSignal.innerHTML = `${receivingSignal}x`;
  printSignal.classList.remove("deactivate");
  goTimer(60);
  getSignal.disabled = true;
};

getSignalTwo.onclick = function() {
  getSignalTwo.disabled = true;
  goTimerError(5);
};

// Настройка кнопки
settingsButton.onclick = function() {
  settingsModal.style.display = "flex";
};

applySettingsButton.onclick = function() {
  signalMode = modeSelect.value;
  fixedSignal = signalMode === "fixed" ? parseFloat(fixedSignalInput.value) : null;
  settingsModal.style.display = "none";
};

closeSettingsButton.onclick = function() {
  settingsModal.style.display = "none";
};
