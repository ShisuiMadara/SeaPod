var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb+srv://SEAPOD:S6AglZCU8w5kYDdx@cluster0.kbnt74r.mongodb.net/?retryWrites=true&w=majority";
var ObjectID = require("mongodb").ObjectId;

async function getRecentListen (req, res) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        res.status(401).send({
            sucess: false,
            msg: "Not a valid user"
        })
        return;
    }

    
}