function outputCalculation(dbResults){
    dbResults.forEach((collection)=>{
        let bank = 0;
        let successfullBets = 0;
        collection.forEach((match)=>{
            match.isPassed = calculateMatch(match);
            if(match.isPassed){
                bank+=(match.odds * 5)-5;
                successfullBets++;
            }
            else
                bank-=5;
                collection.percentOfSuccessfullMatches = successfullBets/collection.length;
        })
        collection.bank=(bank);
    });
    return dbResults;
}

function calculateMatch(match){
    let result;
    if(match.result){
    result = match.result.split(' - ');
    if(result.length == 2){
        if(result[0]>result[1])
            return match.prediction == 1;
        else if(result[0] == result[1])
            return match.prediction === 'X'
        else
            return match.prediction == 2;
    }
    }
    else
        return false;
}

module.exports = outputCalculation;