var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    console.log(req.body);
    if (!req.body.user || !req.body.password) {
        res.send({success: false, message: "Bad Request!"});
        return;
    }
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("user");    

    let usr = await col.findOne({email: req.body.user}, {projection:{passHash: 1, admin: 1, email:1, userId: 1}});
    if (!usr) {
        res.send({success: false, message: "User Not Found!"});
        return;
    }
    let cmpr = await bcrypt.compare(req.body.password, usr.passHash);
    if (!cmpr){
        res.send({success: false, message: "Password Mismatch!"});
        return;
    }
    res.send({success: true, token: genToken(data)});
}

function genToken(data){
    return jwt.sign({email: data.email, userId: data.userId, admin: data.admin}, process.env.TOKEN_SECRET);
}

exports.login = login;
