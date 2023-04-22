var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectId;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";

async function getnotif(req, res) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("notifications");

    let data = await col.find({ user: req.user }).toArray();
    if (!data) {
        res.status(404).send("Not Found");
        return;
    }
    client.close()
    res.status(200).send(data);
}
exports.x = getnotif;
