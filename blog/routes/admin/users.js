/**
 * Created by Administrator on 2017/1/6.
 */
const express = require('express');
const router = express.Router();
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const DB_STR = 'mongodb://localhost:27017/tn_blog';

router.use('/login',checkNotLogin);
router.get('/login',(req,res)=>{
    res.render('admin/login');
})
router.post('/sigin',(req,res)=>{
    var username = req.body.username;
    var pwd = req.body.pwd;
    MongoClient.connect(DB_STR,(err,db)=>{
        if(err){
            res.send(err);
            return;
        }
        var c = db.collection('users');
        c.find({username:username,pwd:pwd}).toArray(function(err,docs){
            if(err){
                res.send(err);
                return
            }
            if(docs.length){
                req.session.isLogin = true;
                res.redirect('/admin/index');
            }else{
                res.redirect('/admin/users/login');
            }
        })
    })

});
router.get('/logout',(req,res)=>{
    req.session.isLogin=false;
    res.redirect('/admin/index');
});
function checkNotLogin(req,res,next){
    if(req.session.isLogin){
        res.redirect('back')
    }
    next();
}




module.exports = router;