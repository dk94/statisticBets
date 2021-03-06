var request = require('request');
var cheerio = require('cheerio');
const url = 'http://www.vitisport.ru/index.php?clanek=quicktips&sekce=fotbal&lang=en';

const namesOfTeams = {
    //Spain1
    'FC Barcelona': 'FC Barcelona',
    'Atlético Madrid': 'Atlético de Madrid',
    'Sevilla FC': 'Sevilla FC',
    'Valencia CF': 'Valencia CF',
    'Real Betis': 'Real Betis Sevilla',
    'Real Madrid': 'Real Madrid CF',
    'CD Leganes': 'CD Leganés',
    'Real Sociedad': 'Real Sociedad',
    'Levante UD': 'Levante UD',
    'Getafe CF': 'Getafe CF',
    'Athletic Bilbao': 'Athletic Club Bilbao',
    'RCD Espanyol': 'Espanyol Barcelona',
    'Celta de Vigo': 'RC Celta Vigo',
    'Villarreal CF': 'Villarreal CF',
    'UD Las Palmas': 'UD Las Palmas',
    'SD Eibar': 'SD Eibar',
    'Girona FC': 'Girona FC',
    'Dep. La Coruna': 'Deportivo de La Coruňa',
    'Málaga CF': 'Malaga CF',
    'Deportivo Alavés': 'Deportivo Alavés',

    //France1
    'Paris St. Germain': 'Paris Saint - Germain',
    'AS Monaco': 'AS Monaco',
    'Girondins Bordeaux': 'Girondins de Bordeaux',
    'AS Saint-Étienne': 'AS de Saint Etienne',
    'Olympique Marseille': 'Olympique de Marseille',
    'FC Nantes': 'FC Nantes Atlantique',
    'Lyon': 'Olympique Lyonnais',
    'SM Caen': 'Stade Malherbe Caen',
    'OGC Nice': 'OGC Nice',
    'Guingamp': 'En Avant Guingamp',
    'Angers SCO': 'Angers SC l´Ouest',
    'Troyes AC': 'ES Troyes',
    'Montpellier HSC': 'Montpellier Hérault SC',
    'Toulouse FC': 'Toulouse FC',
    'Stade Rennais': 'Stade Rennais FC',
    'Amiens SC': 'Amiens SC',
    'Dijon FCO': 'Dijon Football Cote d´Or',
    'Lille OSC': 'Lille Olympique SC',
    'Strasbourg': 'Racing Club Strasbourg',
    'FC Metz': 'FC Metz',
    
    //Ireland1
    'Cork City':'Cork City',
    'Dundalk FC':'Dundalk FC',
    'Shamrock Rovers':'Shamrock Rovers',
    'Derry City':'Derry City',
    'Bray Wanderers':'Bray Wanderers',
    'Bohemians FC':'Bohemians Dublin',
    'Limerick FC':'Limerick FC',
    'St Patricks Dublin':'St. Patrick´s Athletic',
    'Galway United':'Galway United',
    'Sligo Rovers':'Sligo Rovers',
    'Finn Harps':'Finn Harps FC',
    'Drogheda Utd':'Drogheda United',
    
    //England3
    'Shrewsbury':'Shrewsbury Town',
    'Wigan Athletic':'Wigan Athletic',
    'Bradford City':'Bradford City',
    'Peterborough':'Peterborough United',
    'Charlton Athletic':'Charlton Athletic',
    'Blackburn Rovers':'Blackburn Rovers',
    'Scunthorpe Utd':'Scunthorpe United',
    'Rotherham':'Rotherham United',
    'Blackpool':'Blackpool FC',
    'Milton Keynes Dons':'Milton Keynes FC',
    'Fleetwood Town':'Fleetwood Town',
    'Southend Utd':'Southend United',
    'Oxford United':'Oxford United',
    'Bristol Rovers':'Bristol Rovers',
    'Portsmouth':'Portsmouth',
    'Walsall FC':'Walsall FC',
    'Rochdale':'Rochdale AFC',
    'Oldham Athletic':'Oldham Athletic',
    'Doncaster Rovers':'Doncaster Rovers',
    'Bury FC':'Bury FC',
    'AFC Wimbledon':'AFC Wimbledon',
    'Northampton':'Northampton Town',
    'Gillingham':'Gillingham FC',
    'Plymouth Argyle':'Plymouth Argyle',


    //England4
    'Notts County':'Notts County',
    'Exeter City':'Exeter City',
    'Accrington Stanley':'Accrington Stanley',
    'Coventry City':'Coventry City',
    'Luton Town':'Luton Town',
    'Stevenage FC':'Stevenage Borough',
    'Wycombe':'Wycombe Wanderers',
    'Mansfield':'Mansfield Town',
    'Swindon Town':'Swindon Town',
    'Newport County':'Newport County',
    'Lincoln City':'Lincoln City',
    'Cambridge Utd':'Cambridge United',
    'Cheltenham':'Cheltenham Town',
    'Carlisle Utd':'Carlisle United',
    'Grimsby Town':'Grimsby Town',
    'Colchester Utd':'Colchester United',
    'Yeovil Town':'Yeovil Town',
    'Barnet':'Barnet FC',
    'Crewe Alexandra':'Crewe Alexandra',
    'Crawley Town':'Crawley Town',
    'Morecambe FC':'Morecambe FC',
    'Port Vale':'Port Vale FC',
    'Chesterfield':'Chesterfield FC',
    'Forest Green':'Forest Green Rovers',



    //Belgium1
    'Club Brugge': 'Club Brugge KV',
    'Sporting Charleroi': 'Royal Charleroi SK',
    'Zulte Waregem': 'SV Zulte Waregem',
    'Mouscron-Peruwelz': 'Mouscron Peruwelz',
    'Sint-Truiden': 'Truidense',
    'Royal Antwerp': 'Royal Antwerp FC',
    'Anderlecht': 'RSC Anderlecht Brussel',
    'Waasland-Beveren': 'Red Star Waasland',
    'Racing Genk': 'KRC Genk',
    'KV Kortrijk': 'KV Kortrijk',
    'Standard Liège': 'Standard de Liege',
    'KV Mechelen': 'KV Mechelen',
    'KSC Lokeren': 'Sporting Lokeren',
    'KAA Gent': 'KAA Gent',
    'Eupen': 'AS Eupen',
    'KV Oostende': 'KV Oostende',

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

    //Netherland1
    'PSV Eindhoven': 'PSV Eidhoven',
    'SC Heerenveen': 'SC Heerenveen',
    'Vitesse Arnhem': 'BV Vitesse Arnhem',
    'Feyenoord': 'Feyenoord Rotterdam',
    'AZ Alkmaar': 'AZ Alkmaar',
    'PEC Zwolle': 'FC Zwolle',
    'AFC Ajax': 'Ajax Amsterdam',
    'VVV Venlo': 'VVV Venlo',
    'FC Utrecht': 'FC Utrecht',
    'Heracles Almelo': 'Heracles Almelo',
    'FC Groningen': 'FC Groningen',
    'SBV Excelsior': 'Excelsior Rotterdam',
    'NAC Breda': 'NAC Breda',
    'ADO Den Haag': 'ADO Den Haag',
    'Sparta Rotterdam': 'Sparta Rotterdam',
    'FC Twente': 'FC Twente ´65',
    'Willem II Tilburg': 'Willem II Tilburg',
    'Roda Kerkrade': 'Roda JC Kerkrade',

    //Netherland2
    'Jong Ajax': 'Ajax Amsterdam (jun.)',
    'Fortuna Sittard': 'Fortuna Sittard',
    'MVV Maastricht': 'MVV Maastricht',
    'FC Oss': 'TOP Oss',
    'Jong AZ Alkmaar': 'AZ Alkmaar (jun.)',
    'De Graafschap': 'De Graafschap',
    'NEC Nijmegen': 'NEC Nijmegen',
    'Jong PSV': 'PSV Eidhoven (jun.)',
    'FC Emmen': 'FC Emmen',
    'SC Telstar': 'Stormvogels Telstar',
    'SC Cambuur': 'Cambuur Leeuwarden',
    'FC Dordrecht': 'FC Dordrecht',
    'FC Den Bosch': 'FC Den Bosch',
    'Almere City FC': 'Almere City FC',
    'FC Eindhoven': 'FC Eindhoven',
    'Jong Utrecht': 'FC Utrecht (jun.)',
    'Go Ahead Eagles': 'Go Ahead Eagles',
    'FC Volendam': 'FC Volendam',
    'RKC Waalwijk': 'RKC Waalwijk',
    'Helmond Sport': 'Helmond Sport',

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
    'MSV Duisburg': 'MSV Duisburg',
    'Heidenheim': '1. FC Heidenheim 1846',
    'Ingolstadt': 'FC Ingolstadt 04',
    'Greuther Fürth': 'SpVgg Greuther Fürth',
    'Kaiserslautern': '1.FC Kaiserslautern',

    //Sweden1
    'Malmö FF': 'Malmo FF',
    'Djurgårdens IF': 'Djurgärdens IF FF',
    'AIK Fotboll': 'AIK Stockholm',
    'BK Häcken': 'BK Häcken',
    'Norrköping': 'IFK Norrköping',
    'Östersunds FK': 'Őstersund FK',
    'Hammarby IF': 'Hammarby IF',
    'Sirius IK': 'IK Sirius Uppsala',
    'Örebro SK': 'Őrebro SK',
    'IF Elfsborg': 'IF Elfsborg',
    'IFK Göteborg': 'IFK Göteborg',
    'Kalmar FF': 'Kalmar FF',
    'GIF Sundsvall': 'GIF Sundsvall',
    'Jönköpings Södra': 'Jönköpings Södra IF',
    'Halmstads BK': 'Halmstads BK',
    'AFC Eskilstuna':'Athletic FC United',
    
    

    //Czech1
    'Viktoria Plzen': 'FC Viktoria Plzeň',
    'Sigma Olomouc': 'SK Sigma Olomouc',
    'Slavia Praha': 'SK Slavia Praha',
    'Sparta Praha': 'AC Sparta Praha',
    'Slovan Liberec': 'FC Slovan Liberec',
    'FK Jablonec': 'FK Jablonec 97',
    'FK Zlin': 'FC Tescoma Zlín',
    'Bohemians 1905': 'Bohemians 1905 Praha',
    'Dukla Praha': 'FK Dukla Praha',
    'Teplice': 'FK Teplice',
    'Slovacko': '1. FC Slovácko',
    'MFK OKD Karvina': 'MFK Karviná',
    'Mlada Boleslav': 'FK Mladá Boleslav',
    'Jihlava': 'FC Vysočina Jihlava',
    'Banik Ostrava': 'FC Baník Ostrava',
    '1. FC Brno': '1. FC Brno',

    //Poland1
    'Gornik Zabrze': 'Górnik Zabrze',
    'Zaglebie Lubin': 'Zaglebie Lubin SSA',
    'Lech Poznan': 'KKS Lech Poznan',
    'Jagiellonia': 'Jagiellonia Bialystok',
    'Slask Wroclaw': 'Slask Wroclaw',
    'Legia Warszawa': 'Legia Warszawa',
    'Wisla Krakow': 'Wisla Krakow',
    'Korona Kielce': 'SSA Korona Kielce',
    'Sandecja': 'Sandecja Nowy Sacz',
    'Arka Gdynia': 'Arka Gdynia',
    'Wisla Plock': 'Wisla Plock',
    'Lechia Gdansk': 'Lechia Gdansk',
    'Pogon Szczecin': 'Pogon Szczecin',
    'Nieciecza KS': 'LKS Nieciecza',
    'Piast Gliwice': 'Piast Gliwice',
    'Cracovia': 'KS Cracovia Krakow',

    //Portugal1
    'FC Porto': 'FC Porto',
    'Sporting Lisboa': 'Sporting CP Lisboa',
    'SL Benfica': 'SL Benfica Lisboa',
    'Marítimo': 'CS Marítimo',
    'Sporting Braga': 'SC de Braga',
    'Rio Ave': 'Rio Ave FC',
    'Belenenses': 'CF OS Belenenses',
    'Vitória Guimarães': 'Vitória de Guimaraes',
    'CD Feirense': 'CD Feirense',
    'Vitória Setúbal': 'Vitória FC Setúbal',
    'GD Chaves': 'GD Chaves',
    'Boavista FC': 'Boavista Porto',
    'Paços de Ferreira': 'FC Pacos de Ferreira',
    'Portimonense SC': 'Portimonense SC',
    'GD Estoril': 'GD Estoril Praia',
    'Moreirense FC': 'Moreirense FC',
    'CD Tondela': 'CD Tondela',
    'CD Aves': 'CD Aves',

    //Scotland1
    'Celtic FC': 'Celtic Glasgow',
    'Aberdeen FC': 'Aberdeen FC',
    'St Johnstone': 'St. Johnstone',
    'Hibernian FC': 'Hibernian Edinburgh',
    'Rangers FC': 'Glasgow Rangers',
    'Motherwell FC': 'Motherwell FC',
    'Hearts FC': 'Hearts of Midlothian',
    'Hamilton Acad.': 'Hamilton AFC',
    'Dundee FC': 'Dundee FC',
    'Ross County': 'Ross County',
    'Partick Thistle': 'Partick Thistle',
    'Kilmarnock FC': 'Kilmarnock FC',

    //Turkey1
    'Galatasaray SK': 'Galatasaray SK',
    'Besiktas JK': 'Beşiktaş J.K.',
    'Göztepe Izmir': 'Göztepespor',
    'Fenerbahçe SK': 'Fenerbahçe SK',
    'Kayserispor': 'Kayserispor',
    'Istanbul Basaksehir': 'Istanbul Basaksehir',
    'Akhisar Bld.': 'Akhisar Bld Spor',
    'Bursaspor': 'Bursaspor',
    'Trabzonspor': 'Trabzonspor',
    'Kasımpaşa SK': 'Kasimpasa Istanbul',
    'Yeni Malatyaspor': 'Malatyaspor',
    'Alanyaspor': 'Alanyaspor',
    'Antalyaspor': 'Antalyaspor',
    'Konyaspor': 'Konyaspor',
    'Sivasspor': 'Sivasspor',
    'Kardemir Karabuk': 'Kardemir DC Karabukspor',
    'Genclerbirligi': 'Gençlerbirligi S.K.',
    'Osmanlispor FK': 'Osmanlispor',

    //England1
    'Manchester City': 'Manchester City',
    'Manchester United': 'Manchester United',
    'Tottenham': 'Tottenham Hotspur',
    'Chelsea FC': 'Chelsea London',
    'Arsenal': 'Arsenal London',
    'Watford FC': 'FC Watford',
    'Liverpool FC': 'FC Liverpool',
    'Burnley FC': 'Burnley FC',
    'Newcastle Utd': 'Newcastle United',
    'West Bromwich': 'West Bromwich Albion',
    'Huddersfield': 'Huddersfield Town',
    'Southampton': 'Southampton FC',
    'Stoke City': 'Stoke City',
    'Brighton': 'Brighton Hove Albion',
    'West Ham': 'West Ham United',
    'Everton FC': 'Everton Liverpool',
    'Leicester City': 'Leicester City',
    'Swansea City': 'Swansea City',
    'Bournemouth': 'AFC Bournemouth',
    'Crystal Palace': 'Crystal Palace',



    //England2
    'Cardiff City': 'Cardiff City',
    'Sheffield Utd': 'Sheffield United',
    'Leeds United': 'Leeds United',
    'Wolverhampton': 'Wolverhampton Wanderers',
    'Preston NE': 'Preston North End',
    'Ipswich Town': 'Ipswich Town',
    'Bristol City': 'Bristol City',
    'Aston Villa': 'Aston Villa Birmingham',
    'Middlesbrough': 'Middlesbrough',
    'Norwich City': 'Norwich City',
    'Fulham FC': 'Fulham FC',
    'Millwall FC': 'Millwall FC',
    'QPR': 'Queens Park Rangers',
    'Sheffield Wed': 'Sheffield Wednesday',
    'Derby County': 'Derby County',
    'Nottingham F.': 'Nottingham Forest',
    'Hull City': 'Hull City AFC',
    'Reading FC': 'Reading FC',
    'Burton Albion': 'Burton Albion',
    'Brentford FC': 'Brentford FC',
    'Barnsley': 'Barnsley FC',
    'Birmingham City': 'Birmingham City',
    'Sunderland': 'Sunderland AFC',
    'Bolton Wanderers': 'Bolton Wanderers',

    //Norway1
    'Rosenborg BK': 'Rosenborg BK Trondheim',
    'Sarpsborg 08': 'Sparta Sarpsborg',
    'SK Brann': 'SK Brann Bergen',
    'Molde FK': 'Molde FK',
    'FK Haugesund': 'FK Haugesund',
    'Stromsgodset IF': 'Stromsgodset IF',
    'Odd BK': 'Odd Grenland BK',
    'Sandefjord': 'Sandefjord Fotball',
    'Stabaek': 'Stabaek IF',
    'Kristiansund BK': 'Kristiansund BK',
    'Lillestrom SK': 'Lilleström SK',
    'Valerenga': 'Valerenga IF Oslo',
    'Sogndal': 'Sogndal IS',
    'Aalesund FK': 'Aalesund FK',
    'Tromso IL': 'Tromsö IL',
    'Viking FK': 'FK Viking Stavanger',


    //Spain2
    'Sporting Gijón': 'Sporting de Gijón',
    'CD Numancia': 'CD Numancia de Soria',
    'Cadiz CF': 'Cádiz CF',
    'CD Tenerife': 'CD Tenerife',
    'UD Almería': 'UD Almería',
    'Real Valladolid': 'Real Valladolid CF',
    'CD Lugo': 'CD Lugo',
    'Cultural Leonesa': 'Cultural Leonesa',
    'CA Osasuna': 'Atlético Osasuna',
    'Rayo Vallecano': 'Rayo Vallecano Madrid',
    'Alcorcón': 'Alcorcon',
    'Real Oviedo': 'Real Oviedo',
    'Barcelona B': 'FC Barcelona B',
    'SD Huesca': 'SD Huesca',
    'Granada CF': 'Granada 74 CF',
    'CF Reus Deportiu': 'Reus Deportiu',
    'Córdoba CF': 'Córdoba CF',
    'Real Zaragoza': 'Real Zaragoza',
    'La Hoya Lorca': 'Lorca Deportiva CF',
    'Gimnàstic Tarragona': 'Gimnastic de Tarragona',
    'Albacete Balompie': 'Albacete Balompié',
    'Sevilla Atletico': 'Sevilla Atlético',

    //Italy1
    'SSC Napoli': 'SSC Napoli',
    'Juventus FC': 'Juventus Torino',
    'Inter Milano': 'Inter Milano',
    'Lazio': 'SS Lazio Roma',
    'AS Roma': 'AS Roma',
    'AC Milan': 'AC Milano',
    'Torino FC': 'FC Torino',
    'Sampdoria': 'UC Sampdoria Genoa',
    'Bologna FC': 'Bologna FC',
    'Atalanta Bergamo': 'Atalanta Bergamo',
    'ChievoVerona': 'AC Chievo Verona',
    'Fiorentina': 'ACF Fiorentina',
    'Udinese Calcio': 'Udinese Calcio',
    'Cagliari Calcio': 'Cagliari Calcio',
    'SPAL 1907': 'SPAL Ferrara',
    'Sassuolo Calcio': 'Sassuolo Calcio',
    'FC Crotone': 'FC Crotone',
    'Genoa': 'Genoa CFC',
    'Hellas Verona': 'Hellas Verona',
    'Benevento Calcio': 'Benevento Calcio',

    //Italy2
    'Perugia Calcio': 'Perugia Calcio',
    'Frosinone': 'Frosinone Calcio',
    'Palermo': 'US Citta di Palermo',
    'Empoli FC': 'Empoli FC',
    'Carpi FC': 'Carpi FC 1909',
    'Cittadella': 'AS Cittadella',
    'Avellino': 'AS Avellino 1912',
    'AS Bari': 'AS Bari',
    'Parma FC': 'AC Parma',
    'Cremonese': 'US Cremonese',
    'Pescara': 'Pescara Calcio',
    'Salernitana': 'Salernitana Calcio',
    'Venezia FC': 'Venezia FC',
    'Spezia Calcio': 'AC Spezia 1906',
    'Brescia Calcio': 'Brescia Calcio',
    'Novara': 'Novara Calcio',
    'Virtus Entella': 'Virtus Entella',
    'Ascoli': 'Ascoli Calcio',
    'US Foggia': 'Foggia Calcio',
    'Ternana Calcio': 'Ternana Calcio',
    'Cesena': 'AC Cesena',
    'Pro Vercelli': 'FC Pro Vercelli',

    //Austria2
    'Wiener Neustadt': 'FC Wiener Neustadt',
    'SV Ried': 'SV Josko Ried',
    'Hartberg': 'TSV Sparkasse Hartberg',
    'FC Liefering': 'FC Liefering',
    'Wacker Innsbruck': 'FC Wacker Innsbruck',
    'Kapfenberg': 'Kapfenberg SV',
    'Austria Lustenau': 'SC Austria Lustenau',
    'Blau Weiss Linz': 'BW Linz',
    'WSG Wattens': 'WSG Wattens',
    'Floridsdorfer AC': 'Floridsdorfer AC',

    //Sweden2
    'Dalkurd FF': 'Dalkurd FF',
    'Brommapojkarna': 'IF Brommapojkarna',
    'FC Trelleborg': 'Trelleborgs FF',
    'Helsingborg': 'Helsingborgs IF',
    'Falkenbergs FF': 'Falkenbergs FF',
    'Östers IF': 'Ősters Växjö IF',
    'Degerfors IF': 'Degerfors IF',
    'IFK Värnamo': 'IFK Värnamo',
    'Örgryte IS': 'Őrgryte IS',
    'Varbergs BoIS': 'Varbergs BoIS',
    'GAIS': 'GAIS Göteborg',
    'Gefle IF': 'Gefle IF',
    'Norrby IF': 'Norrby IF',
    'Syrianska FC': 'Syrianska Sodertalje',
    'IK Frej': 'IK Frej Täby',
    'Åtvidabergs FF': 'Ätvidabergs FF',

    //Greece1
    'AEK Athens': 'AEK Athens',
    'PAOK Salonica': 'PAOK Thessaloniki',
    'Panionios GSS': 'Panionios GSS',
    'Atromitos FC': 'Atromitos Peristeri',
    'Levadiakos': 'Levadiakos FC',
    'SKODA Xanthi': 'Skoda Xanthi FC',
    'Olympiakos Pireus': 'Olympiakos Piraeus',
    'Panetolikos': 'Panetolikos Agrinio',
    'Panathinaikos': 'Panathinaikos Athens',
    'Asteras Tripoli': 'Asteras Tripolis',
    'PAS Giannina': 'PAS Giannina',
    'AO Platanias': 'Platanias FC',
    'AO Kerkyra': 'AO Kerkira',
    'Lamia FC': 'PAS Lamia 1964',
    'AE Larisa': 'AEL Larisa',
    'Apollon Smyrni': 'Apollon Smyrnis',

    //Denmark2
    'Vejle BK': 'Vejle BK',
    'Thisted FC': 'Thisted FC',
    'Vendsyssel FF': 'Vendsyssel FF',
    'HB Køge': 'Koge BK',
    'Viborg FF': 'Viborg FF',
    'FC Fredericia': 'FC Fredericia',
    'Fremad Amager': 'BK Fremad Amager',
    'Esbjerg fB': 'Esbjerg FB',
    'Nykøbing FC': 'Nykobing FC',
    'FC Roskilde': 'FC Roskilde',
    'Brabrand IF': 'Brabrand FC',
    'Skive IK': 'Skive IK',
    
    //France2
    'Stade Reims':'Stade de Reims',
  'AC Ajaccio':'AC Ajaccio',
  'Paris FC':'Paris FC 98',
  'Le Havre AC':'Le Havre AC',
  'Nîmes Olympique':'Nimes Olympique',
  'FC Lorient':'FC Lorient Bretagne',
  'Clermont Foot':'Clermont Foot Auvergne',
  'Stade Brestois':'Stade Brestois 29',
  'FC Sochaux':'FC Sochaux Montbélliard',
  'US Orléans':'US Orléans',
  'Chamois Niortais':'Chamois Niort',
  'AJ Auxerre':'AJ Auxerre',
  'Valenciennes FC':'Valenciennes FC',
  'LB Châteauroux':'Berrichonne Chateauroux',
  'Gazélec Ajaccio':'Gazélec Ajaccio',
  'AS Nancy':'AS Nancy Lorraine',
  'Bourg-Peronnas':'FC Bourg Péronnas',
  'RC Lens':'Racing Club de Lens',
  'US Quevilly':'US Quevilly',
  'Tours FC':'Tours FC',


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
                            const predictionProbT1 = parseInt(countriesSet[i].children[6].children[0].data);
                            const predictionProbDraw = parseInt(countriesSet[i].children[7].children[0].data);
                            const predictionProbT2 = parseInt(countriesSet[i].children[8].children[0].data);
                            if (namesOfTeams[homeTeam] === Team1 && namesOfTeams[awayTeam] === Team2) {

                                fixture['predictionVitisport'] = definePrediction(predictionProbT1, predictionProbDraw, predictionProbT2)
                                fixture['predictionVitiProbT1'] = predictionProbT1;
                                fixture['predictionVitiProbDraw'] = predictionProbDraw;
                                fixture['predictionVitiProbT2'] = predictionProbT2;
                            }
                        }
                    }
                });
                console.log(fixtures);
                resolve(fixtures);
            }
        })
    })
}

function definePrediction(probsH, probsD, probsA) {
    if (!probsA || !probsD || !probsH)
        return '';
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