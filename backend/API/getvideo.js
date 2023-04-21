var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb+srv://SEAPOD:S6AglZCU8w5kYDdx@cluster0.kbnt74r.mongodb.net/?retryWrites=true&w=majority";
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
    let db = client.db("video");
    let col = db.collection("video");
    const query = { _id: new ObjectID(req.body.videoid) };
    let result = await col.findOne(query);
    if (!result) {
        res.status(404).send("Nothing Found");
        return;
    }
    res.status(200).send({ data: result });
}
exports.x = get;
