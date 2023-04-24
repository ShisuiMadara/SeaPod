var MongoClient = require("mongodb").MongoClient;
var url =
    process.env.DB_SECRET;
var ObjectID = require("mongodb").ObjectId;

async function upload(req, res) {
    if (!req.body.name || !req.body.description || !req.body.genre || !req.body.video || !req.body.creatorId) {
        res.send({success: false, message: "Bad Request"});
        return;
    }
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        res.send({success: false, message: "Server Error"});
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("podcast");
    let dt = new Date();
    let frmtdat = dt.getDate().toString();
    frmtdat = frmtdat.length==1?'0'+frmtdat:frmtdat;
    let frmtmnth = dt.getMonth().toString();
    frmtmnth = frmtmnth.length==1?'0'+frmtmnth:frmtmnth;
    let frmtyr = dt.getFullYear();
    const obj = {
        name: req.body.name,
        creatorId: req.body.creatorId,
        genre: req.body.genre,
        likes: 0,
        fname: req.file.filename,
        video: req.body.video=="yes"?true:false,
        adminId: req.userId,
        description: req.body.description,
        uploadDate: `${frmtdat}-${frmtmnth}-${frmtyr}`
    }

    let insObj = await col.insertOne(obj);
    if (!insObj.acknowledged) {
        client.close()
        res.send({success: false, message: "Server Error!"});
        return;
    }        
    client.close()
    res.status(200).send({success: true, message: "Podcast Inserted", id: insObj.insertedId.toString()});
}
exports.x = upload;
