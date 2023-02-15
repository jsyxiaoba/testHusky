const {
    join,
    resolve,
    posix
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
    mode: "development",
    output: {
        publicPath: "/",
        assetModuleFilename: "images/[name][ext]",
        filename: "scripts/[name].bundle.js"
    },
    devServer: {
        // assetsSubDirectory: 'static',
        // assetsPublicPath: '/',
        // publicPath: '/',
        historyApiFallback: true,
        // contentBase: join(__dirname, '../dist'),
        port: 8083,
        // 配合 friendly-error-webpack-plugin
        // node-notifier webpack-build-notifier
        // quiet:true,
        // watchContentBase: true,
        // inline: true,
        static: {
            directory: join(__dirname, '../static'),
        },
        host: '0.0.0.0',
        hot: true
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            title: "测试",
            filename: "index.html",
            template: resolve(__dirname, "../src/index-dev.html")
        }),
        new ReactRefreshWebpackPlugin(),
        new WebpackBar({
            name: 'coding',
            profile: true,
        })
    ]
}
