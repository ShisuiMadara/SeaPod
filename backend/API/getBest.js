var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";


async function getBest(req, res) {

    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        res.send({
            success: false,
            msg: err.message
        })
        return
    });

    if (!client) {

        client.close()

        res.send({
            success: false,
            msg: err.message
        })

        return;
    }

    let db = client.db("seapod");
    let col = db.collection("podcast");
    let col2 = db.collection("userViewPodcast");

    var data
    console.log(req.body.genre);
    try{
        
        data = await col.find({ genre: { $in: req.body.genre } }).sort({ likes: -1 }).limit(10).toArray()

    }catch(err){

        client.close()

        res.send({
            success: false,
            msg: err.message
        })
        return
    }
    for (var i = 0; i < data.length; i++){
        let dt = await col2.findOne({podcastId: data[i]._id.toString(), userId: req.userId});
        var pos;
        if (dt) pos = dt.position;
        data[i].position = pos;
    }
    client.close()

    res.status(200).send({
        success: true,
        data: data
    })

}

exports.execute = getBest
