// ═══════════════════════════════════════════════════════
//  LESSON LOADER
// ═══════════════════════════════════════════════════════
function loadLesson(type, clickedEl) {
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  clickedEl.classList.add('active');

  const l = LESSONS[type];
  if (!l) return;

  quizAnswered = false;
  document.getElementById('progress-bar').style.width = '10%';
  document.getElementById('step-label').textContent   = 'Step 1 / 4';

  document.getElementById('lesson-body').innerHTML = `
    <div class="lesson-title">${l.title}</div>
    <div class="concept-box">
      <h3>📖 Core Concept</h3>
      <p>${l.concept}</p>
    </div>
    <div class="tip-box">
      <div class="tip-icon">💡</div>
      <div><strong>Bugsy says:</strong> Try editing the code on the right and click Run — watching it work is the best way to learn!</div>
    </div>
    <div class="editor-wrap">
      <div class="editor-topbar">
        <div class="e-dot r"></div><div class="e-dot y"></div><div class="e-dot g"></div>
        <div class="editor-tabs"><div class="e-tab active">index.html</div></div>
        <button class="run-btn" onclick="runCode()">▶ Run Code</button>
      </div>
      <div class="editor-area">
        <div class="code-pane">
          <div class="line-nums" id="line-nums">
            <span>1</span><span>2</span><span>3</span>
            <span>4</span><span>5</span><span>6</span>
          </div>
          <textarea class="code-input" id="code-editor"
            spellcheck="false"
            oninput="updateLineNums()">${l.code}</textarea>
        </div>
        <div class="preview-pane">
          <div class="preview-label">🌐 Preview</div>
          <iframe id="preview-frame" sandbox="allow-scripts allow-same-origin"></iframe>
        </div>
      </div>
    </div>
    <div class="quiz-section" id="quiz-box">
      <div class="quiz-question" id="quiz-q">${l.q}</div>
      <div class="quiz-options" id="quiz-opts">
        ${l.opts.map(([label, correct]) =>
          `<div class="quiz-opt" onclick="checkAnswer(this, ${correct})">${label}</div>`
        ).join('')}
      </div>
    </div>
  `;

  runCode();
  animateMascot('🦎', "New lesson loaded! Let's go! 💪");
}

// ─── Close / Home screen ─────────────────────────────────
function closeLesson() {
  animateMascot('🦎', '📚 Pick a lesson from the sidebar!');
  document.getElementById('lesson-body').innerHTML = `
    <div style="text-align:center;padding:4rem 2rem;">
      <div style="font-size:4rem;margin-bottom:1rem;">📚</div>
      <div class="lesson-title" style="justify-content:center;margin-bottom:0.5rem;">
        Choose a <span>lesson</span>
      </div>
      <div style="color:var(--text2);font-size:0.9rem;">
        Pick a topic from the sidebar to start learning!
      </div>
    </div>
  `;
}
