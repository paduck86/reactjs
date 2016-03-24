function MyPlugin(options) {

}

MyPlugin.prototype.apply = function(compiler) {
    console.log('zzzz000000');
    compiler.plugin('compilation', function(compilation) {
        console.log('zzzz111111');
        compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
            htmlPluginData.html += 'The magic footer';
            console.log('zzzz22222');
            callback();
        });
    });
}

module.exports = MyPlugin;