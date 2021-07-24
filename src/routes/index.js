const express = require('express');
const router = express.Router();

/* GET API home */
router.get('/', function(req, res) {
    res.status(200).json({ status: 200, message: 'Hello Getir Team!' });
});

module.exports = router;
