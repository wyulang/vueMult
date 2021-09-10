const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack')
const { merge } = require('webpack-merge');
let config = require('./webpack.config.js');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const chalk = require('chalk');
const webpackbase = require('./webpack.base.js');

let conlg = [];

for (let item in config.entry) {
  conlg.push(chalk.blueBright.bold('Your application is running here: ') + chalk.greenBright.bold(`http://${config.devServer}:${config.port}/${item}/`));
  conlg.push(chalk.blueBright.bold('Your application is running here: ') + chalk.greenBright.bold(`http://localhost:${config.port}/${item}/`));
}
// let cdns = [{
//   filepath: path.resolve(__dirname, './vendor/*.js')
// }]

let cdns=[];
config.clientItem.forEach(v => {
  let proxyUrl = path.join(config.root, `src/client/${v}/cdn/index.js`);
  if (config.isFile(proxyUrl)) {
    cdns = cdns.concat(require(proxyUrl))
  }
})

let webpackDevConfig = {
  devtool: 'source-map',
  mode: 'development',
  entry: config.entry,
  output: {
    path: config.devPath,
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  watchOptions: { // 监听文件变化，重新编译
    aggregateTimeout: 500, // 延迟500毫秒
    ignored: /node_modules/, // 过滤文件
  },
  optimization: {
    splitChunks: {
      minSize: 20000,
      maxAsyncRequests: 10,
      cacheGroups: {
        vendor: { // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'common', // 打包后的文件名，任意命名
          priority: 10// 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  devServer: {
    open: false,
    contentBase: config.devPath,
    publicPath: "/",
    compress: true,
    stats:"none",
    inline: true,
    noInfo: true,
    port: config.port,
    host: config.host
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: conlg
      }
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new ProgressBarPlugin(
      {
        format: chalk.blueBright('  run :bar :percent (:elapsed seconds) '),
        clear: true,
        summary: false,
        customSummary: res => {
          process.stderr.write(chalk.blueBright('   '))
        }
      }
    ),
  ]
}

if (cdns.length) {
  webpackDevConfig.plugins.push(new AddAssetHtmlPlugin(cdns))
}

module.exports = merge(webpackbase, webpackDevConfig)
