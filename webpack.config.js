const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

const resolve = file => path.resolve(__dirname, file);

module.exports = {
    mode:'development',
    devtool:'#source-map',
    entry: resolve("src/test.js"),
    plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'}),
    ],
    devServer:{
        compress:true,
        contentBase:resolve('dist'),
        host:'localhost',
        port:8090,
        open:true //设置自动打开浏览器
    }
    // optimization:{
    //     runtimeChunk:{
    //         name:'manifest'
    //     },
    //     minimizer:true
    // }
}