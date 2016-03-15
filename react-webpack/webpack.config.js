var path = require('path');
var nodeExternals = require('webpack-node-externals');
module.exports = {
    context: __dirname + '/app',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        javascript: './app.js',
        html: './index.html'
    },
    output: {
        filename: 'app.js',
        path: path.join(__dirname, "dist")
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: path.join(__dirname, "node_modules"),
            loaders: ["react-hot","babel-loader"]
        },
        {
            test: /\.html$/,
            loader: "file?name=[name].[ext]"
        }]
    }
};
/* 지금까지의 설정은 우리가 작성한 파일을 dist 디렉토리 밑에 복사하는 것일 뿐이지만
 webpack의 정말 강점은 webpack이 제공하는 loader들이다.
 이제부터는 loader들을 이용하여 우리 코드들을 babel을 통해 jsx를 javascript로 변환하는 작업을 할 것이다.

 다행히도 Babel loader는 ES2015와 JSX 변환을 모두 지원하므로
 두가지를 따로 요구할 필요없이 babel loader만 있으면 된다.

 npm install babel-loader --save-dev
 */
/*.babel loader을 .js로 끝나는 모든 파일에 반영*/