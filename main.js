var express = require('express');
var app = express();
var path = require('path');
var port = process.env.port || 1340;
const getFixtures = require('./getFixtures');
const insertData = require('./insertDataToDb');
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'pages')));

// middleware
var fixtures = [];


app.get('/scraper', function (req, res) {
    getFixtures()
        .then((fixturesWithAllPredictions) => {
            fixtures = fixturesWithAllPredictions;
            res.send(JSON.stringify(fixturesWithAllPredictions));
        })
});
app.get('/save', function (req, res) {
    insertData(fixtures);
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/fixtures', function (req, res) {
    res.render('fixtures.jade', { fixturesWithAllPredictions: req.body });
});

app.listen(port, function () {
    console.log('App listening on port ' + port);
});