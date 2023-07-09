const { merge } = require("webpack-merge");
const path = require('path');
const common = require("./webpack.common.js");
module.exports = merge(common, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, './public'),
    },
    open: true,
    proxy: {
      '/api': {
        target: 'https://ll.thespacedevs.com/2.2.0/launch/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});