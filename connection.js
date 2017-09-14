var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017/mydb";

module.exports = function connection() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.createCollection("customers", function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });
}