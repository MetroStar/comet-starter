const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack');

const ROOT_DIRECTORY = path.join(__dirname, './')
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, 'public')

module.exports = {
  entry: './src/main.tsx',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIRECTORY, 'index.html')
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          { 
            from: path.resolve(SRC_DIRECTORY),
            globOptions: {
              ignore: ["index.html"],
            },
          },
        ]
      }
    ),
    new Dotenv(),
  ],
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
};
