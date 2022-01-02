const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { merge } = require('webpack-merge');
let config = require('./config.js');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const chalk = require('chalk');
const webpackbase = require('./base.js');

let conlg = [];

for (let item in config.entry) {
  conlg.push(chalk.blueBright.bold('Your application is running here: ') + chalk.greenBright.bold(`http://${config.devServer}:${config.port}/${item}/`));
  conlg.push(chalk.blueBright.bold('Your application is running here: ') + chalk.greenBright.bold(`http://localhost:${config.port}/${item}/`));
}

let cdns=[];
config.clientItem.forEach(v => {
  let proxyUrl = path.join(config.root, `src/client/${v}/cdn/index.js`);
  if (config.isFile(proxyUrl)) {
    cdns = cdns.concat(require(proxyUrl))
  }
})

let webpackDevConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: config.entry,
  output: {
    path: config.devPath,
    publicPath: '/',
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name].[hash:5].[ext]'
  },
  infrastructureLogging: {
    level: 'none',
  },

  stats: 'none',
  watchOptions: { // 监听文件变化，重新编译
    aggregateTimeout: 500, // 延迟500毫秒
    ignored: /node_modules/, // 过滤文件
  },
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: conlg,
      }
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
