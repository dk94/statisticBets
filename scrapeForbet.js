var request = require('request');
var cheerio = require('cheerio');
const Promise = require('bluebird');
const url = 'https://www.forebet.com/en/football-tips-and-predictions-for-today';

// The structure of our request call
// The first parameter is our URL
// The callback function takes 3 parameters, an error, response status code and the html
function scrapeForbet() {
    var table;

    return new Promise(function (resolve, reject) {

        request(url, function (error, response, html) {
            // First we'll check to make sure no errors occurred when making the request
            if (!error) {
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

                var $ = cheerio.load(html);

                // Finally, we'll define the variables we're going to capture
                const countriesSet = $('.schema tr .shortTag').map((i, e) =>
                    e.children[0].data
                ).get();
                const team1Set = $('.schema tr .tnms a').map((i, e) =>
                    e.children[0].data
                ).get();
                // console.log(team1);
                // console.log(team1.length +"Team1");

                const team2Set = $('.schema tr .tnms a').map((i, e) => {
                    if (e.children[2]) {
                        return e.children[2].data;
                    }
                }).get();

                const predictionsSet = $('.schema tr .predict').map((i, e) =>
                    e.children[0].data
                ).get();
                console.log(countriesSet);
                let table = "<table class='table'>";
                for (var i = 0; i < countriesSet.length; i++ ){
                    table+='<tr>'
                    +'<td>'+countriesSet[i]+'</td>'
                    +'<td>'+team1Set[i]+'</td>'
                    +'<td>'+team2Set[i]+'</td>'
                    +'<td>'+predictionsSet[i]+'</td>'
                    +'</tr>'
                }
                table+='</table>'
                console.log(table);
                resolve (table);
                // console.log(team2);
                // console.log(team2.length +"Team2");
            }
        })
    })
}
module.exports = scrapeForbet;