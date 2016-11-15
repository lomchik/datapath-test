var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'dev';
const outputPath = __dirname+'/public';

module.exports = {
    name: 'js',
    entry: [__dirname + '/src/index.js', 'bootstrap-webpack!./src/App/bootstrap.config.js'],
    output: { path: outputPath, filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader?presets[]=es2015&presets[]=es2016&presets[]=react',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader!'
            },
            { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" }
        ]
    },
    watch: NODE_ENV == 'dev',
    devtool: NODE_ENV == 'dev' ? 'eval' : null,
};