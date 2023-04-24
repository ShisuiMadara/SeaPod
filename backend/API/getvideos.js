var MongoClient = require("mongodb").MongoClient;
var url =
    process.env.DB_SECRET;

async function get(req, res) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("video");
    let result = await col.find().toArray();
    if (!result) {
        res.status(404).send("Nothing Found");
        return;
    }
    client.close()
    res.status(200).send({ data: result });
    
}
exports.x = get;
