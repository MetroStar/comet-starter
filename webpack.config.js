// webpack.config.js
const path = require('path');
module.exports = {
  entry: './src/main.tsx',
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['./node_modules/@uswds/uswds/packages'],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, './public'),
    },
  },
};
