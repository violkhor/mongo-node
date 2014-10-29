var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://192.168.49.128:27017/course', function(err, db){
    if (err) throw err;
    var query = {'grade' : 100};
    var projection = {'name' : 1, '_id': 0};

    db.collection('grades').find(query, projection).toArray(function(err, docs){
        if (err) throw err;
        docs.forEach(function(doc){
            console.dir(doc);
            console.dir(doc.name + " got a good grade");
        });
        db.close();
    });
});