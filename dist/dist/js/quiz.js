// ═══════════════════════════════════════════════════════
//  LESSON QUIZ (inline, per-lesson)
// ═══════════════════════════════════════════════════════
function checkAnswer(el, correct) {
  if (quizAnswered) return;
  quizAnswered = true;

  const opts = document.querySelectorAll('.quiz-opt');
  opts.forEach(o => (o.style.pointerEvents = 'none'));

  if (correct) {
    el.classList.add('correct');
    showFeedback(true, '+15 XP earned — you nailed it! 🎉');
    addXP(15);
    showXPPop('+15 XP ⭐');
    animateMascot('🦎', "🎉 Fantastic! That's correct!");
    document.getElementById('progress-bar').style.width = '65%';
    document.getElementById('step-label').textContent   = 'Step 2 / 4';
  } else {
    el.classList.add('wrong');
    opts.forEach(o => { if (o.textContent.trim() === '<h1>') o.classList.add('correct'); });
    currentHearts = Math.max(0, currentHearts - 1);
    document.getElementById('hearts-stat').textContent = currentHearts;
    showFeedback(false, "The correct answer is <h1> — it's the biggest heading!");
    animateMascot('🦎', "😬 Oops! Don't worry, review the lesson!");
  }
}

// ═══════════════════════════════════════════════════════
//  QUIZ MODE (sidebar quiz with multiple questions)
// ═══════════════════════════════════════════════════════
function showQuiz(clickedEl) {
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  clickedEl.classList.add('active');

  quizAnswered = false;
  document.getElementById('progress-bar').style.width = '50%';
  document.getElementById('step-label').textContent   = 'Quiz Mode';

  let current = 0;

  function renderQ() {
    const q = QUIZ_QUESTIONS[current];
    document.getElementById('lesson-body').innerHTML = `
      <div class="lesson-title">🧠 HTML <span>Quiz</span></div>
      <div style="font-size:0.85rem;color:var(--text2);margin-bottom:0.5rem;">
        Question ${current + 1} of ${QUIZ_QUESTIONS.length}
      </div>
      <div class="concept-box" style="padding:2rem;text-align:center;">
        <div style="font-size:2rem;margin-bottom:1rem;">❓</div>
        <div style="font-size:1.1rem;font-weight:800;margin-bottom:2rem;">${q.q}</div>
        <div class="quiz-options">
          ${q.opts.map(([label, correct]) =>
            `<div class="quiz-opt" onclick="quizCheck(this, ${correct}, ${current})">${label}</div>`
          ).join('')}
        </div>
      </div>
    `;
  }

  window.quizCheck = function (el, correct, idx) {
    if (el.style.pointerEvents === 'none') return;
    document.querySelectorAll('.quiz-opt').forEach(o => (o.style.pointerEvents = 'none'));

    if (correct) {
      el.classList.add('correct');
      addXP(20);
      showXPPop('+20 XP ⭐');
      setTimeout(() => {
        current++;
        if (current < QUIZ_QUESTIONS.length) {
          renderQ();
        } else {
          document.getElementById('lesson-body').innerHTML = `
            <div class="lesson-title">🏆 Quiz <span>Complete!</span></div>
            <div class="concept-box" style="text-align:center;padding:3rem;">
              <div style="font-size:4rem;margin-bottom:1rem;">🎉</div>
              <div style="font-size:1.2rem;font-weight:800;margin-bottom:0.5rem;">You crushed it!</div>
              <div style="color:var(--text2);margin-bottom:1.5rem;">+50 XP total — leaderboard updated!</div>
              <div style="display:flex;gap:1rem;justify-content:center;">
                <button class="run-btn" style="background:var(--blue);" onclick="location.reload()">🔄 Retry</button>
                <button class="run-btn" onclick="animateMascot('🦎','Amazing job! Keep learning!')">🎊 Celebrate</button>
              </div>
            </div>
          `;
          addXP(50);
          animateMascot('🦎', '🏆 QUIZ MASTER! Amazing work!');
        }
      }, 800);
    } else {
      el.classList.add('wrong');
      const opts = document.querySelectorAll('.quiz-opt');
      QUIZ_QUESTIONS[idx].opts.forEach(([, c], i) => { if (c) opts[i].classList.add('correct'); });
      currentHearts = Math.max(0, currentHearts - 1);
      document.getElementById('hearts-stat').textContent = currentHearts;
      showFeedback(false, 'Look for the green answer and review the lesson.');
      animateMascot('🦎', '😬 That was tricky! Review and retry!');
    }
  };

  renderQ();
  animateMascot('🦎', '🧠 Quiz time! Show what you know!');
}
