// ═══════════════════════════════════════════════════════
//  XP & STATS
// ═══════════════════════════════════════════════════════
function addXP(amount) {
  currentXP += amount;
  document.getElementById('xp-stat').textContent = currentXP;
  const xpBar  = document.getElementById('xp-bar');
  const curPct = parseInt(xpBar.style.width) || 62;
  xpBar.style.width = Math.min(100, curPct + (amount / 10)) + '%';
}
