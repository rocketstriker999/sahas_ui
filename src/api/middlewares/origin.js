// Middleware to restrict access to localhost:4000
module.exports = (req, res, next) => {


    if (req.get('referer').replace(/\/$/, "") === process.env.EXPRESS_UI_SERVER_HOST.concat(':').concat(process.env.EXPRESS_UI_SERVER_PORT)) {
        next(); // Allow the request to proceed
    } else {
        res.status(403).json({ message: `Access forbidden: requests are allowed only from ${process.env.REACT_APP_URL}` });
    }
};