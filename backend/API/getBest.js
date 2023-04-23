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

    var data

    var user_genre = req.genre

    var result = []

    try{
        data = await col.find().toArray()

        for (var i = 0; i<data.length(); ++i) {
            for(var j = 0; j<user_genre.length(); ++j) {
                if(data[i].genre === user_genre[j]) {
                    result.push(data[i])
                    break
                }
            }
        }

        result.sort((a, b) => b.likes - a.likes);
    }catch(err){

        client.close()

        res.send({
            success: false,
            msg: err.message
        })
        return
    }

    client.close()

    res.status(200).send({
        success: true,
        data: result
    })

}

exports.execute = getBest
