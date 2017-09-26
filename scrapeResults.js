var request = require('request');
var cheerio = require('cheerio');
const url = 'http://www.hot-odds.com/Football/';

const namesOfTeams = {
    'Sevilla FC': 'Sevilla',
    'Mainz' : '1. FSV Mainz',
    'Hertha BSC':'Hertha BSC',
    'UD Las Palmas': 'Las Palmas',
    'GAIS': 'GAIS Göteborg',
    'IK Frej': 'IK Frej Täby',
    'Getafe CF':'Getafe',
    'Celta de Vigo':'Celta de Vigo',
    'Dynamo Moscow': 'Dynamo Moskva',
    'CSKA Moscow': 'CSKA Moskva',
    'Hobro IK': 'Hobro IK',
    'Brøndby IF':'Brøndby',
    'Akhmat Groznyi':'FC Akhmat Grozny',
    'Rubin Kazan':'Rubin',
    'Barnsley':'Barnsley',
    'QPR':'Queens Park Rangers'
    
};


function scrapeResults(fixturesWithViti) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                
                const todayOddsMatches = $(".eventlink.fl.nsy").map((i, e) => {

                    if (e.children[0].data) {
                        const array = ({ home: e.children[0].data.split(' vs ')[0], away: e.children[0].data.split(' vs ')[1], href: e.attribs.href });

                        return array;

                    }
                    else
                        return 'Not a match';




                }
                ).get();

                var promises = [];
                fixturesWithViti.forEach((fixture) => {

                            todayOddsMatches.forEach((match) => {

                                if (namesOfTeams[fixture.homeTeamName] === match.home.trim() && namesOfTeams[fixture.awayTeamName] === match.away.trim()) {
                                    const newUrl = `http://www.hot-odds.com${match.href}`;
                                    promises.push(new Promise(function (resolve, reject) {
                                        request(newUrl, function (error, response, html) {
                                            if (!error) {
                                                var $ = cheerio.load(html);
                                                const pinnacleSpan = ($("tr span:contains('Pinnacle')").get());
                                                const pinnacleTr = pinnacleSpan[0].parent.parent.parent;
                                                const td1 = pinnacleTr.children[3];
                                                const td2 = pinnacleTr.children[5];
                                                const td3 = pinnacleTr.children[7];

                                                fixture['homeTeamOdds'] = (td1.children[1].children[1].children[1].children[0].data.trim().split(' » ')[1]);
                                                fixture['drawOdds'] = (td2.children[1].children[1].children[1].children[0].data.trim().split(' » ')[1]);
                                                fixture['awayTeamOdds'] = (td3.children[1].children[1].children[1].children[0].data.trim().split(' » ')[1]);
                                                resolve();
                                            }
                                        })
                                    }));
                                }
                            })



                })
                     Promise.all(promises).then(()=>{

                         resolve(fixturesWithViti);
                     })


            }
        })
    })
}
module.exports = scrapeResults;