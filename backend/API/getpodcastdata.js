var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";
var ObjectID = require("mongodb").ObjectId;

async function getPodcastData(req, res) {
    
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        res.send({
            success: false,
            msg: err
        })
        return
    });

    if (!client) {

        client.close()
        
        res.send({
            success: false,
            msg: err 
        })
      
        return;
    }

    let db = client.db("seapod");
    let col = db.collection("podcast");

    var data
    
    try{
        data = await col.find().toArray() 
    }catch(err){

        client.close()

        res.send({
            success: false,
            msg: err
        })
        return
    }

    client.close()

    res.status(200).send({
        success: true,
        msg: data
    })
    
}

exports.execute = getPodcastData
