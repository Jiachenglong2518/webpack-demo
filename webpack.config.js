const path = require('path');
const ExtractTextPlugin  = require("extract-text-webpack-plugin")
const path_url = './'
console.log(1);
module.exports = {
  // JS 执行入口文件
  entry: {
    main: path_url + 'main.js',
  },
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, path_url + 'dist'),
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
    ]
  },
  plugins: [
    // 把注入到 bundle.js 文件里的 CSS 提取到单独的文件中
    new ExtractTextPlugin  ({
      filename: `a.css`,
    }),
  ],
  devServer:{
    headers: { // response headers
      'X-foo':'jcl' 
    }
  }
};
