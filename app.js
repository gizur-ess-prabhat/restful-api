var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var fs = require('fs');
var cookieParser = require('cookie-parser');
var morgan = require('morgan')
var bodyParser = require('body-parser');
var router = express.Router()
var methodOverride = require('method-override')

// Config
var config  = require('./config/config.js').Config;

// some environment variables
app.set('port', process.env.PORT || 3000);

app.use('/api', function(req, res, next) {
    var apikey = req.get('api-key');
    var accept = req.get('accept');
    var timestamp = req.get('timestamp'); // UTC
    var checksum = req.get('checksum');

    // key isnt present
    //  || accept !== 'application/json'
    if (!apikey || !accept || !timestamp || !checksum)
        return next(config.error(config.ERRCODE.E1001, 'E1001'));

    // key is invalid
    if (!~apiKeys.indexOf(apikey))
        return next(config.error(config.ERRCODE.E1002, 'E1002'));

    console.log("API Key is " + apikey);
    
    // all good, store req.key for route access
    req.apikey = apikey;
    next();
});

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(methodOverride('_method')); // Not Required
app.use(cookieParser())

app.use(function(err, req, res, next) {
    // whatever you want here, feel free to populate
    // properties on `err` to treat it differently in here.
    res.send(err.status || 500, {error: err.message});
});

var apiKeys = ['sampleKey1', 'sampleKey2'];

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function(req, res) {
    res.send(404, {error: "Sorry, can't find it."});
});

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function(file) {
    if (file.substr(-3) === '.js') {
        route = require('./controllers/' + file);
        route.controller(app);
    }
});

// dynamically include routes (Models)
fs.readdirSync('./models').forEach(function(file) {
    if (file.substr(-3) === '.js') {
        require('./models/' + file);   
        route.controller(app);
    }
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
