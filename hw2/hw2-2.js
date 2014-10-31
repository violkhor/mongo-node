/**
 * Created by SC on 2014-10-29.
 */
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://192.168.49.128:27017/weather', function (err, db) {
    // Explicitly using a cursor
    query = {"State":"Vermont"};
    field = {"_id": 0, "State":1, "Temperature":1};
    sort = [["State",1], ["Temperature" ,1]];
    var cursor = db.collection('data').find(query, field).sort(sort);
    cursor.each(function (err, doc){
        console.log(doc);
    });


});