const {
    join,
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
// const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: "production",
    output: {
        assetModuleFilename: "assets/images/[name].[contenthash:5].bundle.[ext]",
        filename: "assets/scripts/[name].[contenthash:5].bundle.js",
        // publicPath: "/assets",
    },
    optimization: {
        minimize: true,
        runtimeChunk: {
            name: "runtime"
        },
        splitChunks: {
            chunks: "async", // initial all  函数
            minChunks: 1,
            // 最终的chunk数是5个，这里可以只打包业务代码，其他的依赖（比如：react、lodash）可以放到CDN上做缓存处理
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            // 识别某个文件夹里的业务代码，抽出来打包
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    name: "commons"
                }
            },
            minSize: {
                javascript: 100000,
                style: 100000,
            },

        }
    },
    plugins: [
        // new BundleAnalyzer(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "测试",
            filename: "index.html",
            template: resolve(__dirname, "../src/index-prod.html"),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            }
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            // 选择cssnano插件进行压缩
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                preset: [
                    "default",
                    {
                        discardComments: {
                            removeAll: true
                        }
                    }
                ]
            }
        })
    ]
}
