const connection = require('./connection');

module.exports = function insertData(data){
    var newConnection = connection(function (err, db) {
        if (err) throw err;
        var cust = db.collection("customers2");
        cust.insert(data)
            .then((result)=>console.log(result));
    });
}