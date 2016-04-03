var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer')({browsers: ['safari >= 9, ie >= 11']});

module.exports = {
  entry: [
    __dirname + '/src/entry.jsx'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: 'http://localhost/dist/',
    filename: '[id].[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(css|scss)$/,
        loader: 'style-loader!css-loader?modules!sass-loader!postcss-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.tmpl',
      title: 'React Single Page App',
      filename: '../index.html',
      hash: true
    })
  ],
  resolve: {
    root: [
      'src/app',
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx', '.coffee', '.html', '.css', '.scss']
  }
};