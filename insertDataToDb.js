const connection = require('./connection');

module.exports = function insertData(data) {
    var newConnection = connection(function (err, db) {
        if (err) throw err;
        return (forebetStratregy(data,db))
        
            
    });
}

function forebetStratregy(data, db) {
    var dbForebet = db.collection("forebetStrategy");


    return data.map((document) => {

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
                predictionForbet:document.predictionForbet,
                predictionForbetProbT1:document.predictionForbetProbT1,
                predictionForbetProbDraw:document.predictionForbetProbDraw,
                predictionForbetProbT2:document.predictionForbetProbT2,
                homeTeamOdds:document.homeTeamOdds,
                drawOdds:document.drawOdds,
                awayTeamOdds:document.awayTeamOdds,
                result: document.result

            },
            {
                upsert: true,
                ordered: true
            })
    })
}