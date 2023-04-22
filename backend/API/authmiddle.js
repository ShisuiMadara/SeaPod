var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";
var ObjectID = require("mongodb").ObjectId;

async function authmiddleware(req, res, next) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("tokens");
    if (req.user || !req.body.token || req.body.token.length != 24) {
        console.log(req.body);
        res.status(401).send({
            success: false,
            msg:"Incorrect Request"
        });
        return;
    }
    let token = req.body.token;
    let userdoc = await col.findOne({ _id: new ObjectID(token) });
    if (!userdoc) {
        res.status(401).send({
            success: false,
            msg:"Invalid Token"
        });
        return;
    }
 
    req.user = userdoc.user;
    
    res.status(200).send({
        sucess: true,
        msg: "user authorized"
    })
    next();
    return;
}
exports.x = authmiddleware;
