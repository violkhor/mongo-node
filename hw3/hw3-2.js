var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://192.168.49.128:27017/school', function (err, db) {
    if (err) throw err;
    var query = {};




    // Explicitly using a cursor
    var cursor = db.collection('students').find(query);
    cursor.each(function (err, doc) {
        if (err) throw err;
        if (doc == null) {
            return db.close();
        }
        scoreArray = doc.scores;
        min = 1000;
        for (var i = 0; i< scoreArray.length; i++){
            if (scoreArray[i].type == "homework"){
                min = scoreArray[i].score < min ? scoreArray[i].score : min;
            }
        }
        db.collection('students').update({"_id":doc._id},{$pull:{scores: {type:'homework', score:min}}}, function(err, count, status){
            console.log(status);
        });
    });
});