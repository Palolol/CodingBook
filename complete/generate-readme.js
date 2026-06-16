const fs = require('fs');

const readme = `# 📚 WebBooks

> A web-based learning platform for beginner web developers.
> Learn HTML, CSS, and JavaScript through tutorials, videos, exercises, and tests.

---

## 🌐 Live Preview

\`\`\`
http://localhost:3000
\`\`\`

---

## ✨ Features

- 🔐 **Firebase Authentication** — Register, Login, Logout, Forgot Password
- 👤 **User Profile** — Edit name, phone, bio, location (saved to Firestore)
- 🔍 **Smart Search Bar** — Search tutorials, videos, exercises by keyword
- 📂 **Sidebar Navigation** — Browse all topics from any page
- 🔔 **Notifications** — Bell icon in navbar
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- 🎨 **Dark Theme** — Clean dark UI inspired by modern platforms
- 🧠 **Password Strength Meter** — Live feedback while registering
- 🔑 **Session Persistence** — Stay logged in after page refresh
- 🏆 **Final Tests** — QCM, Q&A, and Small Project challenges

---

## 🗂️ Project Structure

\`\`\`
webbooks/
│
├── 📄 homepage.html          # Main page (protected)
├── 📄 profile.html           # User profile page (protected)
├── 📄 login.html             # Login / Register / Forgot Password
├── 📄 about.html             # About page
├── 📄 contact.html           # Contact page
│
├── 📁 tutorials/             # Individual tutorial pages
│   ├── html-intro.html
│   ├── html-elements.html
│   ├── html-forms.html
│   ├── html-semantic.html
│   ├── html-links.html
│   ├── html-images.html
│   ├── html-lists.html
│   ├── html-tables.html
│   ├── html-headings.html
│   ├── html-paragraphs.html
│   ├── html-attributes.html
│   ├── html-media.html
│   ├── css-intro.html
│   ├── css-selectors.html
│   ├── css-colors.html
│   ├── css-box-model.html
│   ├── css-fonts.html
│   ├── css-flexbox.html
│   ├── css-grid.html
│   ├── css-positioning.html
│   ├── css-animations.html
│   ├── css-responsive.html
│   ├── css-variables.html
│   ├── css-borders.html
│   ├── css-display.html
│   ├── js-intro.html
│   ├── js-variables.html
│   ├── js-datatypes.html
│   ├── js-functions.html
│   ├── js-conditions.html
│   ├── js-loops.html
│   ├── js-arrays.html
│   ├── js-objects.html
│   ├── js-dom.html
│   ├── js-events.html
│   ├── js-fetch.html
│   ├── js-es6.html
│   ├── js-storage.html
│   └── js-errors.html
│
├── 📁 videos/                # Video tutorial pages
│   ├── html-course.html
│   ├── css-course.html
│   ├── js-course.html
│   ├── flexbox.html
│   ├── grid.html
│   └── dom.html
│
├── 📁 exercises/             # Practice exercise pages
│   ├── html-exercises.html
│   ├── css-exercises.html
│   └── js-exercises.html
│
├── 📁 paths/                 # Learning path pages
│   ├── html-path.html
│   ├── css-path.html
│   ├── js-path.html
│   └── full-path.html
│
├── 📁 tests/                 # Final test pages
│   ├── qcm.html
│   ├── qna.html
│   └── project.html
│
├── 📁 style/                 # CSS stylesheets
│   ├── navbar.css
│   ├── login.css
│   ├── profile.css
│   ├── header.css
│   ├── html_box.css
│   ├── css_box.css
│   ├── javascript_box.css
│   ├── final_box.css
│   ├── footer.css
│   ├── container.css
│   ├── responsive.css
│   └── global.css
│
├── 📁 js/                    # JavaScript files
│   ├── firebase-config.js
│   ├── db.js
│   ├── auth.js
│   ├── auth-guard.js
│   ├── login-app.js
│   ├── profile-page.js
│   └── navbar.js
│
├── 📁 assets/                # Static assets
│   ├── image.png
│   └── images/
│       ├── html_logo.png
│       ├── css_logo.png
│       └── javascript_logo.png
│
├── 📄 server.js
├── 📄 package.json
└── 📄 README.md
\`\`\`

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- [npm](https://www.npmjs.com/)
- A [Firebase](https://firebase.google.com/) project

---

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/your-username/webbooks.git
cd webbooks
\`\`\`

---

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

---

### 3. Setup Firebase

#### Step 1 — Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add Project** and follow the steps

#### Step 2 — Enable Authentication
1. Firebase Console → **Authentication** → **Get Started**
2. Enable **Email/Password** provider

#### Step 3 — Enable Firestore
1. Firebase Console → **Firestore Database** → **Create Database**
2. Start in **test mode**

#### Step 4 — Get Your Config
1. Firebase Console → **Project Settings** → **Your Apps** → **Web App**
2. Copy the \`firebaseConfig\` object

#### Step 5 — Paste into \`js/firebase-config.js\`

\`\`\`javascript
const firebaseConfig = {
    apiKey:            "YOUR_API_KEY",
    authDomain:        "YOUR_PROJECT.firebaseapp.com",
    databaseURL:       "YOUR_DATABASE_URL",
    projectId:         "YOUR_PROJECT_ID",
    storageBucket:     "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId:             "YOUR_APP_ID"
};
\`\`\`

---

### 4. Start the Server

\`\`\`bash
# Production
npm start

# Development (auto-restart)
npm run dev
\`\`\`

---

### 5. Open in Browser

\`\`\`
http://localhost:3000
\`\`\`

---

## 🔑 Authentication Flow

\`\`\`
User visits any page
        │
        ▼
  Firebase checks session
        │
   ┌────┴────────┐
   │             │
Logged in    Not logged in
   │             │
   ▼             ▼
Homepage     login.html
 loads           │
                 ├── Login     → homepage.html
                 ├── Register  → homepage.html
                 └── Forgot    → Reset email sent
\`\`\`

---

## 📜 Script Load Order

\`\`\`html
<!-- 1. Firebase SDKs (must be first) -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>

<!-- 2. App scripts (order matters) -->
<script src="js/firebase-config.js"></script>
<script src="js/db.js"></script>
<script src="js/auth.js"></script>
<script src="js/auth-guard.js"></script>
<script src="js/profile-page.js"></script>  <!-- profile.html only -->
<script src="js/navbar.js"></script>
\`\`\`

---

## 🔒 Firestore Data Structure

\`\`\`
Firestore Database
└── users/
    └── {uid}
        ├── uid:        string
        ├── username:   string
        ├── email:      string
        ├── phone:      string
        ├── bio:        string
        ├── location:   string
        ├── createdAt:  timestamp
        └── updatedAt:  timestamp
\`\`\`

---

## 🔍 Search Bar

| Input | Result |
|-------|--------|
| \`html\` | All HTML tutorials |
| \`css flex\` | CSS Flexbox |
| \`video\` | All video courses |
| \`loop\` | JavaScript Loops |
| \`form\` | HTML Forms |
| \`test\` | QCM, Q&A, Project |

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| \`Ctrl + K\` | Focus search |
| \`/\` | Focus search |
| \`↑\` \`↓\` | Navigate results |
| \`Enter\` | Open result |
| \`Escape\` | Close search |

---

## 🛠️ API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | \`/\` | Redirect to login |
| GET | \`/login\` | Login page |
| GET | \`/homepage\` | Homepage |
| GET | \`/profile\` | Profile page |
| GET | \`/about\` | About page |
| GET | \`/contact\` | Contact page |
| GET | \`/api/health\` | Health check |
| GET | \`/api/status\` | Server status |

---

## 🧰 Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure |
| CSS3 | Styling and animations |
| JavaScript ES6+ | Client-side logic |
| Firebase Auth | User authentication |
| Firestore | User profile database |
| Express.js | Static file server |
| Node.js | Server runtime |
| Font Awesome 6 | Icons |
| Google Fonts | Roboto font |

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| > 900px | Full desktop |
| 768px — 900px | Tablet |
| < 768px | Mobile |
| < 480px | Small mobile |

---

## 🐛 Common Issues

### Page redirects to login when already logged in
Make sure Firebase SDKs load before \`firebase-config.js\`

### Profile dropdown does not navigate
Make sure \`navbar.js\` is the last script loaded

### Hamburger does not open sidebar
Make sure \`<aside id="sidebar">\` exists in your HTML

### Firestore permission denied
Set Firestore rules:
\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null
                         && request.auth.uid == uid;
    }
  }
}
\`\`\`

### Profile not saving
Make sure \`updateUserProfile\` exists in \`db.js\`

---

## 👥 Contributing

1. Fork the repository
2. Create a branch: \`git checkout -b feature/your-feature\`
3. Commit: \`git commit -m "Add your feature"\`
4. Push: \`git push origin feature/your-feature\`
5. Open a Pull Request

---

## 📄 License

MIT License — Copyright (c) 2025 WebBooks

---

## 📞 Contact

| Channel | Details |
|---------|---------|
| Email | webbooksupport@gmail.com |
| Phone | +855 12345678 |
| Meta | Web-Books |

---

<div align="center">
  Made with ❤️ for beginner web developers · © 2025 WebBooks
</div>`;

// Write README.md to project root
fs.writeFileSync('README.md', readme, 'utf8');

console.log('✅ README.md created successfully!');