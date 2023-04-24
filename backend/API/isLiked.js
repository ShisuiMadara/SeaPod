var MongoClient = require("mongodb").MongoClient;
var url =
    process.env.DB_SECRET;
var ObjectID = require("mongodb").ObjectId;
var TS = require('mongodb').Timestamp;

async function isLiked(req, res){
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
    updtlk = await col2.findOne({_id: new ObjectID(req.body.podcastId)}, {projection: {likes: 1}});
    if (!updtlk){
        res.send({message: "Server Error!", success: false});
        return;
    }
    if (!getInitData) {
        res.send({success: true, liked: false, likes: updtlk.likes})
    }
    else res.send({success: true, liked: getInitData.liked, likes: updtlk.likes});
}
exports.x = isLiked;