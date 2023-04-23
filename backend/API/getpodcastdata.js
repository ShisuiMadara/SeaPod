var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";


async function getPodcastData(req, res) {

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

    try{
        data = await col.find().toArray()
    }catch(err){

        client.close()

        res.send({
            success: false,
            msg: err.message
        })
        return
    }

    for (var i = 0; i < data.length; i++){
        var pos = 0;
        let zdata = await col2.findOne({userId: req.userId, podcastId: data[i]._id.toString()}, {projection: {position: 1}});
        if (!zdata){
            pos = 0;
        }
        else pos = zdata.position;
        data[i].position = pos;
    }
    client.close()

    res.status(200).send({
        success: true,
        data: data
    })

}

exports.execute = getPodcastData
