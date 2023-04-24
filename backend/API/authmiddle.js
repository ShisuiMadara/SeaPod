var MongoClient = require("mongodb").MongoClient;
var url =
    process.env.DB_SECRET;
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
        client.close()
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
        client.close()

        res.status(401).send({
            success: false,
            msg:"Invalid Token"
        });
        return;
    }
 
    req.user = userdoc.user;
    
    client.close()

    res.status(200).send({
        sucess: true,
        msg: "user authorized"
    })
    next();
    return;
}
exports.x = authmiddleware;
