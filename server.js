const http = require('http');
const fs = require('fs'); // Adds the File System module
const path = require('path');
const { exec } = require('child_process'); // Add this to execute OS terminal commands
const filePath = path.join(__dirname, 'messages.json');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
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
                newMessage.timestamp = new Date().toISOString(); // Adds submission time

                // 1. Read existing messages or start with an empty array
                let messagesList = [];
                if (fs.existsSync(filePath)) {
                    const fileData = fs.readFileSync(filePath, 'utf8');
                    messagesList = fileData ? JSON.parse(fileData) : [];
                }

                // 2. Add the new message to our list
                messagesList.push(newMessage);

                // 3. Write the updated list back to messages.json (neatly formatted)
                fs.writeFileSync(filePath, JSON.stringify(messagesList, null, 2), 'utf8');

                console.log('Saved to messages.json:', newMessage);

                // 4. Respond to frontend
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `Thanks ${newMessage.name}! Message saved.` }));

            } catch (error) {
                console.error('Error saving data:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Internal server error.' }));
            }
        });
    } else if (req.method === "GET" && req.url === '/messages') {
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(fileData || '[]');
        }
    } else {
    res.writeHead(404);
    res.end();
    }
});

server.listen(3000, () => {
  console.log('Backend server running at http://localhost:3000');
  
  // Gets the exact absolute path to your local index.html file
  const htmlPath = path.join(__dirname, 'index.html');
  
  // Automatically opens your index.html using your machine's default browser
  const startCommand = process.platform === 'darwin' ? `open "${htmlPath}"` :
                       process.platform === 'win32' ? `start "" "${htmlPath}"` :
                       `xdg-open "${htmlPath}"`;
                       
  exec(startCommand);
});

