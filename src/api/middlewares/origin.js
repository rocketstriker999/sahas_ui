// Middleware to restrict access to localhost:4000
module.exports = (req, res, next) => {


    // Check the request's origin
    const origin = req.get('Origin');

    if (origin === process.env.REACT_APP_URL) {
        next(); // Allow the request to proceed
    } else {
        res.status(403).json({ message: `Access forbidden: requests are allowed only from ${process.env.REACT_APP_URL}` });
    }
};