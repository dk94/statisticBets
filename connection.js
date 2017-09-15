var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017/mydb";

module.exports = function connection(callback) {
     MongoClient.connect(url, callback);
}