var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";
const bcrypt = require('bcrypt');

async function signup(req, res) {
    if (!req.body.email || !req.body.password || !req.body.userId || !req.body.name || !req.body.genre) {
        res.send({success: false, message: "Bad Request!"});
        return;
    }
    let passHash = bcrypt.hash(req.body.password, 10);
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });
    console.log("step")
    if (!client) {
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("user");

    let user_ = await col.findOne({ email: req.body.email });
    let user__ = await col.findOne({ userId: req.body.userId });
    
    if (!user_ && !user__) {
        let userr = await col.insertOne({ userId: req.body.userId, passHash: await passHash, email: req.body.email, name: req.body.name, genre: req.body.genre, admin: false});
        if (userr.acknowledged == false) res.send({success: false, message: "Server Error!"});
        res.send({success: true, message: "User Registered Successfully!"})
        return;
    }
    else{
        client.close()
        res.send({success: false, message: "User ID or E-Mail Already Exists"});
        return;
    }
}
exports.signup = signup;
