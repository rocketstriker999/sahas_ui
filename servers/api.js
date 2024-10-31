const libExpress = require('express');
const applyRoutes = require('../src/api/routes')

const sahasAPI = libExpress();

//requests are only acceptable from UI
sahasAPI.use(require('../src/api/middlewares/origin'))
//allow json request payloads only
sahasAPI.use(libExpress.json());

//api end points and routers
const routers = {
    '/ui-config': require('./routes/ui-config'),
    '/users': require('./routes/users'),
    '/token': require('./routes/token'),
}

//apply all routes
Object.entries(routers).forEach(([path, router]) => sahasAPI.use(path, router) );

//if api path is not processable
sahasAPI.use((req, res) => res.status(404))

//APP Port and start app
sahasAPI.listen(process.env.EXPRESS_API_PORT)
