var MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");
var ObjectID = require("mongodb").ObjectId;

var url =
    process.env.DB_SECRET;

async function change(req, res) {
    if (
        !req.body.password ||
        !req.body.newPassword ||
        req.body.newGenre.length == 0
    ) {
        res.send({ success: false, message: "Bad Request" });
        return;
    }
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
        var PassHashProvided = await bcrypt.hash(req.body.password, 10);
        const match = await bcrypt.compare(currPassHash, await PassHashProvided);

        if (!match) {
            client.close();
            res.send({
                success: false,
                message: "Current password mismatched",
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
