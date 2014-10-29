/**
 * Created by SC on 2014-10-28.
 */
var MongoClient = require('mongodb').MongoClient, request = require('request');

MongoClient.connect('mongodb://192.168.49.128:27017/course', function (err, db) {
    if (err) throw err;
    request('http://www.reddit.com/r/technology/.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);
            var stories = obj.data.children.map(function (story) {
                return story.data;
            });
            db.collection('reddit').insert(stories, function (err, data) {
                if (err) throw err;
                console.dir(data);
                db.close();
            });
        }
    });
});