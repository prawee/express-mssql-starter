const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('No hello world here just welcome to express mssql starter');
});

module.exports = router;
