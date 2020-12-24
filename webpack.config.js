const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: ASSET_PATH
    },
    optimization: {
        usedExports: true,
    },
    module: {
        rules :[
            { 
                test: /\.(scss|css)$/, 
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'], 
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: ['babel-loader'], 
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: 'Webpack Demo',
            template: 'index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        })
    ]
};