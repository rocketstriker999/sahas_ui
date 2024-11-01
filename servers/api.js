const libExpress = require('express');
const libCookieParser = require('cookie-parser');

const sahasAPI = libExpress();

//requests are only acceptable from UI
sahasAPI.use(require('../src/api/middlewares/origin'))
//allow json request payloads only
sahasAPI.use(libExpress.json());
//parse the cookies
sahasAPI.use(libCookieParser());

//api end points and routers
const routers = {
    '/ui-config': require('../src/api/routes/ui_config'),
    '/users': require('../src/api/routes/users'),
    '/token': require('../src/api/routes/token'),
}

//apply all routes
Object.entries(routers).forEach(([path, router]) => sahasAPI.use(path, router));

//if api path is not processable
sahasAPI.use((req, res) => res.status(404))

//APP Port and start app
sahasAPI.listen(process.env.EXPRESS_API_SERVER_PORT, () =>console.log(`[+]APIs started at ${process.env.EXPRESS_API_SERVER_HOST}:${process.env.EXPRESS_API_SERVER_PORT}`))
