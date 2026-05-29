# CodingBook
# Vanilla Contact Form Project with Local Storage

A lightweight, asynchronous contact form system built using pure, vanilla frontend technologies (HTML/CSS/JS) and a lightweight Node.js backend. This project stores text data locally in a structured JSON file without requiring a heavyweight database engine like MongoDB or MySQL.

---

## 📂 Project Directory Structure

Ensure your workspace directory tree is organized exactly like this before launching the script:

```text
├── index.html
├── server.js
├── css/
│   └── styles.css
└── js/
    └── script.js
```

---

## 💻 Source Code Components

### 1. Frontend Interface (`index.html`)
The structure of your application features a standard accessible text input field, a textarea block, and a reactive history layout anchor below the submission buttons.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Tutorial Website - Assignment</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  
  <form id="contact-form">
    <input type="text" name="username" placeholder="Your Name" required>
    <textarea name="user-message" placeholder="Your Message" required></textarea>
    <button type="submit">Send Message</button>
  </form>
  
  <div id="contact-status"></div>

  <h2>History Of Message</h2>
  <div id="message-history">
    <p>Loading past messages...</p>
  </div>

  <script src="js/script.js"></script>
</body>
</html>
```

### 2. Layout Styles (`css/styles.css`)
Applies standard Flexbox grid variables to force input layouts instantly into a tidy single column.

```css
#contact-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

input, textarea, button {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

#message-history {
  max-width: 400px;
  margin-top: 15px;
}
```

### 3. Application Scripting (`js/script.js`)
Captures data without triggering browser reloads, manages JSON transfers, and refreshes the user display context automatically.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const statusDiv = document.getElementById('contact-status');
  const historyDiv = document.getElementById('message-history');

  // Function to pull messages from server and build HTML elements
  async function loadMessageHistory() {
    if (!historyDiv) return;
    try {
      const response = await fetch('http://localhost:3000/messages');
      const messages = await response.json();

      if (messages.length === 0) {
        historyDiv.innerHTML = '<p>No messages sent yet.</p>';
        return;
      }

      // Render out each message card cleanly
      historyDiv.innerHTML = messages.map(msg => `
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 8px; border-radius: 4px;">
          <strong>${msg.name}</strong> 
          <small style="color: gray;">(${new Date(msg.timestamp).toLocaleTimeString()})</small>
          <p style="margin: 4px 0 0 0;">${msg.message}</p>
        </div>
      `).join('');
    } catch (error) {
      historyDiv.innerHTML = '<p style="color: red;">Could not load history.</p>';
    }
  }

  // 1. Automatically load history as soon as the browser tab opens
  loadMessageHistory();

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Stop page reload

      const formData = new FormData(contactForm);
      const payload = {
        name: formData.get('username'),
        message: formData.get('user-message')
      };

      try {
        const response = await fetch('http://localhost:3000/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        statusDiv.textContent = data.message;
        statusDiv.style.color = 'green';
        contactForm.reset(); 

        // 2. Instantly update the history list on screen after sending
        loadMessageHistory();

      } catch (error) {
        statusDiv.textContent = 'Server error. Try again later.';
        statusDiv.style.color = 'red';
      }
    });
  }
});
```

### 4. Backend Server (`server.js`)
Configures an HTTP communication wrapper to handle browser preflights (CORS), process inputs stream-by-stream, append histories safely, and boot up your local system browser automatically.

```javascript
const http = require('http');
const fs = require('fs'); 
const path = require('path');
const { exec } = require('child_process'); 

const filePath = path.join(__dirname, 'messages.json');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/contact') {
    let body = '';

    req.on('data', chunk => { body += chunk.toString(); });

    req.on('end', () => {
      try {
        const newMessage = JSON.parse(body);
        newMessage.timestamp = new Date().toISOString(); 

        let messagesList = [];
        if (fs.existsSync(filePath)) {
          const fileData = fs.readFileSync(filePath, 'utf8');
          messagesList = fileData ? JSON.parse(fileData) : [];
        }

        messagesList.push(newMessage);
        fs.writeFileSync(filePath, JSON.stringify(messagesList, null, 2), 'utf8');

        console.log('Saved to messages.json:', newMessage);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Thanks ${newMessage.name}! Message saved.` }));

      } catch (error) {
        console.error('Error saving data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal server error.' }));
      }
    });
  } 
  else if (req.method === "GET" && req.url === '/messages') {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(fileData || '[]');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify([]));
    }
  } 
  else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Backend server running at http://localhost:3000');
  
  const htmlPath = path.join(__dirname, 'index.html');
  
  const startCommand = process.platform === 'darwin' ? `open "${htmlPath}"` :
                       process.platform === 'win32' ? `start "" "${htmlPath}"` :
                       `xdg-open "${htmlPath}"`;
                       
  exec(startCommand);
});
```

---

## 🚀 Execution Instructions

1. Ensure [Node.js](https://nodejs.org) is installed.
2. Open your operating system terminal inside the root project workspace folder.
3. Boot up the server script:
   ```bash
   node server.js
   ```
4. The backend server will initialize, bind to port `3000`, and immediately invoke your native system browser to load the frontend interface.

---

## 💾 Data Architecture Blueprint (`messages.json`)
The script manages persistent arrays behind the scenes. Here is how your `messages.json` file formats itself upon runtime submissions:

```json
[
  {
    "name": "Jane Doe",
    "message": "Hello! Testing out my local storage architecture system.",
    "timestamp": "2026-05-29T10:32:00.000Z"
  }
]
```

