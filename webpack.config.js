var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './src',
    port: 81
  },
  entry: [
    'webpack-dev-server/client?http://localhost:81',
    'webpack/hot/only-dev-server',
    __dirname + '/src/entry.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
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
      }),
      require('postcss-import')({
        addDependencyTo: webpack
      })
    ];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new OpenBrowserPlugin({
      url: 'http://localhost:81'
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
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
