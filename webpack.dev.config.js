var path = require('path');
var webpack = require('webpack');
const BowerResolvePlugin = require("bower-resolve-webpack-plugin");

var query = {
  bypassOnDebug: true,
  optipng: {
    optimizationLevel: true
  },
  gifsicle: {
    interlaced: false
  }
};
// Load environment variables to create a plugin that stores all the variables
// in a global variable called 'process.env'
require('dotenv').config();
var environVars = require('./secretsProd');
for (var key in environVars) {
  environVars[key] = JSON.stringify(environVars[key]);
}

module.exports = {
  entry: './client/src/index',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
    plugins: [new BowerResolvePlugin(), new webpack.ProvidePlugin(environVars)],
    alias: {
      lib: path.resolve(__dirname, 'client/src/lib'),
      actions: path.resolve(__dirname, 'client/src/actions'),
      constants: path.resolve(__dirname, 'client/src/constants'),
      styles: path.resolve(__dirname, 'client/src/lib/styles'),
      root: __dirname
    },
    aliasFields: ['browser']
  },
  devtool: 'source-map',
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?${JSON.stringify(query)}',
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  }
}