const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    __dirname + '/src/entry.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: '[id].[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015&presets[]=react&presets[]=stage-1&plugins[]=transform-decorators-legacy'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style!css?modules&localIdentName=[hash:base64:5]!sass!postcss'
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192'
      }
    ]
  },
  postcss: function () {
    return [
      require('postcss-font-magician'),
      require('postcss-url'),
      require('postcss-browser-reporter'),
      require('postcss-reporter'),
      require('cssnano')({
        filterPlugins: false,
        sourcemap: true,
        autoprefixer: {
          add: true,
          remove: true,
          browsers: ['last 2 versions']
        },
        safe: true,
        discardComments: {
          removeAll: true
        }
      })
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.DedupePlugin(),
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/template/index.html',
      title: 'IM 个性装扮',
      filename: '../index.html',
      hash: true
    })
  ],
  resolve: {
    root: __dirname,
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.html', '.css', '.scss']
  }
}
