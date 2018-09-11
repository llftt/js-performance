const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

const resolve = file => path.resolve(__dirname, file);
console.log('dirname:',__dirname);

module.exports = {
    mode:'production',
    devtool:'#source-map',
    entry: resolve("../src/test.js"),
    plugins:[
        new HtmlWebpackPlugin({template:resolve('../src/index.html')}),
    ],
    devServer:{
        compress:true,
        contentBase:resolve('../dist'),
        host:'localhost',
        port:8090,
        open:true //设置自动打开浏览器
    }
}