var request = require('request');
var cheerio = require('cheerio');
const url = 'http://www.hot-odds.com/Football/';
var phantom = require("phantom");
const namesOfTeams = {
    //Germany1
    'Schalke 04': 'FC Schalke 04',
    'Bayer Leverkusen': 'Bayer 04 Leverkusen',

    //Spain1
    'Celta de Vigo': 'Celta de Vigo',
    'Girona FC': 'Girona',

    //France1
    'AS Monaco': 'Monaco',
    'Montpellier HSC': 'Montpellier',

    //Belgium1
    'Sint-Truiden': 'Sint-Truiden',
    'Sporting Charleroi': 'Sporting Charleroi',

    //Czech1
    'Teplice': 'FK Teplice',
    'Slovan Liberec': 'FC Slovan Liberec',

    //Denmark1
    'FC Helsingor': 'FC Helsingør',
    'AGF Aarhus': 'AGF',
    'Randers FC': 'Randers FC',
    'AC Horsens': 'AC Horsens',

    //Finland1
    'VPS Vaasa': 'VPS',
    'HIFK Helsinki': 'HIFK',
    'Inter Turku': 'FC Inter Turku',
    'KuPS Kuopio': 'KuPS',

    //Netherlands1
    'FC Twente': 'FC Twente',
    'Heracles Almelo': 'Heracles Almelo',

    //Poland1
    'Arka Gdynia': 'Arka Gdynia',
    'Cracovia': 'Cracovia Krakow',
    'Sandecja': 'Sandecja Nowy Sacz',
    'Slask Wroclaw': 'Slask Wroclaw',

    //Portugal1
    'GD Chaves': 'Chaves',
    'CD Tondela': 'Tondela',

    //Russia1
    'Arsenal Tula': 'Arsenal Tula',
    'FK Krasnodar': 'Krasnodar',

    //Scotland1
    'Hamilton Acad.': 'Hamilton',
    'Rangers FC': 'Glasgow Rangers',

    //Sweden1
    'IFK Göteborg': 'IFK Göteborg',
    'Sirius IK': 'IK Sirius FK',

    //Turkey1
    'Akhisar Bld.': 'Akhisar Bld. Genclik',
    'Fenerbahçe SK': 'Fenerbahçe',

    //Germany2
    'Ingolstadt': 'FC Ingolstadt 04',
    'SV Darmstadt': 'SV Darmstadt 98',
    'Kaiserslautern': '1. FC Kaiserslautern',
    'Greuther Fürth': 'SpVgg Greuther Fürth',

    //England2
    'Fulham FC': 'Fulham',
    'QPR': 'Queens Park Rangers',

    //Spain2
    'Cultural Leonesa': 'Cultural Leonesa',
    'UD Almería': 'Almería',

    //Italy2
    'Parma FC': 'Parma',
    'Salernitana': 'Salernitana',

    //Netherland2

    'FC Oss': 'FC Oss',
    'Jong Ajax': 'Jong Ajax',
    'SC Cambuur': 'SC Cambuur',
    'RKC Waalwijk': 'RKC Waalwijk',
    'FC Den Bosch': 'FC Den Bosch',
    'Jong PSV': 'Jong PSV',
    'NEC Nijmegen': 'NEC',
    'MVV Maastricht': 'MVV',
    'FC Dordrecht': 'FC Dordrecht',
    'FC Volendam': 'FC Volendam',
    'Go Ahead Eagles': 'Go Ahead Eagles',
    'Almere City FC': 'Almere City FC',
    'De Graafschap': 'De Graafschap',
    'FC Emmen': 'FC Emmen',
    'SC Telstar': 'SC Telstar',
    'Fortuna Sittard': 'Fortuna Sittard',
    'Jong AZ Alkmaar': 'Jong AZ',
    'FC Eindhoven': 'FC Eindhoven',
    'Jong Utrecht': 'Jong FC Utrecht',
    'Helmond Sport': 'Helmond Sport',

    //Austria2
    'Blau Weiss Linz': 'BW Linz',
    'Kapfenberg': 'Kapfenberg SV 1919',
    'Austria Lustenau': 'SC Austria Lustenau',
    'Wacker Innsbruck': 'FC Wacker Innsbruck',
    'Hartberg': 'TSV Hartberg',
    'Wiener Neustadt': 'SC Wiener Neustadt',
    'SV Ried': 'SV Ried',
    'FC Liefering': 'FC Liefering',
    'WSG Wattens': 'WSG Wattens',
    'Floridsdorfer AC': 'FAC Team fur Wien',

    //Sweden2
    'Falkenbergs FF': 'Falkenbergs FF',
    'Norrby IF': 'Norrby IF',

};


function scrapeResults(fixturesWithViti) {

    var _ph, _page, _outObj;

    phantom.create().then(function (ph) {
        _ph = ph;
        return _ph.createPage();
    }).then(function (page) {
        _page = page;
        _page.setting('userAgent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36')

        return _page.open('http://www.oddsportal.com/matches/soccer/')
    }).then(function (status) {
        console.log(status);

        return _page.property('content')
    }).then(function (content) {
        var $ = cheerio.load(content);
        const todayOddsMatches = $(".table-participant a").map((i, e) => {
            if (e.children[0].data) {
                const array = ({ home: e.children[0].data.split(' - ')[0], away: e.children[0].data.split(' - ')[1], href: e.attribs.href });
                if (array.home && array.away) {
                    return array;
                }
            }
            else
                return 'Not a match';
        }
        ).get();
        var promises = [];
        fixturesWithViti.forEach((fixture) => {

            todayOddsMatches.forEach((match) => {
                if (namesOfTeams[fixture.homeTeamName] === match.home && namesOfTeams[fixture.awayTeamName] === match.away) {
                    const newUrl = `http://www.oddsportal.com${match.href}`;
                    promises.push(new Promise(function (resolve, reject) {
                        return _page.open(newUrl)
                            .then(() =>
                                _page.property('content')
                            )
                            .then((content) => {
                                var $ = cheerio.load(content);
                                
                                const todayOddsMatches = $(".name[title='Go to Pinnacle website!']").map((i, e) => {
                                   console.log(e);
                                }
                                ).get();
                            })
                    })
                    )
                   
                }
            })
        })
        return Promise.all(promises)

    })
        .then(() => {
            _page.close();
            _ph.exit();
        })
        .catch(function (e) {
            console.log(e);
        });
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
                                        if (pinnacleSpan[0]) {
                                            const pinnacleTr = pinnacleSpan[0].parent.parent.parent;
                                            const td1 = pinnacleTr.children[3];
                                            const td2 = pinnacleTr.children[5];
                                            const td3 = pinnacleTr.children[7];

                                            fixture['homeTeamOdds'] = (td1.children[1].children[1].children[1].children[0].data.trim().split(' » ')[1]);
                                            fixture['drawOdds'] = (td2.children[1].children[1].children[1].children[0].data.trim().split(' » ')[1]);
                                            fixture['awayTeamOdds'] = (td3.children[1].children[1].children[1].children[0].data.trim().split(' » ')[1]);

                                        }
                                        resolve();

                                    }
                                })
                            }));
                        }
                    })



                })
                Promise.all(promises).then(() => {

                    resolve(fixturesWithViti);
                })


            }
        })
    })
}
module.exports = scrapeResults;