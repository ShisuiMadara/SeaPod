var MongoClient = require("mongodb").MongoClient;
var url =
    process.env.DB_SECRET;
var ObjectID = require("mongodb").ObjectId;

async function get(req, res) {
    if (!req.body.videoid) {
        res.sendStatus(400);
        return;
    }
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("video");
    const query = { _id: new ObjectID(req.body.videoid) };
    let result = await col.findOne(query);
    if (!result) {
        client.close()
        res.status(404).send("Nothing Found");
        return;
    }

    client.close()
    res.status(200).send({ data: result });
   
}
exports.x = get;
