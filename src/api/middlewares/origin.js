// Middleware to restrict access to localhost:4000
module.exports = (req, res, next) => {

    const allowedHost = process.env.EXPRESS_UI_SERVER_HOST.concat(':').concat(process.env.EXPRESS_UI_SERVER_PORT)

    if (req.get('referer').startsWith(allowedHost)) {
        next(); // Allow the request to proceed
    } else {
        res.status(403).json({ message: `Access forbidden: requests are allowed only from ${allowedHost}` });
    }
};