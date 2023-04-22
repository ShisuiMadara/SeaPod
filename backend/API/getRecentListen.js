var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";
var ObjectID = require("mongodb").ObjectId;

async function getRecentListen (req, res) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        res.status(401).send({
            sucess: false,
            msg: "Not a valid user"
        })
        return;
    }

    let db = client.db("seapod");
    let col = db.collection("userViewPodcast");

    let result = await col.find({
        "userId": req.userId
       });
    
    res.status(200).send({
        success: true,
        msg: result
    })
}

exports.execute = getRecentListen