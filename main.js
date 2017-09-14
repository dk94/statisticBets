var express = require('express');
var app = express();
var path = require('path');
var port = process.env.port || 1340;
const scrapeForbetAsync = require('./scrapeForbet.js');
const scrapeVitisportAsync = require('./scrapeVitisport.js');
const filterPredictionsData = require('./filterPredictionsData');
const getFixtures = require('./getFixtures');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

app.use(express.static(path.join(__dirname, 'pages')));

// middleware
app.get('/scraper', function (req, res) {

    Promise.all(getFixtures())
        .then((allFixtures) => {
           const fixtures = [];
            allFixtures.forEach((league) => {
                
                const natLeague = league.league;
                 league.fixtures.forEach((fixture) => {
                    
                    const homeTeamName = fixture.homeTeamName;
                    const awayTeamName = fixture.awayTeamName;
                    
                    fixtures.push({ natLeague, homeTeamName, awayTeamName });
                });


            });  
            return fixtures;
        })
        .then((fixtures)=>{
            return scrapeForbetAsync(fixtures)
        })
         .then((fixturesWithForbetPrediction)=>{
             return scrapeVitisportAsync(fixturesWithForbetPrediction);

        })
        .then((fixturesWithAllPredictions)=>{
            console.log(fixturesWithAllPredictions);
            res.render('fixtures.jade', { fixturesWithAllPredictions});
        })
})


app.listen(port, function () {
    console.log('App listening on port ' + port);
});