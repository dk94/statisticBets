var request = require('request');
var cheerio = require('cheerio');
const url = 'http://www.vitisport.ru/index.php?clanek=quicktips&sekce=fotbal&lang=en';

const namesOfTeams = {
    'Valencia CF': 'Valencia CF',
    'Málaga CF': 'Malaga CF',
    'GAIS': 'GAIS Göteborg',
    'IK Frej': 'IK Frej Täby',
    'Hobro IK': 'Hobro IK',
    'Brøndby IF':'Brondby IF'
};
// The structure of our request call
// The first parameter is our URL
// The callback function takes 3 parameters, an error, response status code and the html
function scrapeVitisport(fixtures) {
    var table;

    return new Promise(function (resolve, reject) {

        request(url, function (error, response, html) {
            // First we'll check to make sure no errors occurred when making the request
            if (!error) {
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

                var $ = cheerio.load(html);

                // Finally, we'll define the variables we're going to capture
                const countriesSet = $('.tabulkaquick .standardbunka').map((i, e) => {
                    return e.parent
                }
                ).get();

                fixtures.forEach((fixture) => {
                    const homeTeam = fixture.homeTeamName;
                    const awayTeam = fixture.awayTeamName;
                    for (var i = 0; i < countriesSet.length; i++) {

                        if (countriesSet[i].children[1].children[0].children.length > 0 && countriesSet[i].children[2].children[0].children.length > 0) {
                            const Team1 = countriesSet[i].children[1].children[0].children[0].data;
                            const Team2 = countriesSet[i].children[2].children[0].children[0].data;
                            const predictionProbT1 = countriesSet[i].children[6].children[0].data;
                            const predictionProbDraw = countriesSet[i].children[7].children[0].data;
                            const predictionProbT2 = countriesSet[i].children[8].children[0].data;
                            const prediction = countriesSet[i].children[9].children[0].data;
                            if (namesOfTeams[homeTeam] === Team1 && namesOfTeams[awayTeam] === Team2) {
                                fixture['predictionVitisport'] = prediction;
                                fixture['predictionVitiProbT1'] = predictionProbT1;
                                fixture['predictionVitiProbDraw'] = predictionProbDraw;
                                fixture['predictionVitiProbT2'] = predictionProbT2;
                            }
                        }
                    }
                });
                resolve(fixtures);
            }
        })
    })
}
module.exports = scrapeVitisport;