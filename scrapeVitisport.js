var request = require('request');
var cheerio = require('cheerio');
const Promise = require('bluebird');
const url = 'http://www.vitisport.ru/index.php?clanek=quicktips&sekce=fotbal&lang=en';

// The structure of our request call
// The first parameter is our URL
// The callback function takes 3 parameters, an error, response status code and the html
function scrapeVitisport() {
    var table;

    return new Promise(function (resolve, reject) {

        request(url, function (error, response, html) {
            // First we'll check to make sure no errors occurred when making the request
            if (!error) {
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

                var $ = cheerio.load(html);

                // Finally, we'll define the variables we're going to capture
                const countriesSet = $('.tabulkaquick .standardbunka').map((i, e) => {
                    if (e.children[0].data === '13.09')
                        return e.parent
                }
                ).get();

                let table = "<table class='table'>";

                for (var i = 0; i < countriesSet.length; i++) {
                    table += '<tr>'
                        + '<td>' + new Date() + '</td>'
                        + '<td>' + countriesSet[i].children[1].children[0].children[0].data + '</td>'
                        + '<td>' + countriesSet[i].children[2].children[0].children[0].data + '</td>'
                        + '<td>' + countriesSet[i].children[9].children[0].data + '</td>'
                        + '</tr>'
                   
                }
                table += '</table>'
                console.log(table);
                resolve (table);
                // console.log(team2);
                // console.log(team2.length +"Team2");
            }
        })
    })
}
module.exports = scrapeVitisport;