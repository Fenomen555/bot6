document.addEventListener("DOMContentLoaded", () => {
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

  let signalMode = "random"; // Default mode
  let fixedSignal = null;

  function updateFixedSettingsVisibility() {
    fixedSettings.classList.toggle("hidden", signalMode !== "fixed");
  }

  function startTimer(time, onTick, onComplete) {
    const timer = setInterval(() => {
      if (time >= 1) {
        onTick(time--);
      } else {
        clearInterval(timer);
        onComplete();
      }
    }, 1000);
  }

  function goTimer(time) {
    startTimer(time, (remainingTime) => {
      getSignalTwo.classList.remove("hidden");
      getSignal.classList.add("hidden");
      getSignalTwo.style.zIndex = "5";
      stopProgress.style.animation = "animateProgress 60s linear infinite";
      stopSignalTimeBlock.classList.remove("hidden");
      document.getElementById("stop-timer").innerHTML = remainingTime + "<span> seconds</span>";
      getSignal.disabled = true;
    }, () => {
      getSignalTwo.classList.add("hidden");
      getSignal.classList.remove("hidden");
      getSignalTwo.style.zIndex = "-1";
      stopSignalTimeBlock.classList.add("hidden");
      stopProgress.style.animation = "none";
      getSignal.disabled = false;
    });
  }

  function goTimerError(time) {
    startTimer(time, (remainingTime) => {
      errorNotification.classList.remove("hidden");
      textError.innerHTML = "Wait for the time to expire";
      errorProgress.style.animation = "animateErrorProgress 5s linear infinite";
      errorNotification.style.transform = "translateY(0px)";
    }, () => {
      errorNotification.style.transform = "translateY(-99px)";
      errorProgress.style.animation = "none";
      errorNotification.classList.add("hidden");
    });

    errorExit.onclick = () => {
      errorNotification.classList.add("hidden");
      errorNotification.style.transform = "translateY(-99px)";
      errorProgress.style.animation = "none";
    };
  }

  getSignal.onclick = () => {
    const receivingSignal = signalMode === "fixed" ? fixedSignal : getRandomFloat(1, 3.99, 2);
    printSignal.innerHTML = `${receivingSignal.toFixed(2)}x`;
    printSignal.classList.remove("hidden");
    goTimer(60);
    getSignal.disabled = true;
  };

  getSignalTwo.onclick = () => {
    getSignalTwo.disabled = true;
    goTimerError(5);
  };

  settingsButton.onclick = () => {
    settingsModal.classList.remove("hidden");
  };

  applySettingsButton.onclick = () => {
    signalMode = modeSelect.value;
    fixedSignal = signalMode === "fixed" ? parseFloat(fixedSignalInput.value) : null;
    updateFixedSettingsVisibility();
    settingsModal.classList.add("hidden");
  };

  closeSettingsButton.onclick = () => {
    settingsModal.classList.add("hidden");
  };

  modeSelect.onchange = updateFixedSettingsVisibility;

  function getRandomFloat(min, max, decimals) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
  }
});
