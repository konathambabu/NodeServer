var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectId;
var jwt = require('jsonwebtoken');
const ValidateConnection = require('./ValidateDB');

router.post('/reg', function (req, res, next) {
    var data = req.body.data;
    var client = mongodb.MongoClient;
    var mongodbUrl = "mongodb://127.0.0.1:27017"
    client.connect(mongodbUrl, async function (err, server) {
        if (err) { err.send('mongodb , connection error:' + err) }
        else {
            var db = server.db('school')
            var stdCollection = db.collection('students');
            stdCollection.insertOne(data, function (error, result) {
                if (error)
                    res.send(error)
                else
                    res.send(result)
            });
        }
    });
});

router.post('/signin', function (req, res, next) {
    data = req.body.data;
    
    ValidateConnection(res, async function (db) {
        var scollection = await db.collection('students').find({"uid": data.uid, pwd: data.pwd}).toArray(); // "uid": data.uid, pwd: data.pwd 
        if(scollection !=undefined && scollection !=null && scollection.length > 0)
        {
            var token = jwt.sign({ data }, 'my-token');
            res.send(token);
        }
        else{
            res.send("Invalid user name or password");
        }
    
       // scollection[0].token = token;
      //  res.send(scollection);
     
    });
})

router.get('/getall', function (req, res, next) {
    var token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "my-token", function (e, s) {
            if (e)
                req.send('Invalid Token')
            else
                next()
        })
    }
    else
        res.send('Missing Token')
}, function (req, res, next) {
    ValidateConnection(res, async function (db) {
        var scollection = await db.collection('students').find({}).toArray();
        res.send(scollection);
    });
})
module.exports = router;


