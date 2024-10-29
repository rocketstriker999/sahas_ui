const libExpress = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();
const libPath = require('path');

const app = libExpress();

// Serve static files from the React app (assuming it's built)
app.use(libExpress.static(libPath.join(__dirname, process.env.UI_BUILD)));

// Reverse proxy for API requests
app.use('/api', createProxyMiddleware({
    target: process.env.BACKEND_URL, // Your API base URL
    changeOrigin: true,
}));

// Serve the React app
app.get('*', (req, res) => {
    res.sendFile(libPath.join(__dirname, process.env.UI_BUILD, 'index.html'));
});

// Start the server
app.listen(process.env.PORT);
