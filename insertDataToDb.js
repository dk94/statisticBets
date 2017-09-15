const connection = require('./connection');

module.exports = function insertData(data) {
    var newConnection = connection(function (err, db) {
        if (err) throw err;
        var cust = db.collection("customers2");
        return data.map((document) => {
            cust.update(document, Object.assign(document, {result:'Not played' }), { upsert: true, ordered:true})   
        })

    });
}