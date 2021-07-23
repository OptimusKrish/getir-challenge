const express = require('express');
const router = express.Router();

/* GET API home */
router.get('/', function(req, res, next) {
    res.status(200).json('Hello Getir Team!');
});

module.exports = router;
