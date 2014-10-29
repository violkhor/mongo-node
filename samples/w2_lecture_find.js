var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://192.168.49.128:27017/course', function (err, db) {
    if (err) throw err;
    var query = {};
    db.collection('grades').findOne(query, function (err, doc) {
        if (err) throw err;
        console.dir(" ---- Simple Query ----")
        console.dir(doc);
    });

    // Converting cursor object into array
    db.collection('grades').find(query).toArray(function (err, docs) {
        if (err) throw err;
        console.dir("");
        console.dir(" ---- Converting cursor into object ----")
        console.dir(docs);
    });

    // Explicitly using a cursor
    var cursor = db.collection('grades').find(query);
    cursor.each(function (err, doc) {
        if (err) throw err;
        if (doc == null) {
            return db.close();
        }
        console.dir("");
        console.dir(" ---- Explicitly using a cursor ----")
        console.dir(doc.name + " got a good grade");
    });
});