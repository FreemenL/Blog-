const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_STR = 'mongodb://localhost:27017/tn_blog';
const ObjectId = require('mongodb').ObjectId;
router.get('/', function(req, res, next) {
    var id = req.query.id;
    MongoClient.connect(DB_STR,(err,db)=>{
        if(err){
            res.send(err);
            return
        }
        var c = db.collection('posts');
    c.find({_id:ObjectId(id)}).toArray(function(err,docs){
        if(err){
            res.send(err);
            return
        }
         res.render('home/article',{data:docs[0]});

    })
})

});





module.exports = router;