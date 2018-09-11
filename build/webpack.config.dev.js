const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

const resolve = file => path.resolve(__dirname, file);

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')



module.exports = {
    mode:'development',
    devtool:'#source-map',
    entry: resolve("../src/test.js"),
    plugins:[
        new HtmlWebpackPlugin({template:resolve('../src/index.html')})
    ],
    devServer:{
        compress:true,
        contentBase:resolve('../dist'),
        host:'localhost',
        port:8090,
        open:true //设置自动打开浏览器
    },
    optimization: { //测试,dev环境压缩
        minimizer: [
            new UglifyJsPlugin()
        ]
    }
}