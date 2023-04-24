var MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");
var ObjectID = require("mongodb").ObjectId;

var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";

async function change(req, res) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("user");
    const user = await col.findOne({ userId: req.userId });
    let currPassHash = user.passHash;
    var updated_user;
    if (req.body.newPassword) {
        console.log(1);
        var PassHashProvided = await bcrypt.hash(req.body.password, 10);
        console.log(2);
        const match = await bcrypt.compare(currPassHash, await PassHashProvided);

        if (!match) {
            client.close();
            res.send({
                success: false,
                msg: "Current password mismatched",
            });
            return;
        }

        var newPassHash = bcrypt.hash(req.body.newPassword, 10);

        updated_user = await col.updateOne({ user: req.user }, { $set: { password: passHash } });
    }

    if (req.body.newGenre) {
        updated_user = await col.updateOne(
            { user: req.userId },
            { $set: { genre: req.body.newGenre } },
        );
    }

    client.close();

    res.send({
        success: true,
        data: "User updated",
    });
}
exports.x = change;
