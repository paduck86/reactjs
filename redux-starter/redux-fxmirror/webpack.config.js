var webpack = require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
var copyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var assetPath = path.resolve('./assets');
var viewPath = path.resolve('./views');

module.exports = {
  cache: true,
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/only-dev-server',
    path.join(assetPath, '/modules/app/index.js')
  ],
  output: {
    path: path.resolve('.tmp/public'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, /* jsx?$ 할땐 되고 jsx$할땐 안되네; */
        exclude: /node_modules/,
        /* 타겟 디렉토리 넣기 */
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
        /*loaders: ['babel?presets[]=react,presets[]=es2015']*/
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!' +
          'less?sourceMap'
        )
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('styles.css'),
    new copyWebpackPlugin([{
      from: path.join(viewPath, 'layout.ejs'),
      to: './index.html'
    }])
  ]
};

/*    new HtmlWebpackPlugin({
 fileName: 'index.html',
 template: path.join(viewPath, 'app/index.ejs'),
 inject: 'body'
 })*/
