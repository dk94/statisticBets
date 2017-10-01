var request = require('request');
var cheerio = require('cheerio');
const url = 'https://www.forebet.com/en/football-tips-and-predictions-for-england/premier-league/standing';
const url2 = 'http://www.vitibet.com/index.php?clanek=analyzy&sekce=fotbal&liga=anglie&lang=en';

// The structure of our request call
// The first parameter is our URL
// The callback function takes 3 parameters, an error, response status code and the html
function helper() {
    console.log(1);
    request(url, function (error, response, html) {
        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);

            const countriesSet = $('.standing-second-td').map((i, e) =>
                e.children[0].children[0].data
            ).get();
            // console.log(countriesSet);
            request(url2, function (error, response, html) {
                if (!error) {
                    var $ = cheerio.load(html);

                    const countriesSet2 = $(".tabulkaporadi tr").map((i, e) =>{
                        if(e.children[1].children[0].children[1]){
                            return e.children[1].children[0].children[1].data.trim();
                        }
                    }
                    ).get();
                //    console.log(countriesSet2);
                    const newArray = countriesSet.map((e,i)=>{
                        return(e + 'quoteHERE:quoteHERE' + countriesSet2[i]);
                    });
                    console.log(newArray);
                }
            })
        }
    });
}
module.exports = helper;