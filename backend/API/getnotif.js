var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectId;
var url =
    "mongodb+srv://SEAPOD:S6AglZCU8w5kYDdx@cluster0.kbnt74r.mongodb.net/?retryWrites=true&w=majority";

async function getnotif(req, res) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("video");
    let col = db.collection("notifications");

    let data = await col.find({ user: req.user }).toArray();
    if (!data) {
        res.status(404).send("Not Found");
        return;
    }
    res.status(200).send(data);
}
exports.x = getnotif;
