const express = require('express');

const fs = require('fs');
const router = express.Router();
const path = require('path');
const resolve = fileName => path.resolve(__dirname, file);

//挂载中间件
router.use(function(req, res, next){
    console.log('加载'+req.path+'成功');
    next();
});

//首页路由
var indexHTML = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>中间件解析</title>
                    </head>
                    <body>
                        
                    </body>
                    </html>`
;

router.get('/', function(req, res){
    console.log('---/')
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Content-Type");  
    res.send(indexHTML);
})

module.exports = router;