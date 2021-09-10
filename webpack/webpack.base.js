let HtmlWebpackPlugin = require('html-webpack-plugin');
let config = require('./webpack.config.js');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
// const webpack = require('webpack');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const _version = new Date().getTime();


let webpackBase = {
  entry: config.entry,
  output: {
    filename: 'js/bundle.js',
    path: config.outPath,
    publicPath: './',
    chunkFilename: 'js/[name].' + _version + '.js',
    library: '[name]_library'
  },
  resolve: {
    alias: {
      '@app': path.resolve(config.root, 'src/client'),
      '@lib': path.join(config.root, 'lib/'),
      '@css': path.join(config.root, 'src/css'),
      '@component': path.join(config.root, 'src/component'),

    },
    modules: ['node_modules', '*'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue']
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [{
      test: /\.css$/,
      use: [
        config.vueLoader,
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            sourceMap: config.isProd,
            postcssOptions: {
              plugins: [
                ['autoprefixer'],
              ],
            },
          }
        }
      ]
    },
    {
      test: /\.less$/,
      use: [
        config.vueLoader, {
          loader: "css-loader"
        }, {
          loader: "postcss-loader",
          options: {
            sourceMap: config.isProd,
            postcssOptions: {
              plugins: [
                ['autoprefixer'],
              ],
            },
          }
        }, {
          loader: "less-loader",
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: path.join(config.root, 'src/css/base.less'),
          }
        }
      ]
    },
    {
      test: /\.vue$/,
      use: 'vue-loader'
    },
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            // 第二次构建时，会读取之前的缓存
            cacheDirectory: true
          },
        },
        {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            appendTsxSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /\.(gif|png|jpe?g|svg|ico)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: `assets/[name].[hash:5].[ext]`,
            limit: 200, // 小于8k的图片自动转成base64格式，并且不会存在实体图片,
            // publicPath:'./'
          }
        }
        // , {
        //   loader: 'image-webpack-loader'
        // },
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,   // 处理字体
      use: {
        loader: 'file-loader',
        options: {
          name: `assets/[name].[hash:5].[ext]`,
          publicPath: '../'
        }
      }
    }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('./vendor/vue-manifest.json')
    // })
  ]
}

let clearFile = [];
for (item in config.entry) {
  clearFile.push(`${item}/*`);
  let templist = path.join(config.root, `./src/client/${item}/index.html`);
  htmlConfig = {
    template: templist,
    inject: true,
    title: 'wyulang',
    host: config.distPath,
    prod: false,
  }
  if (config.isProd) {
    htmlConfig.filename = `index.html`;
    if (config.isFile(path.join(config.root, `./src/client/${item}/favicons.ico`))) {
      htmlConfig.favicon = path.join(config.root, `./src/client/${item}/favicons.ico`);
    }
  } else {
    htmlConfig.chunks = [item];
    htmlConfig.filename = `${item}/index.html`;
  }
  webpackBase.plugins.push(
    new HtmlWebpackPlugin(htmlConfig)
  )
}

webpackBase.plugins.push(
  new CleanWebpackPlugin()
)


module.exports = webpackBase;