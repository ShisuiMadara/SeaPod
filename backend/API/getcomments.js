var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

async function getcomments(req, res){
    if (!req.body.videoid){
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
    let result = await col.find({video: req.body.videoid, reply: false}).toArray();
    res.status(200).send(result);
    return;
}

exports.getcomments = getcomments;