var MongoClient = require("mongodb").MongoClient
const bcrypt = require('bcrypt')

var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";

async function change(req, res) {

    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err)
    });

    if (!client) {
        return;
    }
    let db = client.db("seapod")
    let col = db.collection("users")

    var updated_user 

    if (req.body.newPassword) {
        
        const match = await bcrypt.compare(req.body.password, passHash)

        if(!match) {
            client.close()
            res.send({
                success: false,
                msg: "Current password mismatched"
            })
            return 
        }

        passHash = bcrypt.hash(req.body.newPassword, 10)

        updated_user = await col.updateOne({ user: req.user }, { $set: { password: await passHash} })
    }
    
    if (req.body.newGenre) {

        updated_user = await col.updateOne({user: req.user}, {$set: {genre: req.body.newGenre}})
    }   
    
    client.close()

    res.send({
        success: true,
        data: "User updated"
    })
    
}
exports.x = change;
