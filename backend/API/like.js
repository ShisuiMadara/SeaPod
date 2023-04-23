var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";
var ObjectID = require("mongodb").ObjectId;
var TS = require('mongodb').Timestamp;

async function like(req, res) {
    if (!req.body.podcastId) {
        res.sendStatus(400);
    }
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let dt = new Date();
    let db = client.db("seapod");
    let col = db.collection("userViewPodcast")
    let getInitData = await col.findOne({userId: req.userId, podcastId: req.body.podcastId});
    if (!getInitData){
        const data = {
            userId: req.userId,
            podcastId: req.body.podcastId,
            activeListen: true,
            liked: true,
            position: 0,
            completed: false,
            lastAccess: new TS({t: Math.round(dt.getTime()/1000), i: 0})
        }
        let conf = await col.insertOne(data);
        if (!conf.acknowledged){
            res.send({message: "Server Error!", success: false});
            return;
        }
        res.send({success: true, liked: true});
        return;
    }
    let conf = await col.updateOne({userId: req.userId, podcastId: req.podcastId}, {$set: {liked: !getInitData.liked}});
    if (!conf.acknowledged){
        res.send({message: "Server Error!", success: false});
        return;
    }
    res.send({liked: !getInitData.liked, success: true});
    return;
}
exports.x = like;