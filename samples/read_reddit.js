var MongoClient = require('mongodb').MongoClient, request = require('request');

MongoClient.connect('mongodb://192.168.49.128:27017/course', function (err, db) {
    db.collection('reddit').findOne({}, function (err, doc) {
        console.log(doc);
    });
});