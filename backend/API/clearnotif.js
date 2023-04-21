var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

async function clear(req, res){
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    let db = client.db('video');
    let col = db.collection('notifications');

    let data = await col.deleteMany({user: req.user});
    if (!data.acknowledged){
        res.status(404).send("Not Found");
        return;
    }
    res.status(200).send("Deleted");
}
exports.x = clear;