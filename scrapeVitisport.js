var request = require('request');
var cheerio = require('cheerio');
const url = 'http://www.vitisport.ru/index.php?clanek=quicktips&sekce=fotbal&lang=en';

const namesOfTeams = {
    //Finland1
    'HJK Helsinki': 'HJK Helsinki',
    'FC Lahti': 'FC Lahti',
    'KuPS Kuopio': 'KuPS Kuopio',
    'Ilves Tampere': 'Ilves Tampere',
    'Seinajoen JK': 'Seinajoen',
    'IFK Mariehamn': 'IFK Mariehamn',
    'VPS Vaasa': 'VPS Vaasa',
    'Inter Turku': 'FC Inter Turku',
    'RoPS Rovaniemi': 'RoPS Rovaniemi',
    'PS Kemi': 'PS Kemi',
    'HIFK Helsinki': 'HIFK Helsinki',
    'JJK Jyväskylä': 'JJK Jyväskylä',

    //Denmark1
    'FC Nordsjælland': 'FC Nordsjaeland',
    'FC Midtjylland': 'FC Midtjylland',
    'FC København': 'FC Kobenhavn',
    'Brøndby IF': 'Brondby IF',
    'Hobro IK': 'Hobro IK',
    'AC Horsens': 'AC Horsens',
    'Odense BK': 'Odense Boldklub',
    'AaB Aalborg': 'AaB Aalborg BK',
    'SønderjyskE': 'SonderjyskE Haderslev',
    'AGF Aarhus': 'AGF Aarhus',
    'Silkeborg IF': 'Silkeborg IF',
    'Lyngby BK': 'Lyngby BK',
    'FC Helsingor': 'FC Helsingor',
    'Randers FC': 'Randers FC',

    //Russia1
    'Zenit': 'Zenit Sankt Petersburg',
    'Lokomotiv Moscow': 'Lokomotiv Moskva',
    'FK Krasnodar': 'FK Krasnodar',
    'CSKA Moscow': 'CSKA Moskva',
    'Akhmat Groznyi': 'Terek Groznyi',
    'FK Ural': 'Ural Sverdlovskaya',
    'FK Rostov': 'FC Rostov na Donu',
    'Rubin Kazan': 'FK Rubin Kazan',
    'Spartak Moscow': 'Spartak Moskva',
    'FK Ufa': 'FC Ufa',
    'Amkar Perm': 'FK Amkar Perm',
    'Arsenal Tula': 'Arsenal Tula',
    'Dynamo Moscow': 'Dinamo Moskva',
    'FK Tosno': 'FC Tosno',
    'SKA-Energia': 'FC Khabarovsk',
    'Anzhi Makhachkala': 'Anzhi Makhachkala',

    //Germany1
    'Borussia Dortmund': 'Borussia Dortmund',
    'Hoffenheim': 'TSG 1899 Hoffenheim',
    'Bayern München': 'FC Bayern München',
    'Hannover 96': 'Hannover 96',
    'FC Augsburg': 'FC Augsburg',
    'RB Leipzig': 'RB Leipzig',
    'Schalke 04': 'FC Schalke 04',
    'Hertha BSC': 'Hertha BSC Berlin',
    'Mönchengladbach': 'Borussia M.gladbach',
    'Bayer Leverkusen': 'Bayer 04 Leverkusen',
    'Eintracht Frankfurt': 'Eintracht Frankfurt',
    'VfB Stuttgart': 'VfB Stuttgart 1893',
    'VfL Wolfsburg': 'VfL Wolfsburg',
    'Mainz': 'FSV Mainz 05',
    'Hamburger SV': 'Hamburger SV',
    'SC Freiburg': 'SC Freiburg',
    'Werder Bremen': 'Werder Bremen',
    '1.FC Köln': '1.FC Kőln',
    //Germany2
    'Fortuna Düsseldorf': 'Fortuna Düsseldorf',
    'Nürnberg': '1. FC Nürnberg',
    'Holstein Kiel': 'Holstein Kiel',
    'SV Darmstadt': 'SV Darmstadt 98',
    'SV Sandhausen': 'SV 1916 Sandhausen',
    'Arminia Bielefeld': 'Arminia Bielefeld',
    'Erzgebirge Aue': 'FC Erzgebirge Aue',
    'St. Pauli': 'FC St. Pauli 1910',
    'Union Berlin': '1. FC Union Berlin',
    'E. Braunschweig': 'Eintracht Braunschweig',
    'VfL Bochum': 'VfL Bochum 1848',
    'Jahn Regensburg': 'SSV Jahn Regensburg',
    'Dynamo Dresden': '1. FC Dynamo Dresden',
    'MSV Duisburg': '1. FC Heidenheim 1846',
    'Heidenheim': 'MSV Duisburg',
    'Ingolstadt': 'FC Ingolstadt 04',
    'Greuther Fürth': 'SpVgg Greuther Fürth',
    'Kaiserslautern': '1.FC Kaiserslautern',

    //Sweden1
    'Malmö FF':'Malmo FF',
    'Djurgårdens IF':'Djurgärdens IF FF',
    'AIK Fotboll':'AIK Stockholm',
    'BK Häcken':'BK Häcken',
    'Norrköping':'IFK Norrköping',
    'Östersunds FK':'Őstersund FK',
    'Hammarby IF':'Hammarby IF',
    'Sirius IK':'IK Sirius Uppsala',
    'Örebro SK':'Őrebro SK',
    'IF Elfsborg':'IF Elfsborg',
    'IFK Göteborg':'IFK Göteborg',
    'Kalmar FF':'Kalmar FF',
    'GIF Sundsvall':'GIF Sundsvall',
    'Jönköpings Södra':'Jönköpings Södra IF',
    'Halmstads BK':'Athletic FC United',

};
// The structure of our request call
// The first parameter is our URL
// The callback function takes 3 parameters: an error, response status code and the html
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
                            if (namesOfTeams[homeTeam] === Team1 && namesOfTeams[awayTeam] === Team2) {
                                fixture['predictionVitisport'] = definePrediction(predictionProbT1, predictionProbDraw, predictionProbT2)
                                fixture['predictionVitiProbT1'] = parseInt(predictionProbT1);
                                fixture['predictionVitiProbDraw'] = parseInt(predictionProbDraw);
                                fixture['predictionVitiProbT2'] = parseInt(predictionProbT2);
                            }
                        }
                    }
                });
                resolve(fixtures);
            }
        })
    })
}

function definePrediction(probsH, probsD, probsA) {
    if (probsH > probsD) {
        if (probsH > probsA)
            return 1;
        else
            return 2;
    }
    else if (probsD > probsA)
        return 'X'
    else
        return 2;
}

module.exports = scrapeVitisport;