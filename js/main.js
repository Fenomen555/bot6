document.addEventListener("DOMContentLoaded", function() {
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
  let fixedSignalValue = 1.00; // Default value

  // Open settings modal
  settingsButton.onclick = function() {
    settingsModal.style.display = 'flex';
  };

  // Close settings modal
  closeSettingsButton.onclick = function() {
    settingsModal.style.display = 'none';
  };

  // Apply settings
  applySettingsButton.onclick = function() {
    signalMode = modeSelect.value;
    if (signalMode === 'fixed') {
      fixedSignalValue = parseFloat(fixedSignalInput.value) || 1.00;
    }
    settingsModal.style.display = 'none';
    toggleFixedSettings(signalMode === 'fixed');
  };

  // Toggle fixed settings visibility
  function toggleFixedSettings(show) {
    fixedSettings.classList.toggle("hidden", !show);
  }

  // Generate random signal value
  function getRandomFloat(min, max, decimals) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
  }

  // Timer for "GET SIGNAL" button
  function goTimer(time) {
    const timer = setInterval(() => {
      if (time >= 1) {
        getSignalTwo.classList.remove("hidden");
        getSignal.classList.add("hidden");
        getSignalTwo.style.zIndex = "5";
        stopProgress.style.animation = "animateProgress 60s linear infinite";
        stopSignalTimeBlock.classList.remove("hidden");
        const timerElement = document.getElementById("stop-timer");
        let seconds = time;
        timerElement.innerText = `${seconds} seconds`;
        const interval = setInterval(() => {
          seconds--;
          timerElement.innerText = `${seconds} seconds`;
          if (seconds <= 0) {
            clearInterval(interval);
            getSignal.classList.remove("hidden");
            getSignalTwo.classList.add("hidden");
            stopSignalTimeBlock.classList.add("hidden");
            stopProgress.style.animation = "none";
          }
        }, 1000);
      } else {
        errorNotification.style.display = 'block';
        textError.textContent = "Wait for the time to expire";
        errorProgress.style.animation = "animateProgress 60s linear infinite";
        setTimeout(() => {
          errorNotification.style.display = 'none';
        }, 5000); // Error notification disappears after 5 seconds
      }
    }, 1000);
  }

  // Event listener for GET SIGNAL button
  getSignal.onclick = function() {
    if (signalMode === 'random') {
      printSignal.innerText = `Random Signal Value: ${getRandomFloat(1.00, 2.00, 2)}`;
    } else if (signalMode === 'fixed') {
      printSignal.innerText = `Fixed Signal Value: ${fixedSignalValue}`;
    }
    goTimer(60); // Start timer with 60 seconds
  };

  // Event listener for error exit button
  errorExit.onclick = function() {
    errorNotification.style.display = 'none';
  };

  // Initial settings
  toggleFixedSettings(signalMode === 'fixed');
});
