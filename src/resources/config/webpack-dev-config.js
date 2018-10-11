/**
 * Created by wangtingshun on 2018/4/26.
 * 此文件为开发期webpack配置文件
 */
let dirVars = require('./webpack/base/dir-structure.config.js');
const vuxLoader = require('vux-loader')
const webpackConfig = {
    //eval-source-map 适合开发时使用，可以在调试时，eval执行原文件的连接。
    devtool: 'eval-source-map',
    //注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    entry: require('./webpack/entry.config.js'),
    output: {
        publicPath: '../',
        path: dirVars.staticRootDir+ "/build",//打包后的文件存放的地方
        filename: "[name]/[name].[chunkhash].js", //打包后输出文件的文件名
        chunkFilename : 'common/[name]/[name]-[id].[chunkhash].js'//注意，后加载的文件生成在该路径下
    },
    node: {
        fs: 'empty'
    },
    resolve: require('./webpack/base/resolve-base.config.js'),
    module: require('./webpack/module.config.js'),
    plugins: require('./webpack/plugins.config.js'),
    devServer: {
        //port	设置默认监听端口，如果省略，默认为”8080“
        contentBase: dirVars.buildDir, //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“build"目录）
        // historyApiFallback: false,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        // inline: false //设置为true，当源文件改变时会自动刷新页面
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port: 8080,
        host: '0.0.0.0',
        proxy: {
            '/LnOnline/*': {
                target: 'http://127.0.0.1:8081',
                changeOrigin: true,
                secure: false
            }
        }
    }
}
module.exports = vuxLoader.merge(webpackConfig, {

    plugins: [{
        name: 'vux-ui'
    }]
})