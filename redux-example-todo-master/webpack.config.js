var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  module: {
    loaders: [
      {
	test: /\.js$/,
	loaders: ['react-hot', 'babel'],
	exclude: /node_modules/,
	include: __dirname
      },
      {
      test: /\.css?$/,
      loaders: ['style', 'raw'],
      include: __dirname
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
