var MongoClient = require("mongodb").MongoClient;
var url =
    process.env.DB_SECRET;
var ObjectID = require("mongodb").ObjectId;
var TS = require('mongodb').Timestamp;

async function updatePosition(req, res){
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
    let getInitData = await col.findOne({userId: req.userId, podcastId: req.body.podcastId});
    if (!getInitData){
        const insobj = {
            userId: req.userId,
            podcastId: req.body.podcastId,
            activeListen: true,
            liked: true,
            position: 0,
            completed: false,
            lastAccess: new TS({t: Math.round(dt.getTime()/1000), i: 0})
        }
        let conf = await col.insertOne(insobj);
        if (!conf.acknowledged){
            res.send({success: false, message: "Server Error!"});
            return;    
        }
        res.send({success: true, message: "updated"});
        return;
    }
    let updt = await col.updateOne({userId: req.userId, podcastId: req.body.podcastId}, {$set: {lastAccess: new TS({t: Math.round(dt.getTime()/1000), i: 0}), position: req.body.position, activeListen: true}})
    if (!updt.acknowledged){
        res.send({success: false, message: "Server Error!"});
    }
    else res.send({success: true, message: "Updated!"});
}
exports.x = updatePosition;