var MongoClient = require("mongodb").MongoClient;
var url =
    process.env.DB_SECRET;
const ObjectId = require("mongodb").ObjectId;

async function getRecentListen (req, res) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        res.send({
            success: false,
            msg: err
        })
        return
    });
    let db = client.db("seapod");
    let col = db.collection("userViewPodcast");
    let col2 = db.collection("podcast");
    let result
    try {
        result = await col.find({"userId": req.userId, activeListen: true}, {projection: {position: 1, podcastId: 1}}).limit(10).sort({lastAccess: -1}).toArray();
    } catch (err) {
        res.send({
            success: false,
            msg: err
        })
        client.close()
        return
    }
    for(var i = 0; i < result.length; i++){
        let dt = await col2.findOne({_id: new ObjectId(result[i].podcastId)});
        result[i] = {...result[i], ...dt}
        delete result[i].podcastId
    }
    client.close()
    
    res.status(200).send({
        success: true,
        msg: result
    })
    
}

exports.execute = getRecentListen