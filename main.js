var express = require('express');
var app = express();
var path = require('path');
var port = process.env.port || 1340;
const scrapeForbetAsync = require('./scrapeForbet.js');
const scrapeVitisportAsync = require('./scrapeVitisport.js');
const filterPredictionsData = require('./filterPredictionsData');
const getFixtures = require('./getFixtures');
var _ = require('lodash');
app.use(express.static(path.join(__dirname, 'pages')));
// middleware
app.get('/scraper', function (req, res) {
    // The URL we will scrape from - in our example Anchorman 2.
    // let dataFromForbet, dataFromVitisport
    // scrapeForbetAsync()
    //     .then((data) => {
    //         dataFromForbet = data;
    //         return scrapeVitisportAsync();
    //     })
    //     .then((data) => {
    //         dataFromVitisport = data;
    //         filterPredictionsData(dataFromForbet, dataFromVitisport);
    //     });

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
        .then((r)=>console.log(r));
})


app.listen(port, function () {
    console.log('App listening on port ' + port);
});