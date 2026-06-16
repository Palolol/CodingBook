/* ─────────────────────────────────────────
   server.js — Express static file server
───────────────────────────────────────── */

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Serve Static Files ──
app.use(express.static(path.join(__dirname)));
app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// ── Page Routes ──
const pages = {
    '/': 'login.html',
    '/login': 'login.html',
    '/login.html': 'login.html',
    '/homepage': 'homepage.html',
    '/homepage.html': 'homepage.html',
    '/profile': 'profile.html',
    '/profile.html': 'profile.html',
    '/about': 'about.html',
    '/about.html': 'about.html',
    '/contact': 'contact.html',
    '/contact.html': 'contact.html'
};

Object.entries(pages).forEach(([route, file]) => {
    app.get(route, (req, res) => {
        res.sendFile(path.join(__dirname, file));
    });
});

// ── API ──
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        app: 'WebBooks',
        timestamp: new Date().toISOString()
    });
});

// ── 404 Fallback → Login ──
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'login.html'));
});

// ── Error Handler ──
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// ── Start ──
app.listen(PORT, () => {
    console.log('========================================');
    console.log(`  WebBooks is running!`);
    console.log(`  http://localhost:${PORT}`);
    console.log('========================================');
});