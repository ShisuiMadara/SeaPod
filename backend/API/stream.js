const fs = require('fs');
const path = require('path');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectID = require('mongodb').ObjectId;
const Chunk = 1000000;

async function stream(req, res){
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    let db = client.db('video');
    let col = db.collection('videointernal');
    let col2 = db.collection('video');

    const filentry = await col.findOne({videoid: req.params.videoid});
    if (!filentry){
        res.status(404).send("No Video Found");
    }
    const fn = filentry.filename;
    const path = `video/${fn}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (!range){
                const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        await col2.updateOne({_id: new ObjectID(req.params.videoid)}, {$inc: {views: 1}});
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
    else{
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        let end = parts[1]
            ? parseInt(parts[1], 10)
            : (start + Chunk);
        end = Math.min(end, fileSize - 1);
        end = Math.min(end, start + Chunk);
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        if (end == fileSize - 1){
            await col2.updateOne({_id: new ObjectID(req.params.videoid)}, {$inc: {views: 1}});
        }
        res.writeHead(206, head);
        file.pipe(res);
    }

}

exports.x = stream;