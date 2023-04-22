var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";
var ObjectID = require("mongodb").ObjectId;

async function upload(req, res) {
    if (!req.body.name || !req.body.description || !req.body.genre || !req.body.video || !req.body.creatorId) {
        res.send({success: false, message: "Bad Request"});
        return;
    }
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        res.send({success: false, message: "Server Error"});
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("podcast");

    const obj = {
        name: req.body.name,
        creatorId: req.body.creatorId,
        genre: req.body.genre,
        likes: 0,
        fname: req.file.filename,
        video: req.body.video=="yes"?true:false,
        adminId: req.userId,
        description: req.body.description
    }

    let insObj = await col.insertOne(obj);
    if (!insObj.acknowledged) {
        res.send({success: false, message: "Server Error!"});
        return;
    }        
    res.status(200).send({success: true, message: "Podcast Inserted", id: insObj.insertedId.toString()});
}
exports.x = upload;
