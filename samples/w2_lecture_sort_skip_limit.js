/**
 * Created by SC on 2014-10-28.
 */

// In mongo,
// 1. Sort
// 2. Skip
// 3. Limit

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://192.168.49.128:27017/course', function (err, db) {
    if (err) throw err;
    var grades = db.collection('grades');
    var cursor = grades.find({});
    //
    // Doesn't matter which operation is coded first
    // Compiler will always ensure that  order is preserved ->
    // sort -> skip -> limit
    cursor.limit(4);
    cursor.skip(1);
    /*
     * Explanation
     * The reason for array instead of document: if array, order is preserved. If document, compiler can arrange the order.
     * */
    cursor.sort([
        ['grade', 1],
        ['student', -1]
    ]);
    cursor.each(function (err, doc) {
        if (err) throw err;
        if (doc == null) {
            return db.close();
        }

        console.dir(doc);

    });
    // Another way of doing
    var options = {'skip': 1, 'limit': 5, 'sort': [
        ['grade', 1],
        ['student', -1]
    ]};
    cursor = grades.find({}, {}, options);
});
