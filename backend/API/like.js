var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectID = require('mongodb').ObjectId;

async function like(req, res){
    if(!req.body.action || !req.body.videoid){
        res.sendStatus(400);
    }
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    let db = client.db('video');
    let col = db.collection('likes');
    let col2 = db.collection('video');
    if (req.body.action == "get"){
        let fx = await col.find({videoid: req.body.videoid, user: req.user}).count();
        if (fx != 0) res.status(200).send({liked: true});
        else res.status(200).send({liked: false});
    }
    else if (req.body.action == "like"){
        let fx = await col.find({videoid: req.body.videoid, user: req.user}).count();
        if (fx != 0){
            res.status(400).send('Already Liked!');
            return;
        }
        let fx2 = await col.insertOne({videoid: req.body.videoid, user: req.user});
        if (!fx2.acknowledged){            
            res.sendStatus(500);
            return;
        }
        await col2.updateOne({_id: new ObjectID(req.body.videoid)}, {$inc:{likes: 1}});
        res.sendStatus(200);
    }
    else if (req.body.action == "unlike"){
        let fx = await col.find({videoid: req.body.videoid, user: req.user}).count();
        if (fx == 0){
            res.status(400).send('Already Not Liked!');
            return;
        }
        let fx2 = await col.deleteOne({videoid: req.body.videoid, user: req.user});
        if (!fx2.acknowledged){
            res.sendStatus(500);
            return;
        }
        await col2.updateOne({_id: new ObjectID(req.body.videoid)}, {$inc:{likes: -1}});
        res.sendStatus(200);
    }
    else{
        res.status(400).send("Invalid Request!");
    }
    return;
}
exports.x = like;