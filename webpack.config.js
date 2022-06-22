const path = require('path');
const ExtractTextPlugin  = require("extract-text-webpack-plugin")
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 访问内置的插件

const path_url = './'
console.log("__dirname:" + __dirname);
console.log(path.resolve(__dirname, path_url + 'dist'));
console.log(1);
module.exports = {
  // JS 执行入口文件
  entry: {
    main: path_url + 'main.js',
    // v:path_url + 'main2.js',
  },
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: '[name].js',
    // 输出文件都放到 dist 目录下
    // path: path.resolve(__dirname, path_url + 'dist'),
    path: __dirname + '/dist',
    publicPath:'/dist/'
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 css 文件
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader'],
        })
      },
      {
        test: /\.js$/,
        use:[
          {
            loader: "babel-loader",
            options: {
              // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
              cacheDirectory: true
            }
          }
        ],
      },
      {
          test: /\.(png|jpg)$/,
          loader: 'url-loader',
          options: {
              limit: 5000,
              name: '[name].[hash:8].[ext]',
              outputPath:'images/'
          }
      }
    ]
  },
  plugins: [
    // 把注入到 bundle.js 文件里的 CSS 提取到单独的文件中
    new ExtractTextPlugin  ({
      filename: `[name].css`,
    }),
    new htmlWebpackPlugin(),
    new webpack.ProgressPlugin(),
  ],
  devServer:{
    headers: { // response headers
      'X-foo':'jcl' 
    },
    // inline: false
  },
  externals: {
    // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
    jquery: 'jQuery'
  }
};
