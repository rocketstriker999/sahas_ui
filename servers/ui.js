const libExpress = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const libPath = require('path')
const sahasUI = libExpress();

//static directory mapping
if(process.env.REACT_APP_BUILD_DIRECTORY){
    sahasUI.use(libExpress.static(libPath.join(__dirname, process.env.REACT_APP_BUILD_DIRECTORY)));
}

// Reverse proxy for API requests
sahasUI.use(process.env.REACT_APP_REVERSE_PROXY_API_PATH, createProxyMiddleware({
    target: process.env.EXPRESS_API_SERVER_HOST.concat(':').concat(process.env.EXPRESS_API_SERVER_PORT),
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
}));

//if react local server exist
if(process.env.REACT_DEV_SERVER){
    sahasUI.use(createProxyMiddleware({ target: process.env.REACT_DEV_SERVER, changeOrigin: true }));
}

// Start the server
sahasUI.listen(process.env.EXPRESS_UI_SERVER_PORT, () =>console.log(`[+]UI started at ${process.env.EXPRESS_UI_SERVER_HOST}:${process.env.EXPRESS_UI_SERVER_PORT}`));
