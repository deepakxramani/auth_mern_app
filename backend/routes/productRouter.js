const ensureAuthentication = require('../middlewares/auth');

const router = require('express').Router()

router.get('/', ensureAuthentication, (req, res) => {
    console.log('---- logged in user detail ----', req.user)
    res.status(200).json([
        {
            name: "Mobile",
            price: 10000
        },
        {
            name: "TV",
            price: 20000
        }
    ])
});

module.exports = router;