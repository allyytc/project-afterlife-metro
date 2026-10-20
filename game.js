(() => {
  const overlay = document.getElementById('fade-overlay');
  const timerDisplay = document.getElementById('timer-display');
  const pauseBtn = document.getElementById('pause-btn');

  PauseMenu.init();

  PauseMenu.setOnResume(() => {
    Timer.resume((ms) => {
      timerDisplay.textContent = Timer.formatTime(ms);
    });
  });

  PauseMenu.setOnQuit(() => {
    window.location.href = 'homescreen.html';
  });

  // The overlay fades out, then the run timer starts.
  overlay.addEventListener('animationend', () => {
    overlay.remove();
    Timer.start((ms) => {
      timerDisplay.textContent = Timer.formatTime(ms);
    });
  });

  pauseBtn.addEventListener('click', () => {
    if (!PauseMenu.isPausedState()) {
      Timer.pause();
      PauseMenu.open();
    }
  });

  // If the fade animation never fires, drop the overlay so it cannot block input.
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (overlay.isConnected) {
        overlay.remove();
        Timer.start((ms) => {
          timerDisplay.textContent = Timer.formatTime(ms);
        });
      }
    }, 3500);
  });

  // end_of_game_area.gd posts { type: 'gameCompleted' } to this page.
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'gameCompleted') {
      const finalTime = Timer.pause();
      sessionStorage.setItem('gameTime', finalTime);
      (async () => {
        const origin = window.location.origin || (window.location.protocol + '//' + window.location.host);
        const candidates = [origin + '/thankyou.html', origin + '/Afterlife-Metro/thankyou.html'];
        for (const url of candidates) {
          try {
            const res = await fetch(url, { method: 'HEAD' });
            if (res.ok) { window.location.href = url; return; }
          } catch (e) {}
        }
        window.location.href = candidates[0];
      })();
    }
  });

  // portal.gd calls window.parent.completeGame() instead of postMessage.
  const gameFrame = document.getElementById('game-frame');
  if (gameFrame) {
    gameFrame.addEventListener('load', () => {
      window.completeGame = () => {
        const finalTime = Timer.pause();
        sessionStorage.setItem('gameTime', finalTime);
        (async () => {
          const origin = window.location.origin || (window.location.protocol + '//' + window.location.host);
          const candidates = [origin + '/thankyou.html', origin + '/Afterlife-Metro/thankyou.html'];
          for (const url of candidates) {
            try {
              const res = await fetch(url, { method: 'HEAD' });
              if (res.ok) { window.location.href = url; return; }
            } catch (e) {}
          }
          window.location.href = candidates[0];
        })();
      };
    });
  }
})();
