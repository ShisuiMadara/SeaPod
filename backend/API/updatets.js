var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";
var ObjectID = require("mongodb").ObjectId;
var TS = require('mongodb').Timestamp;

async function updatePosition(){
    if (!req.body.podcastId  && req.body.position) {
        res.send({message: "Bad Request", success: false});
    }
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let dt = new Date();
    let db = client.db("seapod");
    let col = db.collection("userViewPodcast");
    let updt = await col.updateOne({userId: req.userId, podcastId: req.body.podcastId}, {$set: {lastAccess: new TS({t: Math.round(dt.getTime()/1000), i: 0}), position: req.body.position}})
    if (!updt.acknowledged){
        res.send({success: false, message: "Server Error!"});
    }
    else res.send({success: true, message: "Updated!"});
}