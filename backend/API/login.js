var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

async function login(req, res){
    console.log(req.body);
    if (!req.body.user || !req.body.password) {
        res.send(400);
        return;
    }
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    let db = client.db('video');
    let colc = db.collection('tokens');
    let colu = db.collection('users');

    let user_ = await colu.findOne({user: req.body.user, password: req.body.password});
    if (!user_){
        res.status(401).send("Username or Password incorrect!");
        return;
    }
    else{
        await colc.findOneAndDelete({user: req.body.user});
        let tokendoc = await colc.insertOne({user: req.body.user});
        res.status(200).send(tokendoc.insertedId.toString());
        return;
    }
}

exports.login = login;