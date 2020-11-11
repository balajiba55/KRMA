var express = require('express'),
    router = express.Router();
router.get('/', function (req, res, next) {
    res.send({ message: 'This is krma version one' });
});

router.use('/users', require('./users'));

router.use('/cat', require('./cat'));







module.exports = router;