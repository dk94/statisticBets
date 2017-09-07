var express = require('express');
var app = express();
var path = require('path');
var port = process.env.port || 1340;
var request = require('request');
var cheerio = require('cheerio');

app.use(express.static(path.join(__dirname, 'pages')));
// middleware
app.get('/scraper', function (req, res) {
    // The URL we will scrape from - in our example Anchorman 2.

    url = 'https://www.forebet.com/en/football-tips-and-predictions-for-today';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
    var table;
    request(url, function (error, response, html) {

        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture
            const countriesSet = $('.schema tr .shortTag').map((i, e) =>
                e.children[0].data
            )
            const team1Set = $('.schema tr .tnms a').map((i, e) =>
                e.children[0].data
            )
            // console.log(team1);
            // console.log(team1.length +"Team1");

            const team2Set = $('.schema tr .tnms a').map((i, e) => {
                if (e.children[2]) {
                    return e.children[2].data;
                }
            })

            const predictionsSet = $('.schema tr .predict').map((i, e) => 
                e.children[0].data
            )
            
            // console.log(team2);
            // console.log(team2.length +"Team2");
            table = "<table>"
            table += '<table>'
            res.send(table);
        }

    })

})

app.listen(port, function () {
    console.log('App listening on port ' + port);
});