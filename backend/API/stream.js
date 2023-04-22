const fs = require("fs");
const path = require("path");
var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb+srv://SEAPOD:S6AglZCU8w5kYDdx@cluster0.kbnt74r.mongodb.net/?retryWrites=true&w=majority";
var ObjectID = require("mongodb").ObjectId;
const Chunk = 1000000;

async function stream(req, res) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("seaPod");
    let col = db.collection("podcast");
    let col2 = db.collection("userViewPodcast");

    const filentry = await col.findOne({ podcastId: req.params.podcastId });
    if (!filentry) {
        res.status(404).send({
            success: false,
            msg: "No Podcast Found"
        });
    }

    const fn = filentry.filename;
    
    const path = `podcast/${fn}.` + req.params.podcastType;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {
        var contentType 

        if(req.params.podcastType == "audio") {
            contentType = "audio/mpeg"
        } else {
            contentType = "video/mp4"
        }

        const head = {
            "Content-Length": fileSize,
            "Content-Type": contentType,
        };
        await col2.updateOne({ _id: new ObjectID(req.params.podcastId) }, { $inc: { views: 1 } });
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    } else {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : start + Chunk;
        end = Math.min(end, fileSize - 1);
        end = Math.min(end, start + Chunk);
        const chunksize = end - start + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4",
        };
        if (end == fileSize - 1) {
            await col2.updateOne({ _id: new ObjectID(req.params.videoid) }, { $inc: { views: 1 } });
        } 
        await col2.updateOne({
            _id: new ObjectID(req.params.podcastId),
            $inc: {views: 1},
           
        })
        res.writeHead(206, head);
        file.pipe(res);
    }
}

exports.x = stream;
