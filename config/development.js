const path = require('path');
const { merge } = require('webpack-merge');
const config = require('../webpack.config.js');

module.exports = merge(config, {
    mode: 'development',
    // devtool: 'inline-source-map',
    devtool: 'source-map',
    devServer: {
        index: 'index.html',
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        port: 9000
    }
})