var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";
var notif = require("./gennotif");

async function getcomments(req, res) {
    console.log("ddd");
    if (!req.body.videoid || !req.body.content || !req.user) {
        res.status(400);
        return;
    }
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("comments");

    var dt = new Date().toISOString().slice(0, 10).split("-").reverse().join("/");
    const obj = {
        user: req.user,
        video: req.body.videoid,
        date: dt,
        content: req.body.content,
        replies: 0,
        reply: false,
        replyto: "",
    };
    let resp = await col.insertOne(obj);
    if (resp.acknowledged == true) {
        await notif.comment(req.body.videoid, req.user);
        client.close()
        res.status(200).send("Inserted");
    } else {
        client.close()
        res.status(500).send("Internal Error");
    }
    return;
}

exports.x = getcomments;
