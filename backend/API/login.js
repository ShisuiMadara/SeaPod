var MongoClient = require("mongodb").MongoClient;
var url =
    process.env.DB_SECRET;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
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

    let usr = await col.findOne({email: req.body.email});
    if (!usr) {
        client.close()
        res.send({success: false, message: "User Not Found!"});
        return;
    }
    let cmpr = await bcrypt.compare(req.body.password, usr.passHash);
    if (!cmpr){
        client.close()
        res.send({success: false, message: "Password Mismatch!"});
        return;
    }
    client.close()
    res.send({success: true, token: genToken(usr)});
}

function genToken(data){
    return jwt.sign({...data}, process.env.TOKEN_SECRET);
}

exports.login = login;
