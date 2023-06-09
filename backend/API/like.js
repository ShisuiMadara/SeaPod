var MongoClient = require("mongodb").MongoClient;
var url =
    process.env.DB_SECRET;
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
    let col2 = db.collection("podcast")
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
        let updtlk = await col2.updateOne({_id: new ObjectID(req.body.podcastId)}, {$inc: {likes: 1}});
        if (!updtlk.acknowledged){
            res.send({message: "Server Error!", success: false});
            return;
        }
        res.send({success: true, liked: true});
        return;
    }
    let conf = await col.updateOne({userId: req.userId, podcastId: req.body.podcastId}, {$set: {liked: getInitData.liked===true?false:true}});
    if (!conf.acknowledged){
        res.send({message: "Server Error!", success: false});
        return;
    }
    let updtlk = await col2.updateOne({_id: new ObjectID(req.body.podcastId)}, {$inc: {likes: getInitData.liked===true?-1:1}});
    if (!updtlk.acknowledged){
        res.send({message: "Server Error!", success: false});
        return;
    }
    updtlk = await col2.findOne({_id: new ObjectID(req.body.podcastId)}, {projection: {likes: 1}});
    if (!updtlk){
        res.send({message: "Server Error!", success: false});
        return;
    }
    res.send({liked: !getInitData.liked, success: true, likes: updtlk.likes});
    return;
}
exports.x = like;