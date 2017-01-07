/**
 * Created by Administrator on 2017/1/6.
 */
const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('admin/admin');
})






module.exports = router;