const express = require("express");
const app = express();
const port = 5000;
const multer = require("multer");
const cors = require("cors");
const dotenv = require('dotenv');
app.use(cors({ origin: "*" }));

dotenv.config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files");
    },
    filename: (req, file, cb) => {
        var namef = Date.now().toString() + "-" + req.userId;
        let ext = req.body.video==="yes"?"mp4":"mp3";
        cb(null, `${namef}.${ext}`);
    },
});
const upload = multer({ storage: multerStorage });

app.get("/", require('./API/jwtmiddle').jwtMiddleware, require('./API/adminmiddle').adminMiddleware, (req, res) => {
    res.send("hello");
});

const login = require("./API/login");
app.post("/api/login", (req, res) => {
    login.login(req, res);
});

const getvids = require("./API/getvideos");
app.get("/getvideos", (req, res) => {
    getvids.x(req, res);
});

const s = require("./API/signup");
app.post("/api/signup", (req, res) => {
    s.signup(req, res);
});

const ss = require("./API/getcomments");
app.post("/comments", (req, res) => {
    ss.getcomments(req, res);
});

const reps = require("./API/getreplies");
app.post("/replies", (req, res) => {
    reps.get(req, res);
});

const stream = require("./API/stream");
app.get("/stream/:podcastId", (req, res, next)=>{req.userId = "useless"; next();}, (req, res) => {
    stream.x(req, res);
});

const authmiddleware = require("./API/authmiddle");
const jwtMiddleware = require("./API/jwtmiddle").jwtMiddleware;
const adminMiddleware = require("./API/adminmiddle").adminMiddleware;

const comment = require("./API/comment");
app.post("/comment", authmiddleware.x, (req, res) => {
    comment.x(req, res);
});

const reply = require("./API/reply");
app.post("/reply", authmiddleware.x, (req, res) => {
    reply.x(req, res);
});

const updtPos = require('./API/updatets').x;
app.post('/api/updatepos', jwtMiddleware, (req, res)=>{
    updtPos(req, res);
})

const isLiked = require("./API/isLiked").x;
app.post('/api/isliked', jwtMiddleware, (req, res)=>{
    isLiked(req, res);
})

const like = require("./API/like").x;
app.post("/api/like", jwtMiddleware, (req, res) => {
    like(req, res);
});

const changepass = require("./API/changepass");
app.post("/changepass", authmiddleware.x, (req, res) => {
    changepass.x(req, res);
});

const upld = require("./API/upload");
app.post("/api/upload", jwtMiddleware, adminMiddleware, upload.single("file"), (req, res) => {
    upld.x(req, res);
});

const getnotif = require("./API/getnotif");
app.post("/getnotif", authmiddleware.x, (req, res) => {
    getnotif.x(req, res);
});

const clearnotif = require("./API/clearnotif");
app.post("/clearnotif", authmiddleware.x, (req, res) => {
    clearnotif.x(req, res);
});

const getbest = require("./API/getBest");
app.post("/api/getBest", jwtMiddleware, (req, res) => {
    getbest.execute(req, res);
});

const getPodCastData = require("./API/getpodcastdata").execute;
app.get('/api/getpodcastdata', jwtMiddleware, (req, res)=>{
    getPodCastData(req, res);
});

const getRecentListen = require("./API/getRecentListen").execute;
app.post("/api/getrecentlisten", jwtMiddleware, (req, res)=>{
    getRecentListen(req, res);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
