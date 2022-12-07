
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var objectId=require('mongodb').ObjectId ;

router.post('/std-reg', function (req, res, next) {
    // take the data
    var data = req.body.data;
    // connect mongo db
    
    var mongoUrl = "mongodb://127.0.0.1:27017"//"mongodb://localhost:27017";
    var mongoclient = mongodb.MongoClient;
    mongoclient.connect(mongoUrl, function (err, server) {
        if (err) {
            res.send('Mongodb connection failed error'+ err)
        }
        else {
            var db = server.db("school")
            var stdCollection = db.collection("students")
            // perform operation
            stdCollection.insertOne(data, function (err, s) {
                   // send result to client
                if (err)
                    res.send(err)
                else
                    res.send(s)
            })
        }
    })

    


 

});

// get all
router.get('/std-get', function (req, res, next) {
    // take the data
    //var data = req.body.data;
    // connect mongo db
    
    var mongoUrl = "mongodb://127.0.0.1:27017"//"mongodb://localhost:27017";
    var mongoclient = mongodb.MongoClient;
    mongoclient.connect(mongoUrl,async function (err, server) {
        if (err) {
            res.send('Mongodb connection failed error'+ err)
        }
        else {
            var db = server.db("school")
            var stdCollection =await db.collection("students").find({}).toArray();
            // perform operation
            res.send(stdCollection);
        }
    })
})

 // get by id
 router.get('/std-get-byid', function (req, res, next) {
    var id=req.query.id;
    var obj={ "_id":objectId(id)}; 
    var mongoUrl = "mongodb://127.0.0.1:27017"//"mongodb://localhost:27017";
    var mongoclient = mongodb.MongoClient;
    mongoclient.connect(mongoUrl,async function (err, server) {
        if (err) {
            res.send('Mongodb connection failed error'+ err)
        }
        else {
            var db = server.db("school")
            var stdCollection =await db.collection("students").find({obj}).toArray();
            // perform operation
            res.send(stdCollection);
        }
    })

});



module.exports = router;