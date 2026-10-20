const EndGameModal = (() => {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const finalTimeLabel = document.getElementById('final-time');
  const teamInput = document.getElementById('team-input');
  const cancelModalBtn = document.getElementById('cancel-modal');
  const submitModalBtn = document.getElementById('submit-modal');

  let onCancelCallback = null;
  let onSubmitCallback = null;
  let pausedElapsed = 0;

  const open = (finalMs) => {
    pausedElapsed = finalMs;
    finalTimeLabel.textContent = `Time: ${Timer.formatTime(finalMs)}`;
    modalBackdrop.style.display = 'flex';
    teamInput.value = '';
    teamInput.focus();
  };

  const close = () => {
    modalBackdrop.style.display = 'none';
  };

  const setOnCancel = (callback) => {
    onCancelCallback = callback;
  };

  const setOnSubmit = (callback) => {
    onSubmitCallback = callback;
  };

  const init = () => {
    cancelModalBtn.addEventListener('click', () => {
      close();
      if (onCancelCallback) onCancelCallback();
    });

    submitModalBtn.addEventListener('click', () => {
      const team = teamInput.value.trim();
      if (!team) {
        alert('Please enter a team name.');
        return;
      }
      if (onSubmitCallback) onSubmitCallback(team, pausedElapsed);
    });
  };

  return {
    open,
    close,
    setOnCancel,
    setOnSubmit,
    init,
  };
})();
