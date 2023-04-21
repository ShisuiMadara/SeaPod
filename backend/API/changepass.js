var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

async function change(req, res){
    //console.log("ddd");
    if (!req.body.newpass || !req.body.currpass || !req.user){
        res.status(400).send("Fields Missing");
        return;
    }
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    let db = client.db('video');
    let col = db.collection('users');

    let usersp = await col.findOne({user: req.user, password: req.body.currpass});
    if (!usersp){
        res.status(401).send("Current Password Mismatched");
        return;
    }
    let users = await col.updateOne({user: req.user}, {$set:{password: req.body.newpass}});
    if (users.acknowledged){
        res.status(200).send("Password Changed");
    }
    else {
        res.sendStatus(500);
    }
}
exports.x = change;