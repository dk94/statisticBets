var request = require('request');
var cheerio = require('cheerio');
const Promise = require('bluebird');
const url = 'https://www.forebet.com/en/football-tips-and-predictions-for-today';

// The structure of our request call
// The first parameter is our URL
// The callback function takes 3 parameters, an error, response status code and the html
function scrapeForbet() {
    var table;

    return new Promise(function (resolve, reject) {

        request(url, function (error, response, html) {
            // First we'll check to make sure no errors occurred when making the request
            if (!error) {
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

                var $ = cheerio.load(html);

                // Finally, we'll define the variables we're going to capture
                const countriesSet = $('.schema tr .shortTag').map((i, e) =>
                    e.children[0].data
                ).get();
                const team1Set = $('.schema tr .tnms a').map((i, e) =>
                    e.children[0].data
                ).get();

                const team2Set = $('.schema tr .tnms a').map((i, e) => {
                    if (e.children[2]) {
                        return e.children[2].data;
                    }
                }).get();

                const predictionsSet = $('.schema tr .predict').map((i, e) =>
                    e.children[0].data
                ).get();
                console.log(countriesSet);
                let table = "<table class='table'>";
                const forebetPredictions = countriesSet.map((el, i) => {
                    return {
                        'Team1': team1Set[i],
                        'Team2': team2Set[i],
                        'Prediction': predictionsSet[i]
                    }
                });

                resolve(forebetPredictions);
            }
        })
    })
}
module.exports = scrapeForbet;