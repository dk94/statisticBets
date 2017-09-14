var request = require('request');
const scrapeForbetAsync = require('./scrapeForbet.js');
const scrapeVitisportAsync = require('./scrapeVitisport.js');

const leagues = ['ELC', 'FL2'];
module.exports = function getFixtures() {
    return Promise.all(leagues.map((el) => {
        return new Promise(function (resolve, reject) {
            var options = {
                url: 'http://api.football-data.org/v1/fixtures?league=' + el + '&timeFrame=n2',
                headers: {
                    'X-Auth-Token': 'df326a722c314c96ac2a4a13e4db37dc'
                }
            };
            request(options, function (error, response, html) {


                const body = JSON.parse(response.body);
                const currentFixtures = { league: el, fixtures: body.fixtures }
                resolve(currentFixtures);

            })
        })
    }))
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
        .then((fixtures) => {
            return scrapeForbetAsync(fixtures)
        })
        .then((fixturesWithForbetPrediction) => {
            return scrapeVitisportAsync(fixturesWithForbetPrediction);

        })
        
}


