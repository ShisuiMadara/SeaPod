var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

async function gencomment(videoid, byuserid){
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    let db = client.db('video');
    let col = db.collection('notifications');
    let colc = db.collection('video');
    let vid = await colc.findOne({_id: new ObjectID(videoid)});
    if (!vid){
        return;
    }
    const obj = {
        user: vid.by,
        type: "comment",
        by: byuserid,
        videoid: videoid,
        commentid: ""
    };
    await col.insertOne(obj);
    return;
}

async function genreply(commentid, byuserid){
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    let db = client.db('video');
    let col = db.collection('notifications');
    let colc = db.collection('comments');
    //let colv = db.collection('video');
    let vid = await colc.findOne({_id: new ObjectID(commentid)});
    if (!vid){
        return;
    }
    const obj = {
        user: vid.user,
        type: "reply",
        by: byuserid,
        videoid: vid.video,
        commentid: commentid
    };
    await col.insertOne(obj);
    return;
}
exports.reply = genreply;
exports.comment = gencomment;