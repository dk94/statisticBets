var request = require('request');
var cheerio = require('cheerio');
const url = 'http://www.hot-odds.com/Football';
const namesOfTeams = {
    //Germany1
    'Schalke 04': 'FC Schalke 04',
    'Bayer Leverkusen': 'Bayer 04 Leverkusen',
    'Hannover 96': 'Hannover 96',
    'Mönchengladbach': 'Borussia Mönchengladbach',
    'FC Augsburg': 'FC Augsburg',
    'Borussia Dortmund': 'Borussia Dortmund',
    'Eintracht Frankfurt': 'Eintracht Frankfurt',
    'VfB Stuttgart': 'VfB Stuttgart',
    'VfL Wolfsburg': 'VfL Wolfsburg',
    'Mainz': '1. FSV Mainz',
    'Hamburger SV': 'Hamburger SV',
    'Werder Bremen': 'SV Werder Bremen',
    'RB Leipzig': 'RB Leipzig',
    '1.FC Köln': '1. FC Köln',
    'Hertha BSC': 'Hertha BSC',
    'Bayern München': 'FC Bayern München',
    'SC Freiburg': 'Sport-Club Freiburg',
    'Hoffenheim': 'TSG 1899 Hoffenheim',




    //Spain1
    'Celta de Vigo': 'Celta de Vigo',
    'Girona FC': 'Girona',
    'Levante UD': 'Levante',
    'Deportivo Alavés': 'Alaves',
    'Getafe CF': 'Getafe',
    'Dep. La Coruna': 'Deportivo La Coruña',
    'Sevilla FC': 'Sevilla',
    'Málaga CF': 'Málaga',
    'Levante UD': 'Levante',
    'Deportivo Alavés': 'Alavés',
    'CD Leganes': 'Leganés',
    'Atlético Madrid': 'Atlético Madrid',
    'FC Barcelona': 'FC Barcelona',
    'UD Las Palmas': 'Las Palmas',
    'Valencia CF': 'Valencia',
    'Athletic Bilbao': 'Athletic Bilbao',
    'Villarreal CF': 'Villarreal',
    'SD Eibar': 'Eibar',
    'Real Madrid': 'Real Madrid',
    'RCD Espanyol': 'Espanyol',


    //France1
    'AS Monaco': 'Monaco',
    'Montpellier HSC': 'Montpellier',
    'Paris St. Germain': 'Paris SG',
    'Girondins Bordeaux': 'Bordeaux',
    'Amiens SC': 'Amiens',
    'Lille OSC': 'Lille',
    'Dijon FCO': 'Dijon',
    'Strasbourg': 'Strasbourg',
    'Guingamp': 'Guingamp',
    'Toulouse FC': 'Toulouse',
    'FC Metz': 'Metz',
    'FC Nantes': 'Nantes',
    'SM Caen': 'Caen',
    'Stade Rennais': 'Rennes',
    'Troyes AC': 'Troyes',
    'AS Saint-Étienne': 'Saint-Étienne',
    'Angers SCO': 'Angers',
    'Lyon': 'Lyon',
    'Olympique Marseille': 'Marseille',
    'OGC Nice': 'Nice',

    //Belgium1
    'Sint-Truiden': 'Sint-Truiden',
    'Sporting Charleroi': 'Sporting Charleroi',
    'Eupen': 'K.AS.Eupen',
    'Racing Genk': 'KRC Genk',
    'Mouscron-Peruwelz': 'Mouscron-Peruwelz',
    'KV Mechelen': 'YR KV Mechelen',
    'Waasland-Beveren': 'Waasland-Beveren',
    'Royal Antwerp': 'R.Antwerp FC',
    'KV Kortrijk': 'KV Kortrijk',
    'KV Oostende': 'KV Oostende',
    'Club Brugge': 'Club Brugge KV',
    'KAA Gent': 'KAA Gent',
    'Anderlecht': 'RSC Anderlecht',
    'Standard Liège': 'Standard de Liege',
    'Zulte Waregem': 'Zulte Waregem',
    'KSC Lokeren': 'Sporting Lokeren',

    //Italy1
    'Inter Milano': 'Inter',
    'Benevento Calcio': 'Benevento',
    'ChievoVerona': 'Chievo',
    'Fiorentina': 'Fiorentina',
    'Lazio': 'Lazio',
    'Sassuolo Calcio': 'Sassuolo',
    'SPAL 1907': 'SPAL',
    'FC Crotone': 'Crotone',
    'Torino FC': 'Torino',
    'Hellas Verona': 'Hellas Verona',
    'AC Milan': 'AC Milan',
    'AS Roma': 'AS Roma',
    'Atalanta Bergamo': 'Atalanta',
    'Juventus FC': 'Juventus',



    //Czech1
    'Teplice': 'FK Teplice',
    'Slovan Liberec': 'FC Slovan Liberec',
    'Slovacko': '1.FC Slovacko',
    'MFK OKD Karvina': 'MFK OKD Karvina',
    'Dukla Praha': 'FK Dukla Praha',
    'Sparta Praha': 'AC Sparta Praha',
    'Viktoria Plzen': 'FC Viktoria Plzen',
    'Bohemians 1905': 'Bohemians 1905',
    'FK Jablonec': 'FK Baumit Jablonec',
    'Mlada Boleslav': 'FK Mlada Boleslav',
    'Jihlava': 'FC Vysocina Jihlava',
    'Sigma Olomouc': 'SK Sigma Olomouc',
    'Banik Ostrava': 'FC Banik Ostrava',
    'FK Zlin': 'Zlin',
    'Slavia Praha': 'SK Slavia Praha',
    '1. FC Brno': 'FC Zbrojovka Brno',

    //Denmark1
    'FC Helsingor': 'FC Helsingør',
    'AGF Aarhus': 'AGF',
    'Randers FC': 'Randers FC',
    'AC Horsens': 'AC Horsens',
    'Hobro IK': 'Hobro IK',
    'Odense BK': 'OB',
    'Brøndby IF': 'Brøndby',
    'SønderjyskE': 'SønderjyskE',
    'Lyngby BK': 'Lyngby',
    'FC København': 'FC København',
    'FC Midtjylland': 'FC Midtjylland',
    'AaB Aalborg': 'AaB',


    //Finland1
    'VPS Vaasa': 'VPS',
    'HIFK Helsinki': 'HIFK',
    'Inter Turku': 'FC Inter Turku',
    'KuPS Kuopio': 'KuPS',
    'Ilves Tampere': 'Ilves Tampere',
    'FC Lahti': 'FC Lahti',
    'HJK Helsinki': 'HJK',
    'PS Kemi': 'PS Kemi',
    'RoPS Rovaniemi': 'RoPS',
    'JJK Jyväskylä': 'JJK',
    'IFK Mariehamn': 'IFK Mariehamn',
    'Seinajoen JK': 'SJK',

    //Netherlands1
    'FC Twente': 'FC Twente',
    'Heracles Almelo': 'Heracles Almelo',
    'NAC Breda': 'NAC Breda',
    'ADO Den Haag': 'ADO Den Haag',
    'PEC Zwolle': 'PEC Zwolle',
    'FC Groningen': 'FC Groningen',
    'PSV Eindhoven': 'PSV Eindhoven',
    'Willem II Tilburg': 'Willem II',
    'SBV Excelsior': 'Excelsior',
    'VVV Venlo': 'VVV Venlo',
    'AFC Ajax': 'Ajax',
    'SC Heerenveen': 'SC Heerenveen',
    'FC Utrecht': 'FC Utrecht',
    'Vitesse Arnhem': 'Vitesse',
    'Sparta Rotterdam': 'Sparta Rotterdam',
    'Roda Kerkrade': 'Roda JC',



    //Poland1
    'Arka Gdynia': 'Arka Gdynia',
    'Cracovia': 'Cracovia Krakow',
    'Sandecja': 'Sandecja Nowy Sacz',
    'Slask Wroclaw': 'Slask Wroclaw',
    'Lechia Gdansk': 'Lechia Gdansk',
    'Zaglebie Lubin': 'Zaglebie Lubin',
    'Pogon Szczecin': 'MKS Pogon Szczecin',
    'Korona Kielce': 'Korona Kielce',
    'Wisla Krakow': 'Wisla Krakow',
    'Jagiellonia': 'Jagiellonia Bialystok',
    'Gornik Zabrze': 'Gornik Zabrze',
    'Piast Gliwice': 'Piast Gliwice',
    'Wisla Plock': 'Wisla Plock',
    'Nieciecza KS': 'Termalica BB Nieciecza',
    'Legia Warszawa': 'Legia Warszawa',
    'Lech Poznan': 'Lech Poznan',

    //Portugal1
    'GD Chaves': 'Chaves',
    'CD Tondela': 'Tondela',

    //Russia1
    'Arsenal Tula': 'Arsenal Tula',
    'FK Krasnodar': 'Krasnodar',
    'FK Tosno': 'FC Tosno',
    'Akhmat Groznyi': 'FC Akhmat Grozny',
    'Rubin Kazan': 'Rubin',
    'Amkar Perm': 'FC Amkar Perm',
    'Spartak Moscow': 'Spartak Moskva',
    'FK Ural': 'FC Ural Yekaterinburg',
    'CSKA Moscow': 'CSKA Moskva',
    'FK Ufa': 'FC Ufa',
    'Lokomotiv Moscow': 'Lokomotiv Moskva',
    'Dynamo Moscow': 'Dynamo Moskva',
    'Anzhi Makhachkala': 'FC Anzhi Makhachkala',
    'Zenit': 'Zenit St.Petersburg',

    //Greece1
    'Lamia FC': 'Lamia',
    'Panionios GSS': 'Panionios',


    //Denmark2
    'Vendsyssel FF': 'Vendsyssel FF',
    'Esbjerg fB': 'Esbjerg',






    //Scotland1
    'Hamilton Acad.': 'Hamilton',
    'Rangers FC': 'Glasgow Rangers',
    'Aberdeen FC': 'Aberdeen',
    'St Johnstone': 'St. Johnstone',
    'Celtic FC': 'Celtic',
    'Hibernian FC': 'Hibernian',
    'Dundee FC': 'Dundee FC',
    'Hearts FC': 'Hearts',
    'Motherwell FC': 'Motherwell',
    'Partick Thistle': 'Partick Thistle',
    'Kilmarnock FC': 'Kilmarnock',
    'Ross County': 'Ross County',


    //Sweden1
    'IFK Göteborg': 'IFK Göteborg',
    'Sirius IK': 'IK Sirius FK',
    'Östersunds FK': 'Östersunds FK',
    'BK Häcken': 'BK Häcken',
    'GIF Sundsvall': 'GIF Sundsvall',
    'Djurgårdens IF': 'Djurgårdens IF',
    'Malmö FF': 'Malmö FF',
    'Halmstads BK': 'Halmstads BK',
    'AIK Fotboll': 'AIK',
    'IF Elfsborg': 'IF Elfsborg',
    'Hammarby IF': 'Hammarby',
    'Norrköping': 'IFK Norrköping',
    'Örebro SK': 'Örebro SK',
    'Kalmar FF': 'Kalmar FF',

    //Turkey1
    'Akhisar Bld.': 'Akhisar Bld. Genclik',
    'Fenerbahçe SK': 'Fenerbahçe',
    'Sivasspor': 'Sivasspor',
    'Antalyaspor': 'Antalyaspor',
    'Osmanlispor FK': 'Osmanlispor',
    'Kasımpaşa SK': 'Kasimpasa',
    'Bursaspor': 'Bursaspor',
    'Kayserispor': 'Kayserispor',
    'Galatasaray SK': 'Galatasaray',
    'Kardemir Karabuk': 'Kardemir Karabükspor',
    'Yeni Malatyaspor': 'Yeni Malatyaspor',
    'Konyaspor': 'Konyaspor',
    'Alanyaspor': 'Alanyaspor',
    'Genclerbirligi': 'Gençlerbirligi',
    'Trabzonspor': 'Trabzonspor',
    'Besiktas JK': 'Besiktas',
    'Göztepe Izmir': 'Göztepe',
    'Istanbul Basaksehir': 'Basaksehir',

    //Germany2
    'Ingolstadt': 'FC Ingolstadt 04',
    'SV Darmstadt': 'SV Darmstadt 98',
    'Kaiserslautern': '1. FC Kaiserslautern',
    'Greuther Fürth': 'SpVgg Greuther Fürth',
    'VfL Bochum': 'VfL Bochum 1848',
    'Holstein Kiel': 'Holstein Kiel',
    'Nürnberg': '1. FC Nürnberg',
    'Arminia Bielefeld': 'DSC Arminia Bielefeld',
    'Erzgebirge Aue': 'Erzgebirge Aue',
    'Union Berlin': '1. FC Union Berlin',
    'St. Pauli': 'FC St. Pauli',
    'E. Braunschweig': 'Eintracht Braunschweig',
    'Heidenheim': '1. FC Heidenheim 1846',
    'Dynamo Dresden': 'Dynamo Dresden',
    'SV Sandhausen': 'SV Sandhausen',
    'Jahn Regensburg': 'SSV Jahn Regensburg',
    'Fortuna Düsseldorf': 'Fortuna Düsseldorf',
    'MSV Duisburg': 'MSV Duisburg',






    //England2
    'Fulham FC': 'Fulham',
    'QPR': 'Queens Park Rangers',
    'Aston Villa': 'Aston Villa',
    'Bolton Wanderers': 'Bolton Wanderers',
    'Burton Albion': 'Burton Albion',
    'Wolverhampton': 'Wolverhampton Wanderers',
    'Cardiff City': 'Cardiff City',
    'Derby County': 'Derby County',
    'Hull City': 'Hull City',
    'Birmingham City': 'Birmingham City',
    'Ipswich Town': 'Ipswich Town',
    'Bristol City': 'Bristol City',
    'Middlesbrough': 'Middlesbrough',
    'Brentford FC': 'Brentford',
    'Millwall FC': 'Millwall',
    'Barnsley': 'Barnsley',
    'Nottingham F.': 'Nottingham Forest',
    'Sheffield Utd': 'Sheffield United',
    'Preston NE': 'Preston North End',
    'Sunderland': 'Sunderland',
    'Reading FC': 'Reading',
    'Norwich City': 'Norwich City',
    'Sheffield Wed': 'Sheffield Wednesday',
    'Leeds United': 'Leeds United',


    //Norway1
    'Stabaek': 'Stabæk',
    'Valerenga': 'Vålerenga',
    'Odd BK': 'Odd BK',
    'FK Haugesund': 'Haugesund',
    'Sandefjord': 'Sandefjord',
    'Sogndal': 'Sogndal',
    'Aalesund FK': 'Aalesund FK',
    'Molde FK': 'Molde',
    'Tromso IL': 'Tromsø',
    'Lillestrom SK': 'Lillestrøm',
    'Viking FK': 'Viking',
    'Stromsgodset IF': 'Strømsgodset',
    'Rosenborg BK': 'Rosenborg',
    'Sarpsborg 08': 'Sarpsborg 08',

    //England1
    'Arsenal': 'Arsenal',
    'Brighton': 'Brighton and Hove Albion',
    'Newcastle Utd': 'Newcastle United',
    'Liverpool FC': 'Liverpool',


    //Spain2
    'Cultural Leonesa': 'Cultural Leonesa',
    'UD Almería': 'Almería',
    'Real Valladolid': 'Valladolid',
    'Córdoba CF': 'Córdoba',
    'CD Numancia': 'Numancia',
    'Albacete Balompie': 'Albacete',
    'Real Zaragoza': 'Real Zaragoza',
    'La Hoya Lorca': 'La Hoya Lorca',
    'Cadiz CF': 'Cádiz',
    'SD Huesca': 'Huesca',
    'Rayo Vallecano': 'Rayo Vallecano',
    'CD Lugo': 'Lugo',
    'CD Tenerife': 'Tenerife',
    'CA Osasuna': 'Osasuna',
    'Sporting Gijón': 'Sporting Gijón',
    'Sevilla Atletico': 'Sevilla Atlético',
    'CF Reus Deportiu': 'Reus Deportiu',
    'Gimnàstic Tarragona': 'Gimnàstic Tarragona',
    'Barcelona B': 'Barcelona B',
    'Real Oviedo': 'Real Oviedo',
    'Real Zaragoza': 'Zaragoza',

    //Italy2
    'Parma FC': 'Parma',
    'Salernitana': 'Salernitana',
    'Ascoli': 'Ascoli',
    'Palermo': 'Palermo',
    'Avellino': 'Avellino',
    'Empoli FC': 'Empoli',
    'Brescia Calcio': 'Brescia',
    'Perugia Calcio': 'Perugia',
    'Carpi FC': 'Carpi',
    'Pescara': 'Pescara',
    'Cittadella': 'Cittadella',
    'Virtus Entella': 'Virtus Entella',
    'Pro Vercelli': 'Pro Vercelli',
    'Cesena': 'Cesena',
    'Spezia Calcio': 'Spezia',
    'AS Bari': 'Bari',
    'Ternana Calcio': 'Ternana',
    'Venezia FC': 'Venezia',
    'US Foggia': 'Foggia',
    'Novara': 'Novara',
    'Frosinone': 'Frosinone',
    'Cremonese': 'Cremonese',
    



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
    'Östers IF': 'Östers IF',
    'Örgryte IS': 'Örgryte IS',
    'IK Frej': 'IK Frej Täby',
    'IFK Värnamo': 'IFK Värnamo',
    'GAIS': 'GAIS',
    'Brommapojkarna': 'IF Brommapojkarna',
    'Dalkurd FF': 'Dalkurd FF',
    'Syrianska FC': 'Syrianska FC',
    'Degerfors IF': 'Degerfors IF',
    'Åtvidabergs FF': 'Åtvidabergs FF',
    'FC Trelleborg': 'Trelleborgs FF',
    'Varbergs BoIS': 'Varbergs BoIS FC',
    'Gefle IF': 'Gefle IF',
    'Helsingborg': 'Helsingborgs IF',



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
                    .catch(() => { console.log('res Tr') })


            }
        })
    })
}
module.exports = scrapeResults;