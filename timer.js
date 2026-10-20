const Timer = (() => {
  let startTime = null;
  let elapsedBeforePause = 0;
  let timerId = null;
  let isRunning = false;

  const formatTime = (ms) => {
    const totalMs = Math.max(0, Math.floor(ms));
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const millis = totalMs % 1000;
    const pad = (n, width) => String(n).padStart(width, '0');
    return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(millis, 3)}`;
  };

  const getElapsed = () => {
    if (!isRunning || startTime === null) return elapsedBeforePause;
    return (performance.now() - startTime) + elapsedBeforePause;
  };

  const start = (onTick) => {
    if (isRunning) return;
    isRunning = true;
    startTime = performance.now();
    timerId = window.setInterval(() => {
      onTick(getElapsed());
    }, 100);
  };

  const pause = () => {
    if (!isRunning) return elapsedBeforePause;
    const total = getElapsed();
    isRunning = false;
    elapsedBeforePause = total;
    if (timerId) window.clearInterval(timerId);
    timerId = null;
    return total;
  };

  const resume = (onTick) => {
    start(onTick);
  };

  const reset = () => {
    if (timerId) window.clearInterval(timerId);
    startTime = null;
    elapsedBeforePause = 0;
    timerId = null;
    isRunning = false;
  };

  return {
    formatTime,
    getElapsed,
    start,
    pause,
    resume,
    reset,
  };
})();
