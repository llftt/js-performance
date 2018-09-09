const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const resolve = fileName => path.resolve(__dirname, fileName);

//挂在静态资源
const serve = (path, cache) => express.static(resolve(path));
//输出目录
app.use('/client', serve('../dist'));

//接口参数处理
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//挂在中间层
let middleware = require('./middlewareErrorService');
app.use('/middleware', middleware);

// 挂载路由
let routes = require('./route');
app.use('/', routes);

const port = process.env.PORT || 9000; // 端口设置

// 启动服务
app.listen(port, () => {
  	console.log(`server started at localhost:${port}`);
});