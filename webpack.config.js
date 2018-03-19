const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },

  devServer: {
    port: 4000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.douban.com/v2',
        secure: false,
        // 必须设置该项
        changeOrigin: true,
        // '/api/movie/in_theaters' 路径重写为：'/movie/in_theaters'
        pathRewrite: { "^/api": "" }
      }
    }
  },

  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|jpeg|gif)$/, use: 'url-loader' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html')
    })
  ]

}