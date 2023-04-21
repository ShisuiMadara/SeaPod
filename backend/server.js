const express = require('express');
const app = express();
const port = 5000;
const multer = require('multer');
const cors = require('cors')
app.use(cors({origin:'*'}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "video");
  },
  filename: (req, file, cb) => {
    var namef = Date.now().toString() + '-' + req.body.user;
    cb(null, `${namef}.mp4`);
  },
});
const upload = multer({ storage: multerStorage });

app.get('/', (req, res)=>{res.send('hello')});

const login = require('./API/login');
app.post('/login', (req, res)=>{login.login(req, res)});

const getvids = require('./API/getvideos');
app.get('/getvideos', (req, res)=>{getvids.x(req, res)});

const getvid = require('./API/getvideo');
app.post('/getvideo', (req, res)=>{getvid.x(req, res)});

const s = require('./API/signup');
app.post('/signup', (req, res)=>{s.signup(req, res)});

const ss = require('./API/getcomments');
app.post('/comments', (req, res)=>{ss.getcomments(req, res)});

const reps = require('./API/getreplies');
app.post('/replies', (req, res)=>{reps.get(req,res)});

const stream = require('./API/stream');
app.get('/stream/:videoid', (req, res)=>{stream.x(req, res)});

const authmiddleware = require('./API/authmiddle');
//app.use(authmiddleware.x);

const comment = require('./API/comment');
app.post('/comment', authmiddleware.x,(req, res)=>{comment.x(req,res)});

const reply = require('./API/reply');
app.post('/reply', authmiddleware.x, (req, res)=>{reply.x(req,res)});

const like = require('./API/like');
app.post('/like', authmiddleware.x, (req, res)=>{like.x(req, res)});

const changepass = require('./API/changepass');
app.post('/changepass', authmiddleware.x, (req, res)=>{changepass.x(req, res)});

const upld = require('./API/upload')
app.post('/upload', upload.single('file'), authmiddleware.x, (req, res)=>{upld.x(req, res)});

const getnotif = require('./API/getnotif')
app.post('/getnotif', authmiddleware.x, (req,res)=>{getnotif.x(req,res)});

const clearnotif = require('./API/clearnotif')
app.post('/clearnotif', authmiddleware.x, (req,res)=>{clearnotif.x(req,res)});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});