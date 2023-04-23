const fs = require("fs");
const { Timestamp } = require("mongodb");
const path = require("path");
const internal = require("stream");
var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb://default:76VdQ34wZzBtt3MY@ac-qvcvywt-shard-00-00.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-01.lwxcedr.mongodb.net:27017,ac-qvcvywt-shard-00-02.lwxcedr.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjhen2-shard-0&authSource=admin&retryWrites=true&w=majority";
var ObjectID = require("mongodb").ObjectId;
const Chunk = 1000000;
var TS = require('mongodb').Timestamp;

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

    const filentry = await col.findOne({ _id: new ObjectID(req.params.podcastId)});
    if (!filentry) {
        res.status(404).send({
            success: false,
            msg: "No Podcast Found"
        });
    }

    const fn = filentry.fname;
    let isVideo = filentry.video;
    
    const path = `files/${fn}.` + req.params.podcastType;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    let dt  = new Date();    
    const getInitSet = await col2.findOne({podcastId: req.params.podcastId, userId: req.user});
    if (!getInitSet){
        const data = {
            userId: req.userId,
            podcastId: req.podcastId,
            activeListen: true,
            like: false,
            position: 0,
            completed: false,
            lastAccess: new TS(Date.now())
        }
        let initConf = await col2.insertOne(data);
        if (!initConf.acknowledged) {
            res.send({success: false, message: "Server Error!"});
            return;
        }
    }
    else {
        if (!getInitSet.activeListen){
            let initConf = await col.updateOne({podcastId: req.params.podcastId, userId: req.user}, {$set: {activeListen: true, lastAccess: new TS(Math.round(dt.getTime()/1000))}});
            if (!initConf.acknowledged) {
                res.send({success: false, message: "Server Error!"});
                return;
            }
        }        
    }
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
        file.pipe(res);
        
    }
    client.close()
}

exports.x = stream;
