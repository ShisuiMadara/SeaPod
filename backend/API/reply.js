var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectID = require('mongodb').ObjectId;
var notif = require('./gennotif');

async function getcomments(req, res){
    console.log("ddd");
    if (!req.body.commentid || !req.body.content || !req.user){
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
    
    var dt = new Date().toISOString().slice(0, 10).split('-').reverse().join('/');
    const obj = {
        user: req.user,
        video: "",
        date: dt,
        content: req.body.content,
        replies: 0,
        reply: true,
        replyto: req.body.commentid    
    }
    let resp = await col.insertOne(obj);
    if (resp.acknowledged == true){
        let resp2 = await col.updateOne({_id : new ObjectID(req.body.commentid)}, {$inc:{replies:1}});
        notif.reply(req.body.commentid, req.user);
        res.status(200).send("Inserted");
    }
    else {
        res.status(500).send("Internal Error");
    }
    return;
}

exports.x = getcomments;