var request = require('request');
const scrapeForbetAsync = require('./scrapeForbet.js');
const scrapeVitisportAsync = require('./scrapeVitisport.js');


module.exports = function getFixtures() {


    return scrapeForbetAsync()
    .then((forbetFixtures)=>scrapeVitisportAsync(forbetFixtures))
    .then((fixturesWithViti)=>fixturesWithViti)
    .then((fixturesWithViti)=>)
}


