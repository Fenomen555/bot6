document.addEventListener("DOMContentLoaded", function() {
  const getSignal = document.getElementById("get-signal");
  const getSignalTwo = document.getElementById("get-signal-two");
  const stopSignalTimeBlock = document.getElementById("stop-signal-time-block");
  const printSignal = document.getElementById("print-signal");
  const stopTimer = document.getElementById("stop-timer");
  const stopProgressInner = document.getElementById("stop-progress-inner");
  const errorNotification = document.getElementById("error-notification");
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
  function go
