var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

async function getcomments(req, res){
    if (!req.body.commentid || req.body.commentid.length != 24){
        res.status(400);
        return;
    }
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    let db = client.db('video');
    let col = db.collection('comments');
    let res1 = await col.findOne({_id: new ObjectID(req.body.commentid)});
    if (!res1){
        res.status(404).send('No comment found');
        return;
    }
    let result = await col.find({replyto: req.body.commentid}).toArray();
    const result_ = {
        org: res1,
        replies: result
    };
    res.status(200).send(result_);
    return;
}
exports.get = getcomments;