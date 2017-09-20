var request = require('request');
const scrapeForbetAsync = require('./scrapeForbet.js');
const scrapeVitisportAsync = require('./scrapeVitisport.js');
const scrapeResults = require('./scrapeResults.js');


module.exports = function getFixtures() {


    return scrapeForbetAsync()
    .then((forbetFixtures)=>scrapeVitisportAsync(forbetFixtures))
    .then((fixturesWithViti)=>scrapeResults(fixturesWithViti))
    .then((fixturesWithViti)=>fixturesWithViti)
}


