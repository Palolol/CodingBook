/* ─────────────────────────────────────────
   app.js
   UI only — tabs, validation, toast,
   password strength, dashboard display.
   Calls functions from auth.js and db.js.
───────────────────────────────────────── */

/* ── Tab Switching ── */
function switchTab(tab) {
  document.querySelectorAll(".tab").forEach((t, i) => {
    t.classList.toggle("active",
      (i === 0 && tab === "login") ||
      (i === 1 && tab === "register")
    );
  });
  document.getElementById("loginForm").classList.toggle("active", tab === "login");
  document.getElementById("registerForm").classList.toggle("active", tab === "register");
  clearAllHints();
}

/* ── Loading Overlay ── */
function setLoading(active) {
  document.getElementById("loading").classList.toggle("active", active);
}

/* ── Hints & Validation ── */
function setHint(id, message, isError) {
  var el = document.getElementById(id);
  el.textContent = message;
  el.style.color = isError === false ? "var(--success)" : "var(--error)";
}

function clearHint(id) {
  document.getElementById(id).textContent = "";
}

function clearAllHints() {
  ["loginEmailHint","loginPasswordHint","regUsernameHint",
   "regEmailHint","regPasswordHint","regConfirmHint"].forEach(clearHint);
  ["loginEmail","loginPassword","regUsername",
   "regEmail","regPassword","regConfirm"]
    .forEach(function(id) {
      document.getElementById(id).classList.remove("error-field");
    });
}

function markError(inputId, hintId, message) {
  document.getElementById(inputId).classList.add("error-field");
  setHint(hintId, message, true);
}

/* ── Password Strength ── */
function updateStrength() {
  var pw   = document.getElementById("regPassword").value;
  var segs = ["s1","s2","s3"].map(function(id) { return document.getElementById(id); });
  segs.forEach(function(s) { s.className = "strength-seg"; });
  var score = 0;
  if (pw.length >= 6)  score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[0-9!@#$%^&*]/.test(pw)) score++;
  var cls = ["","weak","medium","strong"][score] || "";
  for (var i = 0; i < score; i++) segs[i].classList.add(cls);
  clearHint("regPasswordHint");
}

/* ── Toast ── */
var toastTimer;
function showToast(message, type) {
  var toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast " + (type || "success") + " show";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() { toast.classList.remove("show"); }, 3500);
}

/* ── Register ── */
async function handleRegister(event) {
  event.preventDefault();
  clearAllHints();

  var username = document.getElementById("regUsername").value.trim();
  var email    = document.getElementById("regEmail").value.trim().toLowerCase();
  var password = document.getElementById("regPassword").value;
  var confirm  = document.getElementById("regConfirm").value;

  var valid = true;
  if (!username) {
    markError("regUsername", "regUsernameHint", "Username required"); valid = false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    markError("regEmail", "regEmailHint", "Valid email required"); valid = false;
  }
  if (password.length < 6) {
    markError("regPassword", "regPasswordHint", "Min 6 characters"); valid = false;
  }
  if (password !== confirm) {
    markError("regConfirm", "regConfirmHint", "Passwords do not match"); valid = false;
  }
  if (!valid) return;

  setLoading(true);
  try {
    var result  = await registerUser(username, email, password);
    showToast("Account created!");
    showDashboard(result.user, result.profile);
  } catch (err) {
    console.error("Register error:", err);
    var msg = getAuthErrorMessage(err);
    if (err.code === "auth/email-already-in-use") {
      markError("regEmail", "regEmailHint", msg);
    } else {
      showToast(msg, "error");
    }
  } finally {
    setLoading(false);
  }
}

/* ── Login ── */
async function handleLogin(event) {
  event.preventDefault();
  clearAllHints();

  var email    = document.getElementById("loginEmail").value.trim().toLowerCase();
  var password = document.getElementById("loginPassword").value;

  var valid = true;
  if (!email)    { markError("loginEmail",    "loginEmailHint",    "Email required");    valid = false; }
  if (!password) { markError("loginPassword", "loginPasswordHint", "Password required"); valid = false; }
  if (!valid) return;

  setLoading(true);
  try {
    var result  = await loginUser(email, password);
    var name    = (result.profile && result.profile.username) || result.user.displayName || "there";
    showToast("Welcome back, " + name + "!");
    showDashboard(result.user, result.profile);
  } catch (err) {
    console.error("Login error:", err);
    var msg = getAuthErrorMessage(err);
    markError("loginPassword", "loginPasswordHint", msg);
    showToast(msg, "error");
  } finally {
    setLoading(false);
  }
}

/* ── Logout ── */
async function handleLogout() {
  setLoading(true);
  try {
    await logoutUser();
    hideDashboard();
    showToast("Signed out", "error");
  } catch (err) {
    showToast("Error signing out", "error");
  } finally {
    setLoading(false);
  }
}

/* ── Dashboard ── */
function showDashboard(user, profile) {
  document.getElementById("authView").style.display = "none";
  document.getElementById("dashboard").classList.add("active");

  var username  = (profile && profile.username) || user.displayName || "—";
  var createdAt = new Date(user.metadata.creationTime);

  document.getElementById("dashName").textContent  = username;
  document.getElementById("dashEmail").textContent = user.email;
  document.getElementById("dashUID").textContent   = user.uid;
  document.getElementById("dashDate").textContent  = createdAt.toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  });

  document.getElementById("jsonPreview").textContent = JSON.stringify({
    uid:       user.uid,
    username:  username,
    email:     user.email,
    createdAt: createdAt.toISOString()
  }, null, 2);
}

function hideDashboard() {
  document.getElementById("authView").style.display = "";
  document.getElementById("dashboard").classList.remove("active");
  switchTab("login");
}

/* ── Init — listen for Firebase session ── */
onAuthStateChange(
  function(user, profile) { showDashboard(user, profile); },
  function()               { hideDashboard(); }
);