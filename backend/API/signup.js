var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

async function signup(req, res){
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
    let colu = db.collection('users');

    let user_ = await colu.findOne({user: req.body.user});
    if(!user_){
        let userr = await colu.insertOne({user: req.body.user, password: req.body.password});
        if(userr.acknowledged == false) res.status(500).send('Failed to Sign Up');
        res.sendStatus(200);
        return;
    }
    else{
        res.status(400).send('User Already Exists');
        return;
    }
} 
exports.signup = signup;