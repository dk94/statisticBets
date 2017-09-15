const connection = require('./connection');
var result;
module.exports = function selectDataFromDb() {
    return new Promise((resolve) => {
        connection(function (err, db) {
            if (err) throw err;
            var cust = db.collection("customers2");

            var promise = cust.find().toArray()
                .then((result) => resolve(result))
        })
    })
}

