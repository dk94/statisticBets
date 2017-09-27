const connection = require('./connection');

module.exports = function insertData(data) {
    var newConnection = connection(function (err, db) {
        if (err) throw err;
        Promise.all(forebetStrategy(data, db))
            .then(() =>
                vitisportStrategy(data, db)
            )
            .then(() =>
                forebetValueBets(data, db, 'forebetValueBetsBiggerThan1', 1)
            )
            .then(() =>
                forebetValueBets(data, db, 'forebetValueBetsBiggerThan3', 3)
            )
            .then(() =>
                forebetValueBets(data, db, 'forebetValueBetsBiggerThan5', 5)
            )
            .then(() =>
                forebetValueBets(data, db, 'forebetValueBetsBiggerThan7', 7)
            )
            .then(() =>
                vitisportValueBets(data, db, 'vitisportValueBetsBiggerThan1', 1)
            )
            .then(() =>
                vitisportValueBets(data, db, 'vitisportValueBetsBiggerThan3', 3)
            )
            .then(() =>
                vitisportValueBets(data, db, 'vitisportValueBetsBiggerThan5', 5)
            )
            .then(() =>
                vitisportValueBets(data, db, 'vitisportValueBetsBiggerThan7', 7)
            )



    });
}

function forebetStrategy(data, db) {
    var dbForebet = db.collection("forebetStrategy");


    return data.map((document) => {
        const odds = defineTypeOfOdds(document.predictionForbet, document.homeTeamOdds, document.drawOdds, document.awayTeamOdds);
        return dbForebet.update(
            {
                homeTeamName: document.homeTeamName,
                awayTeamName: document.awayTeamName,
                date: document.date
            },
            {
                homeTeamName: document.homeTeamName,
                awayTeamName: document.awayTeamName,
                date: document.date,
                natLeague: document.natLeague,
                predictionForbetProbT1: document.predictionForbetProbT1,
                predictionForbetProbDraw: document.predictionForbetProbDraw,
                predictionForbetProbT2: document.predictionForbetProbT2,
                prediction: document.predictionForbet,
                odds,
                result: document.result

            },
            {
                upsert: true,
                ordered: true
            })
    })
}
function vitisportStrategy(data, db) {
    var dbVitisport = db.collection("vitisportStrategy");


    return data.map((document) => {
        const odds = defineTypeOfOdds(document.predictionVitisport, document.homeTeamOdds, document.drawOdds, document.awayTeamOdds);
        return dbVitisport.update(
            {
                homeTeamName: document.homeTeamName,
                awayTeamName: document.awayTeamName,
                date: document.date
            },
            {
                homeTeamName: document.homeTeamName,
                awayTeamName: document.awayTeamName,
                date: document.date,
                natLeague: document.natLeague,
                predictionVitiProbT1: document.predictionVitiProbT1,
                predictionVitiProbDraw: document.predictionVitiProbDraw,
                predictionVitiProbT2: document.predictionVitiProbT2,
                prediction: document.predictionVitisport,
                odds,
                result: document.result

            },
            {
                upsert: true,
                ordered: true
            }
        )
    })
}
function forebetValueBets(data, db, nameOfDb, tollerance) {
    const dbforebetValueBetsBiggerThan = db.collection(nameOfDb);

    return data.map((document) => {
        const valueForHomeTeam = document.predictionForbetProbT1 - (1 / document.homeTeamOdds * 100);
        const valueForDraw = document.predictionForbetProbDraw - (1 / document.drawOdds * 100);
        const valueForAwayTeam = document.predictionForbetProbT2 - (1 / document.awayTeamOdds * 100);
        let [prediction, value] = checkTollerance(tollerance, valueForHomeTeam, valueForDraw, valueForAwayTeam);
        const odds = defineTypeOfOdds(prediction, document.homeTeamOdds, document.drawOdds, document.awayTeamOdds);

        if (prediction) {

            return dbforebetValueBetsBiggerThan.update(
                {
                    homeTeamName: document.homeTeamName,
                    awayTeamName: document.awayTeamName,
                    date: document.date
                },
                {
                    homeTeamName: document.homeTeamName,
                    awayTeamName: document.awayTeamName,
                    date: document.date,
                    natLeague: document.natLeague,
                    predictionForbet: document.predictionForbet,
                    predictionForbetProbT1: document.predictionForbetProbT1,
                    predictionForbetProbDraw: document.predictionForbetProbDraw,
                    predictionForbetProbT2: document.predictionForbetProbT2,
                    odds,
                    prediction,
                    value,
                    result: document.result

                },
                {
                    upsert: true,
                    ordered: true
                }
            )
        }

    })
}

function vitisportValueBets(data, db, nameOfDb, tollerance) {
    const dbVitisportValueBetsBiggerThan = db.collection(nameOfDb);

    return data.map((document) => {

        const valueForHomeTeam = +document.predictionVitiProbT1 - (1 / document.homeTeamOdds * 100);
        const valueForDraw = +document.predictionVitiProbDraw - (1 / document.drawOdds * 100);
        const valueForAwayTeam = +document.predictionVitiProbT2 - (1 / document.awayTeamOdds * 100);
        let [prediction, value] = checkTollerance(tollerance, valueForHomeTeam, valueForDraw, valueForAwayTeam);
        const odds = defineTypeOfOdds(prediction, document.homeTeamOdds, document.drawOdds, document.awayTeamOdds);
        if (prediction) {
            return dbVitisportValueBetsBiggerThan.update(
                {
                    homeTeamName: document.homeTeamName,
                    awayTeamName: document.awayTeamName,
                    date: document.date
                },
                {
                    homeTeamName: document.homeTeamName,
                    awayTeamName: document.awayTeamName,
                    date: document.date,
                    natLeague: document.natLeague,
                    predictionVitisport: document.predictionVitisport,
                    predictionVitiProbT1: document.predictionVitiProbT1,
                    predictionVitiProbDraw: document.predictionVitiProbDraw,
                    predictionVitiProbT2: document.predictionVitiProbT2,
                    odds,
                    result: document.result,
                    prediction,
                    value


                },
                {
                    upsert: true,
                    ordered: true
                }
            )
        }

    })
}

function checkTollerance(tollerance, valueForHomeTeam, valueForDraw, valueForAwayTeam) {
    let prediction;
    let value;
    if (valueForHomeTeam > tollerance || valueForDraw > tollerance || valueForAwayTeam > tollerance) {
        if (valueForHomeTeam >= valueForDraw) {
            if (valueForHomeTeam >= valueForAwayTeam) {
                prediction = 1;
                value = valueForHomeTeam;
            }
            else {
                prediction = 2;
                value = valueForAwayTeam;
            }
        }
        else if (valueForDraw >= valueForAwayTeam) {
            prediction = 'X';
            value = valueForDraw;
        }
        else {
            prediction = 2;
            value = valueForAwayTeam;
        }
    }
    return new Array(prediction, value);
}

function defineTypeOfOdds(prediction, oddsH, oddsD, oddsA) {
    if (prediction == '1')
        return oddsH;
    else if (prediction == 'X')
        return oddsD;
    else
        return oddsA;

}