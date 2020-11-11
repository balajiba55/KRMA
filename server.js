var express = require('express'),
    async = require('async'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan');
    var cors = require('cors');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, HEAD");
    res.header("Access-Control-Expose-Headers", "X-TOTAL-COUNT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,X-TOTAL-COUNT, x-access-token");

    next();
});
app.use(cors());
app.use(logger('dev'));
app.get('/', function (req, res) {
    return res.send({
        message: "Welcome To krma API!"
    });
});

function parallel(middlewares) {
    return function (req, res, next) {
        async.each(middlewares, function (mw, cb) {
            mw(req, res, cb);
        }, next);
    };
}
app.use(parallel([
    bodyParser.json({ limit: '1000mb', extended: true }),
    bodyParser.urlencoded({ limit: '1000mb', extended: true })
]));
app.use('/v1', require('./routes'));

app.listen(3000, () => console.log(`node server listening on port 3000!`))
app.use(function (err, req, res, next) {
    res.status(err.status).send(err);
});

module.exports = app;