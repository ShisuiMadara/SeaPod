var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectID = require('mongodb').ObjectId;

async function authmiddleware(req, res, next){
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    let db = client.db('video');
    let col = db.collection('tokens');
    if (req.user || !req.body.token || req.body.token.length != 24) {
        console.log(req.body);
        res.status(401).send('Incorrect Request');
        return;
    }
    let token = req.body.token;
    let userdoc = await col.findOne({_id: new ObjectID(token)});
    if (!userdoc){
        res.status(401).send("Invalid Token");
        return;
    }
    console.log("Hello")
    req.user = userdoc.user;
        console.log("Hello")
    next();
    return;
}
exports.x = authmiddleware;