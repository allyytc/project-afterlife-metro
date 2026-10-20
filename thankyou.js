(() => {
  const saveScoreBtn = document.getElementById('save-score-btn');
  let finalGameTime = 0;

  EndGameModal.init();

  // Time arrives as ?time= or as sessionStorage set by the game page.
  const params = new URLSearchParams(window.location.search);
  const timeParam = params.get('time');
  
  if (timeParam) {
    finalGameTime = parseInt(timeParam);
  } else if (sessionStorage.getItem('gameTime')) {
    finalGameTime = parseInt(sessionStorage.getItem('gameTime'));
  }

  saveScoreBtn.addEventListener('click', () => {
    EndGameModal.open(finalGameTime);
  });

  EndGameModal.setOnCancel(() => {
    // Closing the modal stays on this page.
  });

  EndGameModal.setOnSubmit((team, timeMs) => {
    submitScore(team, timeMs);
  });

  const submitScore = async (team, timeMs) => {
    const payload = { team, timeMs, createdAt: new Date().toISOString() };
    try {
      const res = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save score');
      alert('Score saved successfully!');
      EndGameModal.close();
      window.location.href = 'homescreen.html';
    } catch (err) {
      alert('Could not save score. Please try again.');
      console.error(err);
    }
  };
})();
