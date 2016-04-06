var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    __dirname + '/src/entry.js'
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
        loader: 'babel?presets[]=es2015&presets[]=react&presets[]=stage-1&plugins[]=transform-decorators-legacy'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]__[local]-[hash:base64:5]!postcss'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192'
      }
    ]
  },
  postcss: function () {
    return [
      require('precss')({browsers: ['safari >= 9, ie >= 11']}),
      require('postcss-font-magician'),
      require('postcss-url'),
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
      }),
      require('postcss-import')({
        addDependencyTo: webpack
      })
    ];
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
    root: __dirname,
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.html', '.css', '.scss']
  }
};
