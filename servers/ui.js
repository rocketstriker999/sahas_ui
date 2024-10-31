const libExpress = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const libPath = require('path')
const sahasUI = libExpress();

//static directory mapping
if(process.env.REACT_APP_BUILD){
    sahasUI.use(libExpress.static(libPath.join(__dirname, process.env.REACT_APP_BUILD)));
}

// Reverse proxy for API requests
sahasUI.use('/api', createProxyMiddleware({
    target: process.env.REACT_APP_API_URL, // Your API base URL
    changeOrigin: true,
}));

//if react local server exist
if(process.env.REACT_APP_URL){
    sahasUI.use(createProxyMiddleware({ target: process.env.REACT_APP_URL, changeOrigin: true }));
}

// Start the server
sahasUI.listen(process.env.EXPRESS_UI_PORT);
