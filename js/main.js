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
const applySettingsButton = document.getElementById("apply-settings");
const closeSettingsButton = document.getElementById("close-settings");
const modeSelect = document.getElementById("mode-select");
const fixedSettings = document.getElementById("fixed-settings");
const fixedSignalInput = document.getElementById("fixed-signal");

let signalMode = "random"; // Дефолтный режим
let fixedSignal = null;

// Изначальное состояние скрытых настроек
fixedSettings.classList.toggle("hidden", signalMode !== "fixed");

function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

function goTimer(time) {
  const timer = setInterval(() => {
    if (time >= 1) {
      getSignalTwo.classList.remove("hidden");
      getSignal.classList.add("hidden");
      getSignalTwo.style["z-index"] = "5";
      stopProgress.style.animation = "animateProgress 60s linear infinite";
      stopSignalTimeBlock.classList.remove("hidden");
      document.getElementById("stop-timer").innerHTML = time-- + "<span> seconds</span>";
      getSignal.disabled = true;
    } else {
      getSignalTwo.classList.add("hidden");
      getSignal.classList.remove("hidden");
      getSignalTwo.style["z-index"] = "-1";
      stopSignalTimeBlock.classList.add("hidden");
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
      errorNotification.classList.remove("hidden");
      textError.innerHTML = "Wait for the time to expire";
      errorProgress.style.animation = "animateErrorProgress 5s linear infinite";
      errorNotification.style.transform = "translateY(0px)";
    } else {
      errorNotification.style.transform = "translateY(-99px)";
      errorProgress.style.animation = "none";
      clearInterval(timer);
      errorNotification.classList.add("hidden");
    }
  }, 1000);

  errorExit.onclick = function() {
    errorNotification.classList.add("hidden");
    errorNotification.style.transform = "translateY(-99px)";
    errorProgress.style.animation = "none";
    clearInterval(timer);
  };
}

getSignal.onclick = function() {
  let receivingSignal = signalMode === "fixed" ? fixedSignal : getRandomFloat(1, 3.99, 2);
  receivingSignal = receivingSignal.toFixed(2); // Убедимся, что число имеет два знака после запятой
  printSignal.innerHTML = `${receivingSignal}x`;
  printSignal.classList.remove("hidden");
  goTimer(60);
  getSignal.disabled = true;
};

getSignalTwo.onclick = function() {
  getSignalTwo.disabled = true;
  goTimerError(5);
};

settingsButton.onclick = function() {
  settingsModal.classList.remove("hidden");
};

applySettingsButton.onclick = function() {
  signalMode = modeSelect.value;
  fixedSignal = signalMode === "fixed" ? parseFloat(fixedSignalInput.value) : null;
  fixedSettings.classList.toggle("hidden", signalMode !== "fixed");
  settingsModal.classList.add("hidden");
};

closeSettingsButton.onclick = function() {
  settingsModal.classList.add("hidden");
};

// Отслеживание изменений в выборе режима
modeSelect.onchange = function() {
  fixedSettings.classList.toggle("hidden", modeSelect.value !== "fixed");
};
