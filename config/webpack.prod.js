const { merge } = require("webpack-merge");
const path = require('path');
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].[contenthash].bundle.js",
  },
});