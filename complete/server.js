

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname)));
app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/test', express.static(path.join(__dirname, 'test')));
app.use('/tutorials', express.static(path.join(__dirname, 'tutorials')));
app.use('/html-path', express.static(path.join(__dirname, 'html-path')));
app.use('/paths', express.static(path.join(__dirname, 'html-path')));
app.use('/tests', express.static(path.join(__dirname, 'test')));


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


app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        app: 'CodingBooks',
        timestamp: new Date().toISOString()
    });
});


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'login.html'));
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(PORT, () => {
    console.log('========================================');
    console.log(`  CodingBooks is running!`);
    console.log(`  http://localhost:${PORT}`);
    console.log('========================================');
});