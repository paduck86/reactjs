
var webpack = require("webpack");
var webpackConfig = require("../webpack.config.js");

module.exports = function(){
  return {
    webpack: {
      options: webpackConfig,
        build: {
        plugins: webpackConfig.plugins.concat(
          new webpack.DefinePlugin({
            "process.env": {
              // This has effect on the react lib size
              "NODE_ENV": JSON.stringify("development")
            }
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        )
      },
      "build-dev": {
        devtool: "sourcemap",
          debug: true
      }
    },
    "webpack-dev-server": {
    options: {
      webpack: webpackConfig,
        publicPath: "/" + webpackConfig.output.publicPath
    },
    start: {
      keepAlive: true,
        webpack: {
        devtool: "eval",
          debug: true
      }
    }
  },
    watch: {
      app: {
        files: ["assets/!**!/!*", "views/!*"],
          tasks: ["webpack:build-dev"],
          options: {
          spawn: false
        }
      }
    }
  }
};
