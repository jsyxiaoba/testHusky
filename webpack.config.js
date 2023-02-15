const merge = require('webpack-merge');
const { join, resolve } = require('path');
// 获取命令执行中的参数
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _modeFlag = _mode === 'production';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const DefinePlugin = require('webpack/lib/DefinePlugin');

// css解析
let cssLoaders = [
    // 把css提取到单独文件
    MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            // css-loader下面只能跟一个loader
            importLoaders: 1
        }
    },
    {
        loader: 'postcss-loader',
    }
]

// 公共配置
const webpackBaseConfig = {
    entry: {
        app:resolve('src/index.tsx')
    },
    output: {
        path:join(__dirname,'./dist')
    },
    module: {
        rules: [{
            test: /\.(js|jsx|ts|tsx)/,
            include: [resolve('src')],
            exclude: /node_modules/,
            loader: 'babel-loader',
        },
            {
                test: /\.(ts|tsx)/,
            include: [resolve('src')],
                // node_modules 目录的下的代码不用检查
                exclude: /node_modules/,
                loader: 'tslint-loader',
                // 把 tslint-loader 的执行顺序放到最前面，防止其它 Loader 把处理后的代码交给 tslint-loader 去检查
                enforce: 'pre',
            },
            {
                test: /\.(css|scss)$/,
                use: cssLoaders
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf|webp|mp4)$/,
                type:'asset'
            }
        ]
    },
    resolve: {
        alias: {
            '@assets': resolve('src/assets'),
            '@components': resolve('src/components'),
            '@routes':resolve('src/routes'),
            '@pages':resolve('src/pages'),
            '@utils':resolve('src/utils'),
            '@api':resolve('src/api'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: _modeFlag ? 'assets/styles/[name].css' : 'assets/styles/[name].css',
            chunkFilename: _modeFlag ? 'assets/styles/[id].css' : 'assets/styles/[id].css',
            ignoreOrder:true,
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: resolve(__dirname, './static'), to: "static" },
            ],
        })
    ]
}

module.exports = merge.default(webpackBaseConfig, _mergeConfig);
