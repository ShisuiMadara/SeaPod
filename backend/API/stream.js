const fs = require("fs");
const { Timestamp } = require("mongodb");
const path = require("path");
const internal = require("stream");
var MongoClient = require("mongodb").MongoClient;
var url =
    process.env.DB_SECRET;
var ObjectID = require("mongodb").ObjectId;
const Chunk = 1000000;
var TS = require('mongodb').Timestamp;
const pth = require('path');

async function stream(req, res) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((err) => {
        console.log(err);
    });

    if (!client) {
        return;
    }
    let db = client.db("seapod");
    let col = db.collection("podcast");
    let col2 = db.collection("userViewPodcast");

    const filentry = await col.findOne({ _id: new ObjectID(req.params.podcastId)});
    if (!filentry) {
        res.status(404).send({
            success: false,
            msg: "No Podcast Found"
        });
    }

    const fn = filentry.fname;
    let isVideo = filentry.video;
    
    const path = pth.resolve(__dirname, '..', 'files', fn)
    var stat
    try{
        stat = fs.statSync(path);
    }
    catch(e){
        console.log(e.message);
        res.sendStatus(404);
        return;
    }
    const fileSize = stat.size;
    const range = req.headers.range;
    let dt  = new Date();    
    
    var contentType 
    if(!isVideo) {
        contentType = "audio/mpeg"
    } else {
        contentType = "video/mp4"
    }

    if (!range) {        
        const head = {
            "Content-Length": fileSize,
            "Content-Type": contentType,
        };
        try{
            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
        }
        catch(e){
            console.log(e.message);
            res.sendStatus(404);
            return;
        }     
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
            "Content-Type": contentType,
        };
        // if (end == fileSize - 1) {
        //     await col2.updateOne({ userId: userId }, { $set: { completed: true } }, (err, result) => {
        //         if (err){
        //             res.status(200).send({
        //                 success: false, 
        //                 msg: err 
        //             })
        //             return
        //         }
        //         console.log(err)
        //         client.close()
        //       })
        // } 
     
        res.writeHead(206, head);        
        try{
            file.pipe(res);
        }
        catch(e){
            console.log(e.message);
            res.sendStatus(404);
            return;
        }
    }
    client.close()
}

exports.x = stream;
