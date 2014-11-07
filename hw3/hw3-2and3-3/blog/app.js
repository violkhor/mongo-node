var express = require('express')
  , app = express() // Web framework to handle routing requests
  , cons = require('consolidate') // Templating library adapter for Express
  , MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
    , cookieparser = require('cookie-parser')
    , bodyparser = require('body-parser')
  , routes = require('./routes'); // Routes for our application

MongoClient.connect('mongodb://192.168.49.128:27017/blog', function(err, db) {
    "use strict";
    if(err) throw err;

    // Register our templating engine
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    app.use(cookieparser());

    // Express middleware to populate 'req.body' so we can access POST variables
    app.use(bodyparser.urlencoded({
        extended: true
    }));

    // Application routes
    routes(app, db);

    app.listen(8082);
    console.log('Express server listening on port 8082');
});
