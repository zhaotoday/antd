const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

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
    filename: '[id].[hash].js'
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
        loader: 'style!css?modules&localIdentName=[name]__[local]-[hash:base64:5]!sass!postcss'
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style!css'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=8192&name=images/[hash].[ext]'
      }
    ]
  },
  postcss: function () {
    return [
      require('postcss-font-magician'),
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new OpenBrowserPlugin({
      url: 'http://localhost:81'
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    }),
    new HtmlWebpackPlugin({
      template: 'src/template/index.html',
      title: 'webapp',
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
