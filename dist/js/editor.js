// ═══════════════════════════════════════════════════════
//  CODE EDITOR
// ═══════════════════════════════════════════════════════
function runCode() {
  const code  = document.getElementById('code-editor').value;
  const frame = document.getElementById('preview-frame');
  frame.srcdoc = code;
  showXPPop('+5 XP');
  addXP(5);
}

function updateLineNums() {
  const lines = document.getElementById('code-editor').value.split('\n').length;
  const nums  = document.getElementById('line-nums');
  nums.innerHTML = '';
  for (let i = 1; i <= Math.max(lines, 10); i++) {
    nums.innerHTML += `<span>${i}</span>`;
  }
}

// Tab key support inside the editor
document.addEventListener('keydown', function (e) {
  if (e.key === 'Tab' && document.activeElement.classList.contains('code-input')) {
    e.preventDefault();
    const ta    = document.activeElement;
    const start = ta.selectionStart;
    ta.value    = ta.value.substring(0, start) + '  ' + ta.value.substring(ta.selectionEnd);
    ta.selectionStart = ta.selectionEnd = start + 2;
  }
});
