var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";

async function change(req, res) {
    //console.log("ddd");
    if (!req.body.newpass || !req.body.currpass || !req.user) {
        res.status(400).send("Fields Missing");
        return;
    }
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("users");

    let usersp = await col.findOne({ user: req.user, password: req.body.currpass });
    if (!usersp) {
        client.close()
        res.status(401).send("Current Password Mismatched");
        return;
    }
    let users = await col.updateOne({ user: req.user }, { $set: { password: req.body.newpass } });
    if (users.acknowledged) {
        client.close()
        res.status(200).send("Password Changed");
    } else {
        client.close()
        res.sendStatus(500);
    }
}
exports.x = change;
