var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectId;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";

async function gencomment(videoid, byuserid) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("notifications");
    let colc = db.collection("video");
    let vid = await colc.findOne({ _id: new ObjectID(videoid) });
    if (!vid) {
        return;
    }
    const obj = {
        user: vid.by,
        type: "comment",
        by: byuserid,
        videoid: videoid,
        commentid: "",
    };
    await col.insertOne(obj);
    client.close()
    return;
}

async function genreply(commentid, byuserid) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("notifications");
    let colc = db.collection("comments");
    //let colv = db.collection('video');
    let vid = await colc.findOne({ _id: new ObjectID(commentid) });
    if (!vid) {
        return;
    }
    const obj = {
        user: vid.user,
        type: "reply",
        by: byuserid,
        videoid: vid.video,
        commentid: commentid,
    };
    await col.insertOne(obj);
    client.close()
    return;
}
exports.reply = genreply;
exports.comment = gencomment;
