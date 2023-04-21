var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectID = require('mongodb').ObjectId;

async function upload(req, res){
    if (!req.body.title || !req.body.description){
        res.status(400).send("Error");
        return;
    }
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    let db = client.db('video');
    let col = db.collection('videointernal');
    let col2 = db.collection('video');

    const obj1={
        title: req.body.title,
        description: req.body.description,
        views: 0,
        likes: 0,
        //"description": "Great Show",
        thumbnail: "https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        date: new Date().toISOString().slice(0, 10).split('-').reverse().join('/'),
        by: req.user,
        time: "2:00"
    }
    let zz = await col2.insertOne(obj1);
    if (!zz.acknowledged){
        res.sendStatus(500)
        return;
    }
    const obj2 = {
        filename: req.file.filename.split('.mp')[0],
        videoid: zz.insertedId.toString()
    }
    let zz2 = await col.insertOne(obj2);
    if (!zz2.acknowledged){
        res.sendStatus(500)
        return;
    }
    res.status(200).send({videoid: zz.insertedId.toString()});
}
exports.x = upload;