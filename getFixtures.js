var request = require('request');
const leagues = ['CL', 'ELC'];
module.exports = function getFixtures() {
    return leagues.map((el) => {
        return new Promise(function (resolve, reject) {
            request('http://api.football-data.org/v1/fixtures?league=' + el + '&timeFrame=n1', function (error, response, html) {


                    const body = JSON.parse(response.body);
                    const currentFixtures={league:el, fixtures:body.fixtures}
                    resolve(currentFixtures);
                
            })
        })
    })
}


