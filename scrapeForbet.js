var request = require('request');
var cheerio = require('cheerio');
const url = 'https://www.forebet.com/en/football-tips-and-predictions-for-today';
const leagues = ['Fi1', 'Es1', 'Ru1','De1','Dk1'];

// The structure of our request call
// The first parameter is our URL
// The callback function takes 3 parameters, an error, response status code and the html
function scrapeForbet() {

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
                        return e.children[2].data.trim();
                    }
                }).get();
                const predictionProbsTeam1 = $(".schema tr[class*='tr_']>td:nth-child(2)").map((i, e) => {
                    if (e.children[0].children) {
                        return e.children[0].children[0].data
                    }
                    else {
                        return e.children[0].data
                    }
                }).get();
                const predictionProbsDraw = $(".schema tr[class*='tr_'] td:nth-child(3)").map((i, e) => {
                    if (e.children[0].children) {
                        return e.children[0].children[0].data
                    }
                    else {
                        return e.children[0].data
                    }
                }).get();
                const predictionProbsTeam2 = $(".schema tr[class*='tr_'] td:nth-child(4)").map((i, e) => {
                    if (e.children[0].children) {
                        return e.children[0].children[0].data
                    }
                    else {
                        return e.children[0].data
                    }
                }).get();


                const predictionsSet = $(".schema tr[class*='tr_'] td:nth-child(5)").map((i, e) =>

                    e.children[0].data
                ).get();
                const result = $(".schema tr[class*='tr_'] .lscr_td span:nth-child(1)").map((i, e) => {

                    if (e.children[0].children[0])
                        return (e.children[0].children[0].data);
                    else
                        return ('No result');


                }
                ).get();

                let choseItems = [];
                const forebetPredictions = countriesSet.forEach((el, i) => {
                    leagues.forEach((element) => {

                        if (element === el) {
                            if (predictionsSet[i]) {
                                choseItems.push({
                                    'date': new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
                                    'natLeague': el,
                                    'homeTeamName': team1Set[i],
                                    'awayTeamName': team2Set[i],
                                    'predictionForebet': predictionsSet[i],
                                    'predictionForbetProbT1': predictionProbsTeam1[i],
                                    'predictionForbetProbDraw': predictionProbsDraw[i],
                                    'predictionForbetProbT2': predictionProbsTeam2[i],
                                    'result': result[i]
                                });
                            }

                        }

                    });

                });

                resolve(choseItems);
            }
        });

    })
}
module.exports = scrapeForbet;