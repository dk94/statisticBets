var request = require('request');
var cheerio = require('cheerio');
const url = 'http://www.hot-odds.com/Football/';

const namesOfTeams = {
    'Sevilla FC': 'Sevilla',
    'UD Las Palmas': 'Las Palmas',
    'GAIS': 'GAIS Göteborg',
    'IK Frej': 'IK Frej Täby',
    'Getafe CF':'Getafe',
    'Celta de Vigo':'Celta de Vigo'
    
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


                fixturesWithViti.forEach((fixture) => {

                    todayOddsMatches.forEach((match) => {

                        if (namesOfTeams[fixture.homeTeamName] === match.home.trim() && namesOfTeams[fixture.awayTeamName] === match.away.trim()) {
                            const newUrl = `http://www.hot-odds.com${match.href}`;
                            request(newUrl, function (error, response, html) {
                                if (!error) {
                                    var $= cheerio.load(html);
                                    const pinnacleSpan = ($("tr span:contains('Pinnacle')").get());
                                    const pinnacleTr  = pinnacleSpan[0].parent.parent.parent;
                                    const td1=pinnacleTr.children[1];
                                    const td2=pinnacleTr.children[2];
                                    const td2=pinnacleTr.children[3];
                                    console.log(pinnacleTr.children[1].children[0].children[0].children[0],pinnacleTr.children[2],pinnacleTr.children[3])

                                }
                            })
                        }
                    })

                })
            }
        })
    })
}
module.exports = scrapeResults;