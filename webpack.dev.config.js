var path = require('path');

var query = {
  bypassOnDebug: true,
  optipng: {
    optimizationLevel: true
  },
  gifsicle: {
    interlaced: false
  }
};

module.exports = {
  entry: './client/src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  },
  resolve: {
    extensions: ['', '.js', 'jsx', 'json'],
    alias: {
      lib: path.resolve(__dirname, 'client/src/lib'),
      actions: path.resolve(__dirname, 'client/src/actions'),
      constants: path.resolve(__dirname, 'client/src/constants')
    },
    root: [
      path.resolve(__dirname)
    ]
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
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
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  }
}