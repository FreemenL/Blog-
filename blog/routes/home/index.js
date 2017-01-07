var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_STR = 'mongodb://localhost:27017/tn_blog';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index');
});
router.get('/list', function(req, res, next) {

  MongoClient.connect(DB_STR,(err,db)=>{
    if(err){
      res.send(err);
      return
    }
    var c = db.collection('posts');
  c.find().toArray(function(err,docs){
    if(err){
      res.send(err);
      return
    }
    var c1 = db.collection('cats');
    c1.find().toArray(function(err,result){
      if(err){
        res.send(err);
        return
      }
      res.render('home/list',{data:docs,data1:result});
    })
  })
})

});

module.exports = router;
