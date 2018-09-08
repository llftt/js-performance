const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
    mode:'development',
    entry: path.resolve(__dirname,"src/test.js"),
    plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'})
    ]
}