/**
 * Created by Administrator on 2017/1/6.
 */
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const DB_STR ='mongodb://localhost:27017/tn_blog';
const ObjectId = require('mongodb').ObjectId;

router.get('/',(req,res,next)=>{
    MongoClient.connect(DB_STR,(err,db)=>{
    if(err){
        res.send(err);
        return;
    }
    var c = db.collection('cats');
    c.find().toArray((err,docs)=>{
        if(err){
            res.send(err);
            return
        }
        res.render('admin/category_list',{data:docs});
    })
})

})
router.get('/add',(req,res,next)=>{
    res.render('admin/category_add')
})
router.get('/edit',(req,res,next)=>{
    var id = req.query.id;
    MongoClient.connect(DB_STR,(err,db)=>{
    if(err){
        res.send(err);
        return
    }
    var c = db.collection('cats');
    c.find({_id:ObjectId(id)}).toArray(function(err,docs){
        if(err){
            res.send(err);
            return
        }
        res.render('admin/category_edit',{data:docs[0]});
    })
})

})


router.post('/add',(req,res,next)=>{
    var title = req.body.title;
    var sort = req.body.sort;

    MongoClient.connect(DB_STR,(err,db)=>{
        if(err){
            res.send(err);
            return;
        }
        var c = db.collection('cats');
        c.insert({title:title,sort:sort},function(err,result){
            if(err){
                res.send(err);
                return;
            };
            res.send('<h1>添加成功<a href="/admin/cats">返回查看</a></h1>')
        })
    })
})

router.post('/edit',(req,res,next)=>{
    var title = req.body.title;
    var sort =req.body.sort;
    var id = req.body.id;
    MongoClient.connect(DB_STR,(err,db)=>{
        if(err){
            res.send(err);
            return
        }
        var c = db.collection('cats');
        c.update({_id:ObjectId(id)},{$set:{"title":title,"sort":sort}},(err,docs)=>{
            if(err){
                res.send(err);
                return
            }
            res.send('更新成功 <a href="/admin/cats">返回查看</a>')
        })
    })
})
router.get('/delete',(req,res,next)=>{
    var id = req.query.id;
    MongoClient.connect(DB_STR,(err,db)=>{
        if(err){
            res.send(err);
            return
        }
        var c = db.collection('cats');
        c.remove({_id:ObjectId(id)},(err,result)=>{
            if(err){
                res.send(err);
                return
            }
            res.redirect('/admin/cats');
        })
    })
})
module.exports = router;