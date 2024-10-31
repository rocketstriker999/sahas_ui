const libExpress = require('express')

const router = libExpress.Router()


router.get("/header-texts", (req, res) => {
    res.status(200).json({
        "header_title": "Sahas Smart Studies",
        "header_tagline": "Learn Digitally",
        "header_description": "Lorem ipsum placeholder text."
    })
})

module.exports = router;