// ═══════════════════════════════════════════════════════
//  FEEDBACK BAR
// ═══════════════════════════════════════════════════════
function showFeedback(correct, sub) {
  const bar = document.getElementById('feedback-bar');
  bar.className = 'feedback-bar show ' + (correct ? 'correct-fb' : 'wrong-fb');
  document.getElementById('fb-icon').textContent = correct ? '✅' : '❌';
  document.getElementById('fb-msg').textContent  = correct ? 'Brilliant! 🎉' : 'Not quite…';
  document.getElementById('fb-sub').textContent  = sub;
  document.getElementById('fb-btn').textContent  = correct ? 'Continue →' : 'Got it';
  document.getElementById('fb-btn').style.background = correct ? 'var(--green)' : 'var(--red)';
}

function closeFeedback() {
  document.getElementById('feedback-bar').classList.remove('show');
}

// ═══════════════════════════════════════════════════════
//  XP FLOATING POP
// ═══════════════════════════════════════════════════════
function showXPPop(text) {
  const pop       = document.getElementById('xp-pop');
  pop.textContent = text;
  pop.style.left  = Math.random() * 60 + 20 + '%';
  pop.style.top   = '60%';
  pop.className   = 'xp-pop';
  void pop.offsetWidth; // force reflow
  pop.classList.add('animate');
}

// ═══════════════════════════════════════════════════════
//  MASCOT
// ═══════════════════════════════════════════════════════
function animateMascot(emoji, speech) {
  const m       = document.getElementById('mascot');
  m.textContent = emoji;
  m.classList.add('bounce');
  document.getElementById('mascot-speech').textContent = speech;
  setTimeout(() => m.classList.remove('bounce'), 600);
}
