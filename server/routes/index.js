var router = require('express').Router();

router.use('/api', require('./api'));
router.use('/auth', require('./auth'));
router.use('/users', require('./users'));

module.exports = router;
