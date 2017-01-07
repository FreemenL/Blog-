/**
 * Created by Administrator on 2017/1/6.
 */
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const DB_STR = 'mongodb://localhost:27017/tn_blog'

router.get('/',function(req,res,next){
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
        res.render('admin/article_list',{data:docs});
    })
    })

});
router.post('/add',(req,res,next)=>{
    var cats = req.body.cats;
    var title = req.body.title;
    var summary = req.body.summary;
    var content = req.body.content;
    var time = new Date().toLocaleString();
    var posts = {
        "cats":cats,
        "title":title,
        "summary":summary,
        "content":content,
        "time":time
    }
    MongoClient.connect(DB_STR,(err,db)=>{
        if(err){
            res.send(err);
            return
        }
        var c = db.collection('posts');
        c.insert(posts,(err,result)=>{
            if(err){
                res.send(err);
                return
            }
            res.send('添加成功<a href="/admin/posts">返回查看</a>')
        })
    })
})
router.get('/add',function(req,res,next){
    MongoClient.connect(DB_STR,(err,db)=>{
        if(err){
            res.send(err);
            return
        }
        var c = db.collection('cats');
    c.find().toArray(function(err,docs){
        if(err){
            res.send(err);
            return;
        }
        res.render('admin/article_add',{data:docs});
    })
    })

})






module.exports=router;