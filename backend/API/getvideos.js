var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb+srv://SEAPOD:S6AglZCU8w5kYDdx@cluster0.kbnt74r.mongodb.net/?retryWrites=true&w=majority";

async function get(req, res) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("video");
    let col = db.collection("video");
    let result = await col.find().toArray();
    if (!result) {
        res.status(404).send("Nothing Found");
        return;
    }
    res.status(200).send({ data: result });
}
exports.x = get;
