const PauseMenu = (() => {
  const pauseMenuBackdrop = document.getElementById('pause-menu-backdrop');
  const resumeBtn = document.getElementById('resume-btn');
  const quitBtn = document.getElementById('quit-btn');

  let isPaused = false;
  let onResumeCallback = null;
  let onQuitCallback = null;

  const open = () => {
    if (isPaused) return;
    isPaused = true;
    pauseMenuBackdrop.style.display = 'flex';
  };

  const close = () => {
    pauseMenuBackdrop.style.display = 'none';
    isPaused = false;
    if (onResumeCallback) onResumeCallback();
  };

  const quit = () => {
    if (onQuitCallback) onQuitCallback();
  };

  const setOnResume = (callback) => {
    onResumeCallback = callback;
  };

  const setOnQuit = (callback) => {
    onQuitCallback = callback;
  };

  const init = () => {
    resumeBtn.addEventListener('click', close);
    quitBtn.addEventListener('click', quit);
  };

  const isPausedState = () => isPaused;

  return {
    open,
    close,
    quit,
    setOnResume,
    setOnQuit,
    init,
    isPausedState,
  };
})();
