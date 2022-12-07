var mongodb = require('mongodb')
async function ValidateConnection( res, cb) {
    try {
        var mongodbUrl = "mongodb://127.0.0.1:27017";
        var client = mongodb.MongoClient;
        var server= await client.connect(mongodbUrl)
        var db=server.db('school');
        cb(db)
    } catch (error) {
        console.log('ValidateConnection: ', error);
        res.send(error);
    }
}
module.exports=ValidateConnection;