var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var initData = require('./data.json');
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/bbbblog', function(err, _db) {
    var db = _db;
    console.log("Connected successfully to MongoDB server");
    var posts = db.collection('posts');
    var comments = db.collection('comments');
    posts.count(function (err, count) {
        if (!count) {
            posts.insert(initData, (err, result) => {
                console.log('init data inserted', result.result.n);
            });
        }
    });
    initHttp(db);
});

function initHttp(db) {
    var posts = db.collection('posts');
    var comments = db.collection('comments');
    var apiRouter = express.Router();

    apiRouter.get('/posts', (req, res) => {
        posts.find().toArray((err, items) => {
            res.json(items);
        });
    });
    apiRouter.get('/post/:postId', (req, res) => {
        posts.findOne({_id: new ObjectId(req.params.postId)}, (err, doc) => {
            res.json(doc);
        });
    });
    apiRouter.get('/comments/:postId', (req, res) => {
        comments.find({postId: req.params.postId}).toArray((err, items) => {
            res.json(items);
        });
    });
    apiRouter.post('/comments/new', function (req, res) {

        with(req.body) {
            comments.insert({postId, quote, text, date: new Date()}, (err, result) => {
                res.json({_id: result});
            })
        }
    });


    app.use(bodyParser.json());
    app.use('/api', apiRouter);
    app.use(express.static('public'));
    app.listen(3003, function () {
        console.log('listening port 3003');
    });
};



