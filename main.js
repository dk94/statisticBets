var express = require('express');
var app = express();
var path = require('path');
var port = process.env.port || 1340;
const scrapeForbetAsync = require('./scrapeForbet.js');

app.use(express.static(path.join(__dirname, 'pages')));
// middleware
app.get('/scraper', function (req, res) {
    // The URL we will scrape from - in our example Anchorman 2.
        scrapeForbetAsync()
        .then((d)=>res.send(d));
})


app.listen(port, function () {
    console.log('App listening on port ' + port);
});